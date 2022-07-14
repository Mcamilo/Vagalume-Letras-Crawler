const scripts = {
	crawlerVL:require('./src/crawler.js'),
	letraParser:require('./src/parser.js')	
}

async function start() {
	
	const genero = "bossa-nova"
	await scripts.crawlerVL(genero)
	await scripts.letraParser(genero)

}
start()
