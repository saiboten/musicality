var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'tmp/', rename: function (fieldname, filename) {
    return filename+"_"+Date.now();
}});

var SongService = require('../app/Song/SongService');

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

router.put('/song', function (req, res) {
    console.log(req.body);
    SongService.updateSong(req.body);
    res.status(202).end();
});

router.get('/song/:songname', function (req, res) {
    console.log("Song name : ", req.params.songname);
    var promise = SongService.getSong(req.params.songname).then(function(song) {
        console.log("Service res: ", song);
        return res.json(song);
    }).catch(function(error){
        return res.json(error);
    });
});

module.exports = router;
