/**
 * @scene
 */


function sceneVnjson(){

function isValid (screenName){

let rules = {
  screenName: 'required|string'
};
var validation = new Validator({screenName}, rules);

if(validation.fails()){
	let error = validation.errors.first('screenName');
	console.error(error)

}

return validation.passes();
}

	var prevScreen;
	var prevShow;
	this.on('scene', function (screenName){
		if(isValid(screenName)){
				if(prevScreen){	
					$(`.scene__${prevScreen}`).hide();
				}
				this.current.render.screen = screenName;
				$(`.scene__${screenName}`).show();
					prevScreen = screenName;
		}
	});



}