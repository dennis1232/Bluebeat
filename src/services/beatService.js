import HttpService from './HttpService.js'

export const beatService = {
    query,
    getById,
    save,
    removeBeat
}

const BASE_URL = 'http://localhost:3030'

async function query(filterBy) {
    var beats = await HttpService.get(`beat?genre=${filterBy.genreFilter}`)
    if (filterBy.beatTitle !== '') {
        var filteredBeats = beats.filter(beat => beat.name.toLowerCase().includes(filterBy.beatTitle))
        return filteredBeats
    } else return beats;
}

async function save(beat) {
    if (!beat._id) return await HttpService.post(`beat`, beat)
    return await HttpService.put(`beat/${beat._id}`, beat)
}

function getById(beatId) {
    return HttpService.get(`beat/${beatId}`)
}

function removeBeat(beatId) {
    return HttpService.delete(`beat/${beatId}`)
}
