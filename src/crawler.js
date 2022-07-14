const state = require('./state.js')
const axios = require('axios');
const cheerio = require('cheerio');
const { htmlToText } = require('html-to-text');

async function fetchHTML(url) {
    const { data } = await axios.get(url)
    return cheerio.load(data)
}

function sleep (milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


async function crawlerVL(genero) {    
    console.log("Scraping")
    
    const base = []
    const urlAutores = `https://www.vagalume.com.br/browse/style/${genero}.html`    
  
    const $ = await fetchHTML(urlAutores)
    $('.namesColumn li').each(function(i){     
        let nome = $(this).text()
        let normalizedNome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        base.push({genero, url:`https://www.vagalume.com.br/${ normalizedNome.replace(/\s+/g, '-').toLowerCase()}`, nome, obras:[]})        
    });
            
    for (const autor of base) {     
        console.log("==================================") 
        console.log(`Autor: ${autor.nome}`)
          
        let $ = await fetchHTML(autor.url)
        //add obra 
        $('#alfabetMusicList .nameMusic').each(function(i){       
            let titulo = $(this).text()
            let normalizedTitulo = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
            let letraUrl = `${autor.url}/${normalizedTitulo.replace(/\s+/g, '-').toLowerCase()}.html`                              
            autor.obras.push({url:letraUrl,titulo})                             
        }); 

        // olha o crime =/ mas sem tempo pra lidar com a async do jquery ...
        // To-do verificar se a letra ta em portugues
        for (const obra of autor.obras) {                        
            console.log(`Titulo: ${obra.titulo}`)
            try {
                let $ = await fetchHTML(obra.url)  
                const text = htmlToText($("#lyrics").html())    
                obra.letra = text                  
                await sleep(1000)                
            } catch (error) {                
            }
        }                
    }        
    state.save(base)        
}

module.exports = crawlerVL
