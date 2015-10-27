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
            handleRemoveInstrument: SongActions.REMOVE_INSTRUMENT,
            handleAddInstrument: SongActions.ADD_INSTRUMENT,
            adjustOffset: SongActions.ADJUST_OFFSET,
            setSongName: SongActions.SET_SONG_NAME,
            removeAlternative: SongActions.REMOVE_ALTERNATIVE
        });
    }

    setSongName(songName) {
        debug("SongStore initialized");
        this.songName = songName;
    }

    removeAlternative(info) {
        var part = this.findPart(info.part);
        var instrument = this.findInstrument(part, info.instrument);
        instrument.alternatives = instrument.alternatives.filter(alternative => {
            return alternative.name !== info.alternative;
        })
        this.updateBackend();
    }

    handleGetSong() {
        debug("SongStore initialized");
        this.parts = [];
    }

    adjustOffset(info) {
        debug('Adjusting offset, info: ', info);
        var alternative = this.findAlternative(info.part, info.instrument,info.alternative);
        alternative.offset = info.offset;
        this.updateBackend();
    }

    findAlternative(input_part, input_instrument, input_alternative) {
        var returnAlternative = undefined;

        var part = this.findPart(input_part);
        debug('part: ', part);
        var instrument = this.findInstrument(part, input_instrument);
        debug('instrument', instrument);

        instrument.alternatives.forEach(alternative => {
            if (alternative.name === input_alternative) {
                debug("Is it working?");
                returnAlternative = alternative;
            }
        });

        return returnAlternative;
    }

    findPart(input_part) {
        return this.parts.filter(part =>{
            return input_part === part.partname;
        }).reduce(init => { return init });
    }

    findInstrument(part, input_instrument) {
        return part.instruments.filter(instrument => {
            return input_instrument === instrument.name;
        }).reduce(init => { return init; });
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

    handleRemoveInstrument(info) {
        debug('Removing instrument: ', info);
        debug('this.parts before: ', this.parts);

        this.parts.forEach(part => {

            debug('part.name, info.partName: ', part.partname, info.partName);

            if(part.partname == info.partName) {
                debug('part.instruments', part.instruments);
                part.instruments = part.instruments.filter(instrument => {
                    debug('instrument.name, info.instrumentName: ', instrument.name, info.instrumentName);
                    return instrument.name !== info.instrumentName;
                })
            }
        });

        debug('this.parts after: ', this.parts);
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
        request.put('/song/update/'+this.songName).send({parts: this.parts}).end(function(err, res) {
            console.log("Backend updated ?", res, ". Err: " ,err);
        })
    }
}

module.exports = alt.createStore(SongStore, 'SongStore');