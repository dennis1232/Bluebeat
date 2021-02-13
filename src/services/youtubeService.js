import axios from 'axios';
import { utilService } from '../services/utilService.js'


// const API_KEY = 'AIzaSyAjomhb13MGxX40vmZRilGWxjt1y6rb42U';
const API_KEY = 'AIzaSyDNZHEy_PeJZz10KTj0ug-Bs6Qld8TKpmg';
// AIzaSyA3xup2cQRDiG3SppVytqu-nSPdhxLSwmw
// AIzaSyC-N5so2icAp6xd1c2gQhlOkwez2J2LVZA


export const youtubeService = {
    getSong,
}

async function getSong(q) {
    if (!q) return null
    const path = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${q}&key=${API_KEY}`
    try {
        const searchSongs = await axios.get(path)
        const youTubeIds = await searchSongs.data.items.map(song => song.id.videoId)
        const songsDetails = await _getDetails(youTubeIds)
        const neededDetails = await _neededDetails(songsDetails)
        return neededDetails;
    } catch (err) {
        console.log('err');
    }
}

async function _getDetails(youTubeIds) {
    const songsDetails = []
    youTubeIds.forEach(async (id) => {
        const videoDetails = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`
        songsDetails.push(axios.get(videoDetails)
            .then(result => new Promise(resolve => resolve(result.data.items[0])))
        )
    })
    const details = await Promise.all(songsDetails)
    return details
}

async function _neededDetails(songs) {
    const neededDetails = []
    songs.forEach(async (song) => {
        let songDetails = {
            id: utilService.makeId(),
            youtubeId: song.id,
            title: _setTitle(song.snippet.title),
            imgUrl: song.snippet.thumbnails.medium.url,
            duration: _setDuration(song.contentDetails.duration),
        }
        await neededDetails.push(songDetails)
    })
    const data = await Promise.all(neededDetails)
    return data
}



function _setTitle(title){
    var title = title.replace('(','')
    var title2 = title.replace(')','')
   var title3 = title2.replace('Official Video','')
    return title3


}

function _setDuration(duration) {
    var playTime = duration.replace('PT', '')
    var playTime1 = playTime.replace('M', ':');
    var playTime2 = playTime1.replace('S', '')
    return playTime2
}

