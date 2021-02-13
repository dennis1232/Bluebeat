export const utilService ={
    getEmpty,
    makeId
}

function getEmpty() {
    return {
        currSong:{},
        visits:1,
        likes: 1,
        name: '', 
        description:'',
        imgUrl:'https://res.cloudinary.com/bluebeat/image/upload/v1606685267/bluebeat/srdn8qp7cpwx3ywieq2n.png',
        tags:[
            'love',
            'happy'
        ],
        genre:'',
        createdBy: {
            userName: 'Dennis',
            imgUrl: '',
            id: '123'
        },
        songs:[
         
        ]
    }
}

function makeId(length = 5) {
    var txt = '_'
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}