

const vnjs = new Vnjson();


vnjs.use(jumpVnjson);
vnjs.use(menuVnjson)
vnjs.use(screenVnjson);

vnjs.use(printVnjson);
vnjs.use(alertVnjson);
vnjs.use(infoVnjson);
vnjs.use(itemVnjson)


//vnjs.emit('screen', 'stream')


$.getJSON("./scenes/vn.json",  package=>{
	let { TREE, entry, debug, title } = package;

	if(debug===true){
		vnjs.use(debugVnjson)
	}
	$('title').text(title)
 	vnjs.setTree(TREE);

 	vnjs.emit('screen', 'main-menu')

	$('#newGame').on('mousedown', e=>{
		vnjs.emit('jump', entry)
	})



 });


vnjs.on('init', scene=>{
 		vnjs.exec();
})

$('.screen__text-box').on('mousedown', e=>{
		vnjs.next()
})