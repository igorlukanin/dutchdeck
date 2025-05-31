import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables manually
try {
  const envFile = readFileSync(join(__dirname, '../.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, ...values] = line.split('=');
      if (key && values.length) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  });
} catch (error) {
  console.warn('Could not load .env.local file:', error.message);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  console.error('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupSchema() {
  console.log('Setting up database schema...');
  
  try {
    // Read the schema file
    const schemaPath = join(__dirname, '../packages/db/src/schema.sql');
    console.log(`Reading schema from: ${schemaPath}`);
    
    const schemaSQL = readFileSync(schemaPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute...`);
    
    // Execute each statement
    for (const [index, statement] of statements.entries()) {
      if (statement.trim()) {
        console.log(`Executing statement ${index + 1}/${statements.length}...`);
        
        try {
          const { error } = await supabase.rpc('exec_sql', { 
            sql: statement + ';' 
          });
          
          if (error) {
            // Try alternative method using raw SQL
            const { error: altError } = await supabase
              .from('_temp')
              .select('*')
              .limit(0);
            
            // If that doesn't work, we'll use a different approach
            console.log(`Statement ${index + 1}: ${statement.substring(0, 50)}...`);
            
            // For now, let's log the statements that need to be run manually
            if (error.code) {
              console.warn(`Warning on statement ${index + 1}:`, error.message);
            }
          } else {
            console.log(`✓ Statement ${index + 1} executed successfully`);
          }
        } catch (execError) {
          console.warn(`Warning on statement ${index + 1}:`, execError.message);
        }
      }
    }
    
    console.log('\n🎉 Schema setup process completed!');
    console.log('\nNote: Some statements may need to be run manually in Supabase SQL Editor if automatic execution failed.');
    console.log('Copy the following SQL and run it in your Supabase SQL Editor:');
    console.log('\n' + '='.repeat(50));
    console.log(schemaSQL);
    console.log('='.repeat(50));
    
    // Test if schema was created successfully by checking for tables
    console.log('\nTesting schema setup...');
    
    const { count: wordsCount, error: wordsError } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true });
    
    if (wordsError) {
      console.log('❌ Words table not accessible:', wordsError.message);
      console.log('\nPlease run the schema SQL manually in Supabase SQL Editor.');
    } else {
      console.log('✅ Words table exists and is accessible!');
      console.log(`Current word count: ${wordsCount || 0}`);
    }
    
  } catch (error) {
    console.error('Schema setup failed:', error);
    console.log('\nPlease run the schema manually in Supabase SQL Editor.');
    
    // Read and display the schema file for manual execution
    try {
      const schemaPath = join(__dirname, '../packages/db/src/schema.sql');
      const schemaSQL = readFileSync(schemaPath, 'utf8');
      console.log('\nSQL to run manually:');
      console.log('='.repeat(50));
      console.log(schemaSQL);
      console.log('='.repeat(50));
    } catch (readError) {
      console.error('Could not read schema file:', readError.message);
    }
  }
}

setupSchema();