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

router.get('/get_songs', function (req, res) {
    SongService.getSongs().then(function(songs) {
        console.log("Service res: ", songs);
        return res.json({"songs": songs});
    }).catch(function(error){
        return res.json(error);
    });
});

router.put('/song/update/:songname', function (req, res) {
    console.log(req.body);
    SongService.updateSong(req.params.songname, req.body);
    res.status(202).end();
});

router.put('/song/new/:songname', function (req, res) {
    SongService.addSong(req.params.songname);
    res.status(202).end();
});

router.get('/song/:songName', function (req, res) {
    res.render('song', { songName: req.params.songName });
});

router.get('/song/rest/:songname', function (req, res) {
    console.log("Song name : ", req.params.songname);
    var promise = SongService.getSong(req.params.songname).then(function(song) {
        console.log("Service res: ", song);
        return res.json(song);
    }).catch(function(error){
        return res.json(error);
    });
});

module.exports = router;
