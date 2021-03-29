/**
 * debug
 */


function debugVnjson (){
	this.on('*', event=>{
		if(event!=='exec'){
			console.error(`Плагин { ${event} } не найден`)
		}
	});
	this.on('exec', ctx=>{
		console.log(this.getCurrentCharacter().name)
		//console.log(ctx)
	})

}

/**
 * screen
 */

function screenVnjson(){

	var prevScreen;
	var prevShow;
	this.on('screen', function (screenName){
		if(prevScreen){	
			$(`.screen__${prevScreen}`).hide();
		}
		$(`.screen__${screenName}`).show();
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

/**
 * character
 */

function characterVnjson (){

var renderLogo = character=>{
			$('.stream__character-logo').css('background-image', `url('${this.getAssetByName(character.logo).url}')` )
			$('.stream__character-logo').css('transition','background-image 0.5s')

}


var renderItems = character=>{

$('#activeItems').html('')
var store = this.TREE.$root.store;

if(character.items){
	 character.items.forEach(item=>{
		 if(store[item]){
			 $('#activeItems').append(store[item])
		 }
	 });
}

};//renderItems

	this.on('character', (character, reply)=>{
		renderItems(character);
		renderLogo(character)
		if(!character.name){
			$('.stream__character-name').html('')
			$('.screen__text-box').html(`<div style="color:${character.replyColor}">${reply}</div>`);
		}else{
			$('.screen__text-box').html('')
			$('.stream__character-name').html(character.name).css('color', character.nameColor)
			$('.screen__text-box').append(`<div style="color:${character.replyColor}">${reply}</div>`);
		}
	})
}



/**
 * game menu
 */

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

	this.exec({
		audio: {
			name: 'item',
			action: 'play',
			volume: 0.2,
			speed: 2.5
		} 
	})
})

var clickHundler = e=>{
    e.preventDefault();

    this.emit('jump', e.target.dataset.label)
    $('.screen__game-menu').hide();
    $('.screen__game-menu').off( "click", clickHundler)
}



$( ".screen__game-menu" ).on( "click", ".screen__menu-item", clickHundler);


}

this.on('menu', menu);
}

/**
 * Item
 */


function itemVnjson (){

var userArr = [];

function item (id){

	/*
		if(Array.isArray(id)){
			id.map(item=>{
				$('#userItems').append(this.TREE.$root.store[item])
			})
		}else{}*/

		this.getCurrentCharacter().items.forEach(i=>{
					if(i===id){
						let index = this.getCurrentCharacter().items.indexOf(id);
						console.log(index)
						//userArr = this.getCurrentCharacter().items.slice(index, 1)
					//	console.log(userArr)
						this.current.character.items = userArr
						$('#userItems').append(this.TREE.$root.store[id])
					}else{
						//$('#userItems').append(this.TREE.$root.store[id])
					}
		})
		
		
};

this.on('item', item);


}



/**
 * notify
 */
function notifyVnjson (){

	this.on('alert', msg=>{
		if(!msg){
			$('.stream__notifer').removeClass('alert').fadeIn(500);
			setTimeout(_=>{ 
				$('.stream__notifer').text('')	
			},600)
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
			$('.stream__notifer').text(msg).css('color', 'red')
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

	

	$('.stream__notifer').addClass('info')
	$('.stream__notifer').text(msg);
	this.exec({ sound: 'item' })
setTimeout(_=>{
	$('.stream__notifer').removeClass('info').fadeIn().text('');
	//$('.stream__notifer').text('');	
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
	var wiki = this.TREE.$root.wiki
	$('.stream__wiki')
					.html(`<p class='info'>${msg}</p>`)
					.append(`<p>${wiki[msg]}</p>`)

});


}



/**
 * audio
 */
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



/**
 * Input
 */

function inputVnjson (){

function input (menuObj){
$('.screen__game-menu').html('');	
$('.screen__game-menu').show();


	for(var [label, menuItem ] of Object.entries(menuObj)){
		
		if(label==='$'){
			this.emit('character', this.getCharacterById(label), `${menuItem}<b><input type="text" id="userName">`)
		}
		else if(this.getCharacterById(label)){

			this.emit('character', this.getCharacterById(label), `${menuItem}<b><input type="text" id="userName">`)
		}
		else{

			let str = `<div data-label="${ label }" class="screen__menu-item">${ menuItem }</div>`;
			$('.screen__game-menu').append(str)

		}


$( ".screen__menu-item").mouseover(_=>{

	this.exec({
		audio: {
			name: 'item',
			action: 'play',
			volume: 0.2,
			speed: 2.5
		} 
	})
})
$( ".screen__menu-item").mousedown(_=>{
	this.exec({
		audio: {
			name: 'item',
			action: 'play',
			volume: 0.5,
			speed: 1.5
		}
	})

})
}

var handler = e=>{
  e.preventDefault();
  var userName = $('#userName').val();

  if(userName!==''){
  	
  	this.getCharacterById('$').name = userName;
  	this.current.data.userName = userName;
  	this.emit('jump', e.target.dataset.label);
    $('.screen__game-menu').hide();
    $( ".screen__game-menu" ).off( "click", handler);
  }

}


$( ".screen__game-menu" ).on( "click", ".screen__menu-item", handler);

}
this.on('input', input);
}