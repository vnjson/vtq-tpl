

function jumpVnjson(){


this.on('jump', pathname=>{

				let path = pathname.split('.');

				this.current.index = 0;
				//label
				if(!/\./i.test(pathname)){
					this.current.labelName = path[0];
					this.emit('init', false)
				}
				//scene.label
				if(/\./i.test(pathname)){
						this.current.sceneName = path[0];
						this.current.labelName = path[1];
						this.emit('init', true)

				};
			})



}


function menuVnjson(){


function menu (menuObj){
$('.screen__game-menu').html('');	
$('.screen__game-menu').show();


	for(var [label, menuItem ] of Object.entries(menuObj)){
		
		if(label==='$'){
			$('.screen__text-box').html(menuItem)
		}
		else if(label===this.getCharacterById('k').id){
			this.emit('character', this.getCharacterById('k'), menuItem)
		}
		else{

			let str = `<div data-label="${ label }" class="screen__menu-item">${ menuItem }</div>`;
			$('.screen__game-menu').append(str)

		}
	}
}

this.on('menu', menu);


$( ".screen__game-menu" ).on( "click", ".screen__menu-item", e=>{
    e.preventDefault();

    this.emit('jump', e.target.dataset.label)
    $('.screen__game-menu').hide();
});
//


}

function screenVnjson(){

	var prevScreen;

	this.on('screen', function (screenName){
		if(prevScreen){	
			$(`.screen__${prevScreen}`).hide();
		}
		$(`.screen__${screenName}`).css('display', 'flex');
			prevScreen = screenName;
	})
}

function printVnjson (){

function wrapCharacterNameInReply (reply){
/*

	let r =	this.TREE.characters.filter(character=>{
						var re = new RegExp(character.name, 'i');
						if(re.test(reply)&&character.name) return true;
	})[0]
	if(r){
		let newStr = `<span style="color:${r.nameColor}">${r.name}</span>`
		return reply.replace(r.name, newStr)
	}else{
		return reply
	}
	*/
	return reply;
}

	this.on('character', (character, reply)=>{
		var newReply = wrapCharacterNameInReply.call(this, reply);
		if(!character.name){

			$('.screen__text-box').html(`<div style="color:${character.replyColor}">${newReply}</div>`);

		}else{
			$('.screen__text-box').html(`<div style="color:${character.nameColor}" class='stream__character-name'>${character.name}</div>`);
			$('.screen__text-box').append(`<div style="color:${character.replyColor}">${newReply}</div>`);
		}
	})
}

function alertVnjson (){
	this.on('alert', _=>{
		$('.screen').css({border: '1px solid red'})
	})
}


function debugVnjson (){
	this.on('*', event=>{
		if(event!=='exec'){
			console.error(`Плагин { ${event} } не найден`)
		}
	});

}

function itemVnjson (){
var store = {
	chip: '<div class="user-item zmdi zmdi-card-sim"></div>',
	clip: '<div class="user-item zmdi zmdi-attachment" ></div>',
	card: '<div class="user-item zmdi zmdi-card"></div>',
	scissors: '<div class="user-item zmdi zmdi-scissors"></div>',
	plaster: '<div class="user-item zmdi zmdi-plaster"></div>',
	wrench: '<div class="user-item zmdi zmdi-wrench"></div>'
}

	this.on('item', id=>{
		$('#userItems').append(store[id])
	})
}


function infoVnjson (){


	this.on('info', message=>{
		$('.screen__text-box').html(`[ ${message} ]`)
	})
}

/**
- audio: main-theme #play
- audio: stop
- audio: pause


- audio: 
    name: main-theme 
    action: play #[pause] #[stop]  #defalt=[play]
    loop: true #[false]
    volume: 30 #normal=100
    speed: 0.3 #normal=1
 */
function audioVnjson (){

function audio (data){



}


	this.on('audio', audio)
}