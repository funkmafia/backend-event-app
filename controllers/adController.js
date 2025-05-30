const Ad = require("../Models/Ad");
const User = require("../Models/User");

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAd = async (req, res) => {
  console.log("addAd");
  console.log(req.headers);
  console.log(req.body);

  const userToken = req.headers.authorization.split(" ")[1];

  console.log(userToken);

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInDB = await User.findOne({ token: userToken });

  console.log(userInDB);

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const ad = new Ad({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    age: req.body.age,
    location: req.body.location,
    date: req.body.date,
    time: req. body.time,
    imageURL: req.body.imageURL,
    description: req.body.description,
    price: req.body.price,
    userId: userInDB._id,
  });
  try {
    const newAd = await ad.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Update
exports.updateAd = async (req, res) => {
  try {
    const userToken = req.headers.authorization.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInDB = await User.findOne({ token: userToken });

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const oldAd = await Ad.findById(req.params.id);
  if (!oldAd) return res.status(404).json({ message: "Ad not found"});
  if (oldAd.userId.toString() !== userInDB._id.toString()){
    return res.status(403).json({ message: "You can only update your own ads."})
  }
  
  
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    
    res.json(ad);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: err.message });
  }
 }

// Delete
exports.removeAd= async (req, res) => {
  try {
 const userToken = req.headers.authorization.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInDB = await User.findOne({ token: userToken });

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const oldAd = await Ad.findById(req.params.id);
  if (!oldAd) return res.status(404).json({ message: "Ad not found"});
  if (oldAd.userId.toString() !== userInDB._id.toString()){
    return res.status(403).json({ message: "You can only delete your own ads."})
  }
  

    const ad = await oldAd.deleteOne();
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.json(oldAd);
  } catch (err) {
    console.error("Error in removeAd:", err);
    res.status(400).json({ message: 'Invalid entry' });
  }
};