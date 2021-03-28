

const vnjs = new Vnjson();

/**
 * Connect plugins
 */
vnjs.use(screenVnjson);
vnjs.use(characterVnjson);
vnjs.use(menuVnjson);
vnjs.use(itemVnjson);
vnjs.use(notifyVnjson);
vnjs.use(audioVnjson);

/**
 * load game
 */

$.getJSON("./scenes/vn.json",  tree=>{
	var { debug, entry } = tree.$root.package;

	if(debug===true){
		vnjs.use(debugVnjson)
	}

 	vnjs.setTree(tree);

 	/**
 	 * start game
 	 * ctx [Object]
 	 */
 	vnjs.exec({ screen: 'main-menu'})

 });

$('#newGame').on('mousedown', e=>{
	let { mode, entry } = vnjs.TREE.$root.package;
	
	if(mode==='all'){
				vnjs.setAllAssets();
	}
	vnjs.emit('jump', entry)
})

vnjs.on('init', function(scene){

if(scene){
	//this.current.assets = this.current.assets.concat(this.TREE[this.current.sceneName].assets)
}


 		vnjs.exec();
})

$('.screen__text-box').on('mousedown', e=>{
		vnjs.next()
})

