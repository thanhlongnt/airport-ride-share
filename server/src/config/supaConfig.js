import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';

// this has to be the path of your current pwd, not the file's
dotenv.config({path:'../.env'});

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;