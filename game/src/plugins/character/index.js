

/**
 * character
 */

function characterVnjson (){

var renderLogo = character=>{
			$('.character__logo').css('background-image', `url('${this.getAssetByName(character.logo).url}')` )
			$('.character__logo').css('transition','background-image 0.1s')

}
//{{\D*\S.*}}

this.on('character', (character, reply)=>{
	if(character.logo){
		renderLogo(character)
	}
	if(!character.name){
		$('.character__name').html('')
		$('.reply').html(reply)
							 .css('color', character.replyColor);
	}else{
		$('.character__name').html(character.name).css('color', character.nameColor).css('transition','background-image 0.5s')
		$('.reply').html(reply)
							 .css('color', character.replyColor)
	}
});

}