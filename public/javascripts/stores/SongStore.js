var alt = require('../alt');
var SongActions = require('../actions/SongActions');
var request = require('superagent');
var debug = require('debug')('SongStore');

class SongStore {
    constructor() {
        this.songName = "Awesome";
        this.parts = [];
        this.errorMessage = null;

        this.bindListeners({
            handleGetSong: SongActions.GET_SONG,
            handleUpdateSong: SongActions.UPDATE_SONG,
            handleGetSongFailed: SongActions.SONG_FAILED,
            handleAddAlternative: SongActions.ADD_ALTERNATIVE,
            handleAddPart: SongActions.ADD_PART,
            handleRemovePart: SongActions.REMOVE_PART,
            handleAddInstrument: SongActions.ADD_INSTRUMENT
        });
    }

    handleGetSong() {
        debug("SongStore initialized");
        this.parts = [];
    }

    handleUpdateSong(song) {
        debug("WOWAO, SONG IS NOT ", song);
        this.parts = song;
    }

    handleGetSongFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    handleAddAlternative(info) {
        this.parts.filter(part => {
            return part.partname === info.part;
        }).reduce(function(a,b) {return a; }).instruments.filter(instrument=>{
                console.log(instrument, info.instrument);
                return instrument.name === info.instrument;
            }).reduce(function(a,b) {return a}).alternatives.push({
                name: info.name,
                href: info.href
            });

        this.updateBackend();
    }

    handleAddPart(newSong) {
        debug("Adding part");
        this.parts.push({partname: newSong, instruments: []});
        this.updateBackend();
    }

    handleRemovePart(partName) {
        this.parts = this.parts.filter(function(elem) {
            if(elem.partname === partName) {
                debug('Found part to remove', partName);
                return false;
            }
            return true;
        });
        this.updateBackend();
    }

    handleAddInstrument(info) {
        debug("Adding instrument, info: ", info);

        this.parts.forEach( tryThisPart => {
            if(info.part === tryThisPart.partname ) {
                tryThisPart.instruments.push({name: info.instrumentName, alternatives: []});
        }});

        this.updateBackend();
    }

    updateBackend() {
        console.log("Updating backend");
        request.put('/song').send({songName: this.songName, parts: this.parts}).end(function(err, res) {
            console.log("Backend updated ?", res, ". Err: " ,err);
        })
    }
}

module.exports = alt.createStore(SongStore, 'SongStore');