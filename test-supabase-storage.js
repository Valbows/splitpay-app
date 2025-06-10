// test-supabase-storage.js

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Assuming .env is in the root

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use the Service Role key for admin access

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorageAccess() {
  try {
    console.log('Attempting to list files in receipt-images bucket using Service Role Key...');

    // Attempt to list files in the bucket
    const { data, error } = await supabase.storage
      .from('receipt-images')
      .list(); // Use list() for a simple read operation

    if (error) {
      console.error('Error listing files:', error);
      if (error.message.includes('Bucket not found')) {
        console.log('Hint: The "receipt-images" bucket may not exist in your Supabase project. Please create it in your Supabase dashboard under Storage.');
      }
    } else {
      console.log('✅ Success! Connection to Supabase is working.');
      console.log('Files in bucket:', data.length > 0 ? data : 'Bucket is empty.');
    }

  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

testStorageAccess();
