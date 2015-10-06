var alt = require('../alt');
var SongActions = require('../actions/SongActions');
var SongSource = require('../sources/SongSource');

class SongStore {
    constructor() {
        this.parts = [];
        this.errorMessage = null;

        this.bindListeners({
            handleGetSong: SongActions.GET_SONG,
            handleUpdateSong: SongActions.UPDATE_SONG,
            handleGetSongFailed: SongActions.SONG_FAILED,
            handleAddSong: SongActions.ADD_SONG,
            handleAddPart: SongActions.ADD_PART,
            handleAddInstrument: SongActions.ADD_INSTRUMENT
        });
    }

    handleGetSong() {
        console.log("SongStore initialized");
        this.parts = [];
    }

    handleUpdateSong(song) {
        console.log("WOWAO, SONG IS NOT ", song);
        this.parts = song;
    }

    handleGetSongFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    handleAddSong(info) {

        this.parts.filter(part => {
            return part.partname === info.part;
        }).reduce(function(a,b) {return a; }).instruments.filter(instrument=>{
                console.log(instrument, info.instrument);
                return instrument.name === info.instrument;
            }).reduce(function(a,b) {return a}).alternatives.push({
                name: info.name,
                href: info.href
            });

        /*this.parts[0].instruments[0].alternatives.push({
            name: newSong.name,
            href: newSong.href
        })*/
    }

    handleAddPart(newSong) {
        this.parts.push({partname: newSong, instruments: []});
    }

    handleAddInstrument(info) {
        console.log("Adding instrument, info: ", info);

        this.parts.forEach( tryThisPart => {
            if(info.part === tryThisPart.partname ) {
                tryThisPart.instruments.push({name: info.instrumentName, alternatives: []});
        }});
    }


}

module.exports = alt.createStore(SongStore, 'SongStore');