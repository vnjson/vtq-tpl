

const vnjs = new Vnjson();



vnjs.use(menuVnjson)
vnjs.use(screenVnjson);

vnjs.use(printVnjson);


vnjs.use(itemVnjson);

vnjs.use(audioVnjson);
vnjs.use(notifyVnjson)


$.getJSON("./scenes/vn.json",  package=>{
	let { TREE, entry, debug, mode} = package;

	if(debug===true){
		vnjs.use(debugVnjson)
	}



 	vnjs.setTree(TREE);

 	vnjs.emit('screen', 'main-menu')

	$('#newGame').on('mousedown', e=>{
		if(mode==='all'){
			vnjs.setAllAssets();
		}
		vnjs.emit('jump', entry)
	})



 });



vnjs.on('init', function(scene){

if(scene){
	//this.current.assets = this.current.assets.concat(this.TREE[this.current.sceneName].assets)
}


 		vnjs.exec();
})

$('.screen__text-box').on('mousedown', e=>{
		vnjs.next()
})

