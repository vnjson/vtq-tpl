function showVnjson(){
	var prevScreen;
	var prevShow;
	
	function show (name){
				if(prevScreen){	
					$(`.show__${prevScreen}`).hide();
				}
				//this.current.render.screen = name;
				$(`.show__${name}`).show();
					prevScreen = name;

	}


	this.on('show', show);

}