const notifier = require('node-notifier');
const robots = {
	crawlerVL:require('./robots/crawler.js'),
	letraParser:require('./robots/parser.js')	
}

async function start() {
	
	const genero = "bossa-nova"
	await robots.crawlerVL(genero)
	await robots.letraParser(genero)
	notifier.notify({
		title: 'Coletor de Letras',
		message: 'Done!',		
		sound: true
	});
}
start()
