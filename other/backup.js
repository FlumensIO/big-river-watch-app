/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { createClient } = require('@supabase/supabase-js');
// eslint-disable-next-line import/no-extraneous-dependencies
const upload = require('@flumens/onedrive-upload');

if (!process.env.SUPABASE_KEY || !process.env.SUPABASE_PROJECT)
  throw new Error('SUPABASE_KEY or SUPABASE_PROJECT env keys are missing');

const supabase = createClient(
  `https://${process.env.SUPABASE_PROJECT}.supabase.co`,
  process.env.SUPABASE_KEY,
  { auth: { persistSession: false } }
);

const date = new Date().toISOString().split('T')[0].replaceAll('-', '_');

console.log(`Doing ${date} backup`);

const run = async () => {
  const { data } = await supabase
    .from('config')
    .select('value')
    .filter('key', 'eq', 'backup');
  const { value: oldOffset } = data[0];

  const offset = parseInt(process.env.OFFSET || oldOffset, 10);

  console.log('Fetching files list, offset=', offset);

  const { data: files } = await supabase.storage.from('media').list('public', {
    limit: 10000,
    offset,
    sortBy: { column: 'created_at', order: 'asc' },
  });

  console.log(`Found ${files?.length} files`);

  for (const [index, file] of files?.entries()) {
    process.stdout.write(`${offset + index}. ${file.name.split('-')[0]} ↓`);

    const { data } = await supabase.storage
      .from('media')
      .download(`public/${file.name}`);

    process.stdout.write(` (${(data?.size / 1000000).toFixed(2)}Mb) ↑`);
    await upload(
      data?.stream(),
      data?.size,
      file.name,
      `org.theriverstrust.bigriverwatch/backup/storage`
    );

    await supabase
      .from('config')
      .update({ value: offset + index })
      .filter('key', 'eq', 'backup');

    process.stdout.write(' (✓)\n');
  }
};

run();
