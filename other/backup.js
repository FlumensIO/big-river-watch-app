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
  console.log('Fetching files list');

  const { data: files } = await supabase.storage.from('media').list('public');
  console.log(`Found ${files?.length} files`);

  for (const file of files) {
    process.stdout.write(`${file.name} ↓`);
    const { data } = await supabase.storage
      .from('media')
      .download(`public/${file.name}`);

    process.stdout.write('↑');
    await upload(
      data?.stream(),
      data?.size,
      file.name,
      `org.theriverstrust.bigriverwatch/backup/storage`
    );

    process.stdout.write('✓\n');
  }
};

run();
