

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
		else if(label===this.getCharacterByName('k').name){
			this.emit('character',this.getCharacterByName('k'), menuItem)
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

	this.on('$', reply=>{
		$('.screen__text-box').html(reply)
	});

	this.on('character', (character, reply)=>{
		$('.screen__text-box').html(`<p style="color:${character.color}">${character.text}</p>`);
		$('.screen__text-box').append(`<p style="color:${character.replyColor}">${reply}</p>`);

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


function audioVnjson (){

function audio (data){

	

}


	this.on('audio', audio)
}