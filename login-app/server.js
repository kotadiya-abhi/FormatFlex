const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formate-flex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  phone: String
});

const User = mongoose.model('User', userSchema);

// Route to handle form submission
app.post('/register', async (req, res) => {
  const { name, password, email, phone } = req.body;

  // Create a new user
  const newUser = new User({ name, password, email, phone });

  try {
    await newUser.save();
    res.status(200).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Serve static files (e.g., HTML form)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
