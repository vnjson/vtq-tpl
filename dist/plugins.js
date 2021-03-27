

function menuVnjson(){


function menu (menuObj){
$('.screen__game-menu').html('');	
$('.screen__game-menu').show();


	for(var [label, menuItem ] of Object.entries(menuObj)){
		
		if(label==='$'){
			this.emit('character', this.getCharacterById(label), menuItem)
		}
		else if(this.getCharacterById(label)){

			this.emit('character', this.getCharacterById(label), menuItem)
		}
		else{

			let str = `<div data-label="${ label }" class="screen__menu-item">${ menuItem }</div>`;
			$('.screen__game-menu').append(str)

		}
	}

$( ".screen__menu-item").mouseover(_=>{
/*
	this.exec({
		audio: {
			name: 'menu-item',
			action: 'play',
			volume: 0.2,
			speed: 2.5
		}
	})*/
})
$( ".screen__menu-item").mousedown(_=>{

//this.emit('sound', 'menu-item')
/*
	this.exec({
		audio: {
			name: 'menu-item',
			action: 'play',
			volume: 0.5,
			speed: 1
		}
	})*/
})
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
	var prevShow;
	this.on('screen', function (screenName){
		if(prevScreen){	
			$(`.screen__${prevScreen}`).hide();
		}
		$(`.screen__${screenName}`).css('display', 'flex');
			prevScreen = screenName;
	});

	this.on('show', function (showName){
		if(prevShow){	
			$(`.show__${prevShow}`).hide();
		}
		$(`.show__${showName}`).show();
			prevShow = showName;
	})

}

function printVnjson (){

	this.on('character', (character, reply)=>{

		if(!character.name){

			$('.screen__text-box').html(`<div style="color:${character.replyColor}">${reply}</div>`);

		}else{
			$('.screen__text-box').html(`<div style="color:${character.nameColor}" class='stream__character-name'>${character.name}</div>`);
			$('.screen__text-box').append(`<div style="color:${character.replyColor}">${reply}</div>`);
		}
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





function audioVnjson (){

var store = {};	

this.on('setAllAssets', _=>{
	this.current.assets.forEach(asset=>{
			store[asset.name] = new Howl({src: asset.url})
	})

})

function audio (data){




store[data.name].rate(data.speed||1);
store[data.name].loop(data.loop||false);
store[data.name].volume(data.volume||1)
store[data.name][data.action]();
}


	this.on('audio', audio);
	this.on('sound', data=>{
		store[data].play();
	})
};

function notifyVnjson (){

	this.on('alert', msg=>{
		if(!msg){
			$('.stream__notifer').removeClass('alert');
			$('.stream__notifer').text('');
			this.exec({
				audio: {
					name: 'warn',
					action: 'stop',
					volume: 0.1,
					speed: 0.7,
					loop: true
				}
			})

		}
		else{
			$('.stream__notifer').addClass('alert');
			$('.stream__notifer').text(msg)
			this.exec({
				audio: {
					name: 'warn',
					action: 'play',
					volume: 0.1,
					speed: 0.7,
					loop: true
				}
			})
		}
		
	});



this.on('info', msg=>{

	this.exec({ sound: 'item' })

	$('.stream__notifer').addClass('info')
	$('.stream__notifer').text(msg);

setTimeout(_=>{
	$('.stream__notifer').removeClass('info');
	$('.stream__notifer').text('');	
},5000)

})

this.on('character', (character, reply)=>{
/**
 * Получаем элементы <i></i>
 */
var re = new RegExp(/<i>\D*\S.*<\/i>/,'i')

		if(re.test(reply)){
			let str1 = reply.match(re)[0];
			let str2 = str1.match(/[^<i>]\D*\S.*[^<\/i>]/)[0];
			this.emit('wiki', str2)
		}

})

this.on('wiki', msg=>{
	var wiki = this.TREE.volume_1.wiki
	$('.stream__wiki')
					.html(`<p class='info'>${msg}</p>`)
					.append(`<p>${wiki[msg]}</p>`)

});


}