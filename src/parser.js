const state = require('./state.js')
const fs = require('fs')

async function letraParser(genero) {    
    console.log("Parsing")
    const base = state.load()

    var logStream = fs.createWriteStream(`./${genero}.txt`, {flags: 'a'});        
    for (const autor of base) {
        for (const obra of autor.obras) {            
            logStream.write(obra.letra+"\n");        
        }
    }
}

module.exports = letraParser
