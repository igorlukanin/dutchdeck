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
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample Dutch words dataset with translations and metadata
const sampleWords = [
  // A1 Level - Basic words
  {
    dutch: 'huis',
    english: 'house',
    russian: 'дом',
    gender: 'het',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'auto',
    english: 'car',
    russian: 'машина',
    gender: 'de',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'water',
    english: 'water',
    russian: 'вода',
    gender: 'het',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'eten',
    english: 'to eat',
    russian: 'есть',
    verb_type: 'irregular',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'drinken',
    english: 'to drink',
    russian: 'пить',
    verb_type: 'irregular',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'man',
    english: 'man',
    russian: 'мужчина',
    gender: 'de',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'vrouw',
    english: 'woman',
    russian: 'женщина',
    gender: 'de',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'kind',
    english: 'child',
    russian: 'ребёнок',
    gender: 'het',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'groot',
    english: 'big',
    russian: 'большой',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'klein',
    english: 'small',
    russian: 'маленький',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'goed',
    english: 'good',
    russian: 'хороший',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'slecht',
    english: 'bad',
    russian: 'плохой',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'hond',
    english: 'dog',
    russian: 'собака',
    gender: 'de',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'kat',
    english: 'cat',
    russian: 'кот',
    gender: 'de',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'boek',
    english: 'book',
    russian: 'книга',
    gender: 'het',
    cefr_level: 'A1',
    source: 'basic_vocabulary'
  },
  
  // A2 Level - Slightly more advanced
  {
    dutch: 'fiets',
    english: 'bicycle',
    russian: 'велосипед',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'winkel',
    english: 'shop',
    russian: 'магазин',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'werk',
    english: 'work',
    russian: 'работа',
    gender: 'het',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'werken',
    english: 'to work',
    russian: 'работать',
    verb_type: 'regular',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'wonen',
    english: 'to live',
    russian: 'жить',
    verb_type: 'regular',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'school',
    english: 'school',
    russian: 'школа',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'familie',
    english: 'family',
    russian: 'семья',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'vader',
    english: 'father',
    russian: 'отец',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'moeder',
    english: 'mother',
    russian: 'мать',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'broer',
    english: 'brother',
    russian: 'брат',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  },
  {
    dutch: 'zus',
    english: 'sister',
    russian: 'сестра',
    gender: 'de',
    cefr_level: 'A2',
    source: 'basic_vocabulary'
  }
];

async function importWords() {
  console.log(`Starting import of ${sampleWords.length} words...`);
  
  try {
    // Check if words already exist to avoid duplicates
    console.log('Checking for existing words...');
    const { count: existingCount, error: countError } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking existing words:', countError);
      return;
    }
    
    console.log(`Found ${existingCount || 0} existing words in database`);
    
    const { data: existingWords, error: checkError } = await supabase
      .from('words')
      .select('dutch')
      .in('dutch', sampleWords.map(w => w.dutch));
    
    if (checkError) {
      console.error('Error checking existing words:', checkError);
      return;
    }
    
    const existingDutchWords = new Set(existingWords?.map(w => w.dutch) || []);
    const newWords = sampleWords.filter(word => !existingDutchWords.has(word.dutch));
    
    if (newWords.length === 0) {
      console.log('All words already exist in the database!');
      return;
    }
    
    console.log(`Found ${existingDutchWords.size} existing words, importing ${newWords.length} new words...`);
    
    // Import new words in batches
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < newWords.length; i += batchSize) {
      batches.push(newWords.slice(i, i + batchSize));
    }
    
    let totalImported = 0;
    
    for (const [index, batch] of batches.entries()) {
      console.log(`Importing batch ${index + 1}/${batches.length} (${batch.length} words)...`);
      
      const { data, error } = await supabase
        .from('words')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`Error importing batch ${index + 1}:`, error);
        console.error('Failed words:', batch.map(w => w.dutch));
      } else {
        totalImported += data?.length || 0;
        console.log(`✓ Successfully imported batch ${index + 1}: ${batch.map(w => w.dutch).join(', ')}`);
      }
    }
    
    console.log(`\n🎉 Import complete!`);
    console.log(`Successfully imported: ${totalImported} words`);
    console.log(`Skipped (already exist): ${existingDutchWords.size} words`);
    
    // Verify final count
    const { count: finalCount, error: finalCountError } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true });
    
    if (finalCountError) {
      console.error('Error getting final count:', finalCountError);
    } else {
      console.log(`Total words in database: ${finalCount}`);
    }
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Allow running specific operations via command line arguments
const operation = process.argv[2];

if (operation === 'check') {
  // Just check current word count
  async function checkWords() {
    const { count, error } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error checking words:', error);
    } else {
      console.log(`Current words in database: ${count}`);
    }
  }
  checkWords();
} else if (operation === 'clear') {
  // Clear all words (be careful!)
  async function clearWords() {
    console.log('⚠️  WARNING: This will delete ALL words from the database!');
    console.log('Are you sure? This operation cannot be undone.');
    
    const { error } = await supabase
      .from('words')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
    
    if (error) {
      console.error('Error clearing words:', error);
    } else {
      console.log('All words have been deleted from the database.');
    }
  }
  clearWords();
} else {
  // Default: import words
  importWords();
}