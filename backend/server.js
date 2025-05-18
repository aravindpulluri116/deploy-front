const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const FRONTEND_URL = 'https://deploy-front-87j4.vercel.app/';

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Mock user data - in a real application, this would come from a database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

app.get('/user', (req, res) => {
  const user = req.query.name || 'Guest';
  res.json({ message: `Hello ${user}` });
});

// New endpoint to get user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
