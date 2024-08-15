const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const path = require('path');
const multer = require('multer');
const mime = require('mime-types');
const fs = require('fs');

const User = require('./model/userModel');
const Place = require('./model/placeModel');
const Booking = require('./model/bookingModel');

const app = express();
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('Database connected securely');
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRESIN,
  });
};

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

const getUserFromreq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
      {},
      async (err, decoded) => {
        if (err) {
          reject('Invalid Token');
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'passwords doesnt match' });

    const userDoc = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    res.json(userDoc);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });

    if (!email || !password) {
      return res.status(400).json({ error: 'Enter password and Email' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password, user.password))) {
      // alert('Login Failed');
      return res.status(401).json({ error: 'Invalid Email or Password ' });
    }

    const token = signToken(user._id);

    const cookieOptions = {
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };
    res.cookie('jwt', token, cookieOptions);
    return res.status(200).json(user);
    // alert('Login Success');
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get('/profile', async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid Token' });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ error: 'User Not Found' });

      const { name, email, _id } = user;
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('jwt', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = `${Date.now()}.jpg`;
  await download.image({
    url: link,
    dest: `${__dirname}/uploads/${newName}`,
  });
  // console.log(newName);

  res.json(newName);
});

const photoUploder = multer({ dest: 'uploads/' });

app.post('/uploads', photoUploder.array('photos', 100), (req, res) => {
  let uploadPhotos = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path: pathName, mimetype } = req.files[i];

    const ext = mime.extension(mimetype);
    let newPath = `${pathName}.${ext}`;
    fs.renameSync(pathName, newPath);
    newPath = path.normalize(newPath);
    newPath = newPath.replace(/^(uploads[\\/])/, '');
    // console.log(newPath);

    uploadPhotos.push(newPath);
  }
  res.json(uploadPhotos);
});

app.post('/addnewplace', async (req, res) => {
  const token = req.cookies.jwt;
  const {
    title,
    address,
    addedphotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  if (token) {
    const decoded = await getUserFromreq(req);
    const newPlace = await Place.create({
      owner: decoded.id,
      title,
      address,
      photos: addedphotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json(newPlace);
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

app.get('/newplace', async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    const user = await getUserFromreq(req);
    res.json(await Place.find({ owner: user.id }));
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});
app.get('/user-placebyid/:id', async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  res.json(await Place.findById(id));
});
app.patch('/updatebyid/:id', async (req, res) => {
  const { id } = req.params;
  const { addedphotos, ...rest } = req.body;

  // console.log(id);
  // console.log(req.body);
  try {
    const user = await getUserFromreq(req);
    const placeDoc = await Place.findById(id);
    // console.log(placeDoc);

    if (user.id === placeDoc.owner.toString()) {
      const updatedData = {
        photos: addedphotos,
        ...rest,
      };

      const updatedinfo = await Place.findByIdAndUpdate(id, updatedData);
      // console.log(updatedinfo);

      res.json(updatedinfo);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating place' });
  }
});

app.get('/allplaces', async (req, res) => {
  try {
    const all = await Place.find();
    // console.log(all);
    res.json(all);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'An error occurred while fetching places' });
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const userData = await getUserFromreq(req);
    const { place, checkIn, checkOut, guests, name, mobile, price } = req.body;
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      price,
      user: userData.id,
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserFromreq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
  } catch (err) {
    res.json(err);
  }
});
app.get('/booking/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await Booking.findById(id).populate('place'));
  } catch (err) {
    res.json(err);
  }
});

app.listen(3000, () => {
  console.log('Listening to server on port');
});
