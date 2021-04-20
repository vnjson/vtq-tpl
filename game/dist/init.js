

const vnjs = new Vnjson();

vnjs.use(sceneVnjson);
vnjs.use(showVnjson);
vnjs.use(characterVnjson);
vnjs.use(menuVnjson);
vnjs.use(loadAssets);
vnjs.use(audioVnjson);
vnjs.use(memoryCardVnjson);
vnjs.use(inputVnjson);
vnjs.use(mainMenuVnjson);
vnjs.use(itemVnjson);
vnjs.use(notifyVnjson);
vnjs.use(wikiVnjson);

/**
 * load game
 */
$.getJSON("./scenes/vn.json",  tree=>{
	var { debug, entry } = tree.$root.package;

	if(debug===true){
		vnjs.use(debugVnjson)
	}
 	vnjs.setTree(tree);
 	vnjs.on('postload', _=>{
			vnjs.emit('jump', '$root.init')
	})

 });

vnjs.on('init', function(scene){
	this.exec();
})

$('.reply').on('mousedown', e=>{
		vnjs.next()
})

