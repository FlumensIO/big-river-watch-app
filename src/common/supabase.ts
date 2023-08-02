import { createClient } from '@supabase/supabase-js';
import config from 'common/config';

// Create a single supabase client for interacting with the db
const supabase = createClient(config.backend.url, config.backend.anonKey);

export default supabase;
