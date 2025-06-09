const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001; // Use port 3001 for backend

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Google Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Basic route
app.get('/', (req, res) => {
  res.send('SplitPay Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`SplitPay Backend listening at http://localhost:${port}`);
});
