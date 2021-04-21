
function characterVnjson (){

var renderLogo = character=>{
			$('.character__logo').css('background-image', `url('${this.getAssetByName(character.logo).url}')` )
			$('.character__logo').css('transition','background-image 0.1s')

}
var re = new RegExp(/{{\D*\S.*}}/,'i');
var replyParse = (reply)=>{

			if(re.test(reply)){
				let str = reply.match(re)[0];

				let keyWord = str.split('{{')[1].split('}}')[0]

				return reply.replace(str, `<i>${this.current.data[keyWord]}</i>`)
			}
			else{
				return reply;
			}
			
}

this.on('character', (character, reply)=>{
				
	if(character.logo){
		renderLogo(character)
	}
	if(!character.name){
		$('.character__name').html('')
		$('.reply').html(replyParse(reply))
							 .css('color', character.replyColor);
	}else{
		$('.character__name').html(character.name).css('color', character.nameColor).css('transition','background-image 0.5s')
		$('.reply').html(replyParse(reply))
							 .css('color', character.replyColor)
	}
});

}