const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const { parseReceiptText } = require('./utils/receiptParser');
const {
  transformUserToFrontendFormat,
  transformGroupToFrontendFormat,
  transformParticipantToMemberFormat,
  transformExpenseToFrontendFormat
} = require('./utils/transformers');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for direct processing
const port = process.env.PORT || 3001; // Use port 3001 for backend

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Google Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Basic route
app.get('/', (req, res) => {
  res.send('SplitPay Backend is running!');
});

// Authentication Endpoints
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


// Groups Endpoints
app.get('/groups', async (req, res) => {
  try {
    // Assuming user is authenticated and user id is available in req.user or similar
    // For now, let's fetch all groups (will refine with user association later)
    const { data, error } = await supabase
      .from('groups')
      .select('*');
    if (error) throw error;
    const transformedData = data.map(transformGroupToFrontendFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post('/groups', async (req, res) => {
  const { name } = req.body;
  try {
    // Assuming user is authenticated and user id is available
    const { data, error } = await supabase
      .from('groups')
      .insert([{ name }]) // Will add created_by_user_id later
      .select();
    if (error) throw error;
    const transformedData = data.map(transformGroupToFrontendFormat);
    res.status(201).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.put('/groups/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const { data, error } = await supabase
      .from('groups')
      .update({ name })
      .eq('id', id)
      .select();
    if (error) throw error;
    const transformedData = data.map(transformGroupToFrontendFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/groups/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('groups')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    const transformedData = data.map(transformGroupToFrontendFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Expenses Endpoints
app.get('/expenses', async (req, res) => {
  try {
    // Assuming group_id is provided as a query parameter
    const { group_id } = req.query;
    if (!group_id) {
      return res.status(400).json({ error: 'group_id is required' });
    }
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('group_id', group_id);
    if (error) throw error;
    const transformedData = data.map(transformExpenseToFrontendFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/expenses', async (req, res) => {
  const { group_id, description, amount, paid_by_user_id, date, raw_text } = req.body;
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ group_id, description, amount, paid_by_user_id, date, raw_text }])
      .select();
    if (error) throw error;
    const transformedData = data.map(transformExpenseToFrontendFormat);
    res.status(201).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { description, amount, paid_by_user_id, date, raw_text } = req.body;
  try {
    const { data, error } = await supabase
      .from('expenses')
      .update({ description, amount, paid_by_user_id, date, raw_text })
      .eq('id', id)
      .select();
    if (error) throw error;
    const transformedData = data.map(transformExpenseToFrontendFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    const transformedData = data.map(transformExpenseToFrontendFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Participants Endpoints
app.get('/groups/:id/participants', async (req, res) => {
  const { id } = req.params; // group_id
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*, users(email)') // Assuming a 'users' table with email
      .eq('group_id', id);
    if (error) throw error;
    const transformedData = data.map(transformParticipantToMemberFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/groups/:id/participants', async (req, res) => {
  const { id } = req.params; // group_id
  const { user_id } = req.body; // user_id to add
  try {
    const { data, error } = await supabase
      .from('participants')
      .insert([{ group_id: id, user_id }])
      .select();
    if (error) throw error;
    const transformedData = data.map(transformParticipantToMemberFormat);
    res.status(201).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/groups/:id/participants/:user_id', async (req, res) => {
  const { id, user_id } = req.params; // group_id, user_id to remove
  try {
    const { data, error } = await supabase
      .from('participants')
      .delete()
      .eq('group_id', id)
      .eq('user_id', user_id)
      .select();
    if (error) throw error;
    const transformedData = data.map(transformParticipantToMemberFormat);
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// User Profile Endpoint
app.get('/api/users/me', async (req, res) => {
  try {
    // Get user from request context (set by auth middleware)
    // NOTE: Assumes an auth middleware exists and sets req.user
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Transform user to frontend format
    const transformedUser = transformUserToFrontendFormat(user);

    // Fetch additional user data like group memberships if needed
    // NOTE: Assumes 'participants' table has 'user_id' and 'group_id' columns
    const { data: memberships, error: membershipsError } = await supabase
      .from('participants')
      .select('group_id')
      .eq('user_id', user.id);

    if (membershipsError) throw membershipsError;

    // Attach transformed memberships (list of group integer IDs)
    transformedUser.groups = memberships ?
      memberships.map(m => uuidToIntegerId(m.group_id)) : [];

    res.json(transformedUser);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Receipt Processing Endpoint
app.post('/receipts/upload', upload.single('receiptImage'), async (req, res) => {
  try {
    console.log('Received upload request.');
    console.log('req.file:', req.file);

    if (!req.file) {
      console.error('No file uploaded after multer processing.');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    console.log('File details:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `receipts/${fileName}`; // Define a path in your Supabase Storage bucket

    // Step 1: Store Image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('receipt-images') // Replace 'receipts' with your Supabase Storage bucket name
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    console.log('Supabase upload data:', uploadData);
    console.log('Supabase upload error:', uploadError);

    if (uploadError) throw uploadError;

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('receipt-images') // Replace 'receipts' with your Supabase Storage bucket name
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    // Step 2: Extract Text with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Use the correct model name

    const result = await model.generateContent([
      "Extract all text from this receipt image, including line items, prices, totals, merchant name, and date. Provide the raw text output.",
      {
        inlineData: {
          mimeType: file.mimetype,
          data: file.buffer.toString('base64') // Pass image data as base64
        },
      },
    ]);

    const geminiResponse = result.response;
    const rawText = geminiResponse.text();

    // Step 3: Parse Text & Store in Database
    const parsedDetails = parseReceiptText(rawText);

    // Assuming group_id and paid_by_user_id are available from the request or user session
    // For now, using placeholders - these need to be determined based on frontend data
    const group_id = 'placeholder_group_id';
    const paid_by_user_id = 'placeholder_user_id';

    const { data: expenseData, error: expenseError } = await supabase
      .from('expenses')
      .insert([{
        group_id: group_id,
        description: parsedDetails.merchant || 'Unknown Merchant', // Use parsed merchant or a default
        amount: parsedDetails.amount || 0, // Use parsed amount or a default
        paid_by_user_id: paid_by_user_id,
        date: parsedDetails.date || new Date().toISOString().split('T')[0], // Use parsed date or today's date
        raw_text: rawText,
        image_url: imageUrl, // Store the image URL
        is_ai_generated: true, // Mark as AI generated
      }])
      .select();

    if (expenseError) throw expenseError;

    const transformedExpense = transformExpenseToFrontendFormat(expenseData[0]);

    res.status(200).json({
      message: 'Receipt uploaded and processed',
      expense: transformedExpense, // Return the created expense data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`SplitPay Backend listening at http://localhost:${port}`);
});
