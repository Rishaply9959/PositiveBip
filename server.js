const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
    if (req.file) {
        res.json({ success: true, url: `http://localhost:3000/uploads/${req.file.filename}`, name: req.file.originalname });
    } else {
        res.json({ success: false });
    }
});

app.get('/videos', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const videos = files.map(file => ({
            name: file,
            url: `http://localhost:3000/uploads/${file}`
        }));
        res.json(videos);
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
