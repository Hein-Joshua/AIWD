// server.js — Main server file (Express + MongoDB)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// ── MIDDLEWARE ──────────────────────────────────────────
// Serve static files (event.html, style.css) from current folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data sent via POST
app.use(bodyParser.urlencoded({ extended: true }));

// ── MONGODB CONNECTION ──────────────────────────────────
mongoose.connect('mongodb://localhost:27017/event_db')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));

// ── SCHEMA & MODEL ─────────────────────────────────────
// Define the structure of data to be stored
const registrationSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    event_date: String,
    tickets: Number,
    tshirt_size: String,
    skill_level: Number,
    mode: String,
    comments: String,
    created_at: { type: Date, default: Date.now }
});

// Create a model from the schema
const Registration = mongoose.model('Registration', registrationSchema);

// ── ROUTES ──────────────────────────────────────────────

// GET / → Serve the event registration page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'event.html'));
});

// POST /register → Save form data to MongoDB
app.post('/register', async (req, res) => {
    try {
        // Collect form data from req.body
        const newRegistration = new Registration({
            full_name: req.body.fname,
            email: req.body.email,
            event_date: req.body['event-date'],
            tickets: req.body.tickets,
            tshirt_size: req.body.tshirt,
            skill_level: req.body.experience,
            mode: req.body.mode,
            comments: req.body.comments
        });

        // Save to MongoDB
        await newRegistration.save();

        // Send success response
        res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Registration Success</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light d-flex justify-content-center align-items-center" style="height:100vh;">
        <div class="card p-5 text-center shadow" style="max-width:500px;">
          <h2 class="text-success">✅ Registration Successful!</h2>
          <p class="mt-3">Thank you, <strong>${req.body.fname}</strong>!</p>
          <p>Your registration for <strong>TechNexus 2026</strong> has been saved to MongoDB.</p>
          <p>Confirmation will be sent to <strong>${req.body.email}</strong>.</p>
          <a href="/" class="btn btn-primary mt-3">Go Back to Portal</a>
        </div>
      </body>
      </html>
    `);

    } catch (err) {
        res.status(500).send('Error saving registration: ' + err.message);
    }
});

// GET /registrations → View all saved registrations (for verification)
app.get('/registrations', async (req, res) => {
    try {
        const data = await Registration.find();
        res.json(data);
    } catch (err) {
        res.status(500).send('Error fetching data: ' + err.message);
    }
});

// ── START SERVER ────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});