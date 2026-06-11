import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wupenymbbiphxjfhhfhl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cGVueW1iYmlwaHhqZmhoZmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDY1NjgsImV4cCI6MjA5NjY4MjU2OH0.MBqQCpIvl7WKB03u7OSjmWNFTbFBKSFf0wkPrl7dmiU';

export const supabase = createClient(supabaseUrl, supabaseKey);
