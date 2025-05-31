import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanUsers() {
  console.log('Cleaning up all users...');
  
  try {
    // Delete from dependent tables first
    const { error: settingsError } = await supabase
      .from('user_settings')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
    
    if (settingsError) console.error('Error deleting user_settings:', settingsError);
    
    const { error: progressError } = await supabase
      .from('user_progress')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
    
    if (progressError) console.error('Error deleting user_progress:', progressError);
    
    const { error: usersError } = await supabase
      .from('users')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
    
    if (usersError) console.error('Error deleting users:', usersError);
    
    // For auth.users, we need the service role key
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
      
      if (listError) {
        console.error('Error listing auth users:', listError);
      } else if (authUsers?.users) {
        for (const user of authUsers.users) {
          const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
          if (deleteError) {
            console.error(`Error deleting auth user ${user.email}:`, deleteError);
          } else {
            console.log(`Deleted auth user: ${user.email}`);
          }
        }
      }
    } else {
      console.log('Note: To delete auth users, you need SUPABASE_SERVICE_ROLE_KEY in .env.local');
    }
    
    // Verify cleanup
    const { count: usersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    const { count: settingsCount } = await supabase
      .from('user_settings')
      .select('*', { count: 'exact', head: true });
    
    console.log('\nCleanup complete!');
    console.log(`Public users remaining: ${usersCount || 0}`);
    console.log(`User settings remaining: ${settingsCount || 0}`);
    
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
}

cleanUsers();