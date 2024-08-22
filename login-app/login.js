// Route to handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email, password });
  
      if (user) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (err) {
      res.status(500).send('Error logging in');
    }
  });
  