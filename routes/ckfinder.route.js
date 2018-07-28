const express = require('express');
const fs = require('fs')
const path = require('path')
const uuid = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: (req, file, cb) => cb(null, uuid.v4() + path.extname(file.originalname))
});

const upload = multer({ storage: storage });

const ckfinderRouter = express.Router();

ckfinderRouter.get('/files', function (req, res) {
    const images = fs.readdirSync('public/upload');
    const imgExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
    const imageData = images
        .filter(item => imgExtensions.includes(path.extname(item)))
        .map(item => ({ image: `/upload/${item}`, folder: '/' }));
    res.send(imageData);
});

ckfinderRouter.post('/upload', upload.array('flFileUpload', 12), (req, res, next) => res.redirect('back'));

ckfinderRouter.post('/delete_file', function (req, res, next) {
    const imageUrl = 'public' + req.body.url_del
    if (fs.existsSync(imageUrl)) fs.unlinkSync(imageUrl);
    res.redirect('back');
});

module.exports = { ckfinderRouter };
