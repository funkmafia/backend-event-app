const User = require('../Models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(400).json({message: "You are already registered, please log in"})
          } 
     const user = new User({ name, email, password });
    const token = new Date().getTime().toString() + Math.random().toString(36).substring(2, 15);
    user.token = token;
    await user.save();
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
    console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = new Date().getTime().toString() + Math.random().toString(36).substring(2, 15);

    await User.findByIdAndUpdate(user._id, { token: token });

    
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.logout = async(req, res) => {
  try{
    const token = req.body.token;
    if(!token) {
      return res.status(400).json({ message: "Token is required for logout."});
    }
    const user = await User.findOneAndUpdate({ token: token }, { token: '' });
   if(!user) {
    return res.status(400).json({ message: "Invalid token or user not found"});
   }
   res.json({message: "Logged out successfully."})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};