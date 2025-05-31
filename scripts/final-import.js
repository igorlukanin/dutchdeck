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
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use the same client configuration as the schema setup
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allWords = [
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

async function finalImport() {
  console.log(`🚀 Final import attempt - ${allWords.length} Dutch words`);
  
  try {
    // Step 1: Test database connection with same method as schema script
    console.log('Testing database connection...');
    const { count: testCount, error: testError } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true });
    
    if (testError) {
      console.error('❌ Cannot access words table:', testError);
      return;
    }
    
    console.log(`✅ Words table accessible, current count: ${testCount || 0}`);
    
    // Step 2: Import words in small batches
    console.log('\nImporting words...');
    
    let totalImported = 0;
    const batchSize = 5;
    
    for (let i = 0; i < allWords.length; i += batchSize) {
      const batch = allWords.slice(i, i + batchSize);
      console.log(`\nBatch ${Math.floor(i/batchSize) + 1}: ${batch.map(w => w.dutch).join(', ')}`);
      
      const { data, error } = await supabase
        .from('words')
        .insert(batch)
        .select();
      
      if (error) {
        console.error('Batch error:', error);
        
        // Try one by one for this batch
        console.log('Trying individual inserts...');
        for (const word of batch) {
          const { data: singleData, error: singleError } = await supabase
            .from('words')
            .insert([word])
            .select();
          
          if (singleError) {
            console.error(`❌ ${word.dutch}:`, singleError.message || 'Unknown error');
          } else {
            console.log(`✅ ${word.dutch}`);
            totalImported++;
          }
        }
      } else {
        console.log(`✅ Batch successful: ${data?.length || 0} words`);
        totalImported += data?.length || 0;
      }
    }
    
    // Step 3: Final verification
    console.log(`\n🎉 Import complete! Imported ${totalImported}/${allWords.length} words`);
    
    const { count: finalCount, error: finalError } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true });
    
    if (!finalError) {
      console.log(`📊 Total words in database: ${finalCount}`);
    }
    
    // Show some examples
    const { data: examples, error: exampleError } = await supabase
      .from('words')
      .select('dutch, english, gender, cefr_level')
      .limit(10);
    
    if (!exampleError && examples?.length) {
      console.log('\n📚 Sample words in database:');
      examples.forEach(word => {
        const gender = word.gender ? ` (${word.gender})` : '';
        console.log(`  ${word.dutch}${gender} → ${word.english} [${word.cefr_level}]`);
      });
    }
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  }
}

finalImport();