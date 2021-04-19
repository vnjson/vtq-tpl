function loadAssets (){




var getAssets = _=>{
  this.emit('preload')
var i = 0;

var load = _=>{
	var asset = this.current.assets[i];
	
	if(/\.mp3|\.wav/i.test(asset.url)){
    var sound = new Howl({src: asset.url})
    		sound.on('load', _=>{
    			this.$store[asset.name] = sound;
 					if( this.current.assets.length-1>=++i){
            this.emit('load', asset)
 						load();
 						
 					}else{
            this.emit('postload') 
 					}							
				});
 
  }
  else if(/\.png|\.jpg|.webp/i.test(asset.url)){
  	
      let img = new Image();
       img.src =  asset.url;
       img.onload = ()=>{
       		this.$store[asset.name] =	asset.url
       		if(this.current.assets.length-1>=++i){
            this.emit('load', asset)
       			load();

       		}else{
            this.emit('postload')
       			
       		};
       };  
  }
  else{
  	console.log(asset.url +' Формат не поддерживается')
  }
};

load();


};

var setAllAssets = ()=>{

    for(let [scene, body] of Object.entries(this.TREE)){
        this.current.assets = this.current.assets.concat(body.assets);
    };
    getAssets();
}

/*
this.on('preload', scene=>{

	var assets = this.TREE[this.current.sceneName].assets;
  this.current.assets = this.current.assets.concat(assets);

  this.emit('setAssets');
})

*/

this.on('setTree', _=>{

  setAllAssets();

});




}
