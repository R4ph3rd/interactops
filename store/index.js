module.exports = {
    general:{},
    temp:{},
    tempAccess:{
        viewer:{},
        collaborator:{}
    },
    archived: [],
    tempDelay: 20000, //delay to store temporaly content shared by users
    archivesClearInterval : 3600000, // every hour
    checkInterval : 60000, // every min
    checkTimeout : this.checkInterval/2,
    defaultRoom:'general'
}