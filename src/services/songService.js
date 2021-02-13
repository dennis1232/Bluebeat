import { beatService } from './beatService.js';

export const songService = {
    removeSong,
    addSong,
    saveSongs
}

async function saveSongs(currBeat, songs) {
    let beat = JSON.parse(JSON.stringify(currBeat));
    beat.songs = songs;
    await beatService.save(beat);
    return beat;
}

async function removeSong(songId, currBeat) {
    let beat = JSON.parse(JSON.stringify(currBeat));
    let idx = beat.songs.findIndex(song => song.id === songId);
    beat.songs.splice(idx, 1);
    await beatService.save(beat);
}

async function addSong(song, currBeat) {
    const beat = JSON.parse(JSON.stringify(currBeat));
    beat.songs.unshift(song);
    await beatService.save(beat);
    return song;
}