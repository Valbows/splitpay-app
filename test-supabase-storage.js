// test-supabase-storage.js

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Assuming .env is in the root

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY; // Use the Anon key for client initialization

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Replace with the actual access token obtained from login ---
const ACCESS_TOKEN = 'YOUR_ACTUAL_ACCESS_TOKEN_HERE';
// -----------------------------------------------------------------

// Set the access token on the client
supabase.auth.setSession({
    access_token: ACCESS_TOKEN,
    refresh_token: 'dummy_refresh_token' // Refresh token is required by the type definition, but value might not matter for this test
});


async function testStorageAccess() {
  try {
    console.log('Attempting to list files in receipt-images bucket...');

    // Attempt to list files in the bucket
    const { data, error } = await supabase.storage
      .from('receipt-images')
      .list(); // Use list() for a simple read operation

    if (error) {
      console.error('Error listing files:', error);
    } else {
      console.log('Successfully listed files:', data);
    }

  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

testStorageAccess();
