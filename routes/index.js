var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'tmp/', rename: function (fieldname, filename) {
    return filename+"_"+Date.now();
}});

var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('whatisthis'), function (req, res, next) {
    console.log("File: ", req.file);

    fs.rename(req.file.destination+req.file.filename,'public/songs/' + req.query.filename, function(err) {
        console.log('Error: ', err);
    })
    res.status(204).end()
});

module.exports = router;
