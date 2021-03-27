

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
			name: 'menu-item',
			action: 'play',
			volume: 0.2,
			speed: 2.5
		}
	})
})
$( ".screen__menu-item").mousedown(_=>{

	this.exec({
		audio: {
			name: 'menu-item',
			action: 'play',
			volume: 0.5,
			speed: 1
		}
	})
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

var re = new RegExp(/<i>\D*\S.*<\/i>/,'i')

function wiki (reply){
		if(re.test(reply)){
			let str1 = reply.match(re)[0];
			let str2 = str1.match(/[^<i>]\D*\S.*[^<\/i>]/)[0];
			
			this.emit('wiki', str2)
		}	
}


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

}

	this.on('character', (character, reply)=>{
		wiki.call(this, reply)
		var newReply = reply// wrapCharacterNameInReply.call(this, reply);
		if(!character.name){

			$('.screen__text-box').html(`<div style="color:${character.replyColor}">${newReply}</div>`);

		}else{
			$('.screen__text-box').html(`<div style="color:${character.nameColor}" class='stream__character-name'>${character.name}</div>`);
			$('.screen__text-box').append(`<div style="color:${character.replyColor}">${newReply}</div>`);
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


/**
 * Для дебага дерево прыжков строим
 */
function treeVnjson (){



/**
 * Строим дерево наших похождений
 * Это нужно для того, дебага и может потом
 * реализуют .pref но это не точно.
 */
var sceneNode;
function progressTreeBuilding  (isScene){

var scene = this.current.sceneName;
var label = this.current.labelName


if(isScene){

			sceneNode = {
							name: scene,
							children: new Array()
					};

		//Добавляю узел в глобальное рисунок дерева
		this.current.tree.push(sceneNode);
}


	//Определяю индекс свежесозданного узла внутри дерева
	let indexInTree = this.current.tree.indexOf(sceneNode);

	//Получаю доступ к текущему узлу
	var sceneObject = this.current.tree[indexInTree];

	//добавляю в текущую сцену все label по которым
	//перешел пользователь 
	sceneObject.children.push(label);	
};

this.on('init', progressTreeBuilding)


};


function audioVnjson (){

var store = {};	

//store[]

this.on('setAllAssets', _=>{
	this.current.assets.forEach(asset=>{
			store[asset.name] = new Howl({src: asset.url})
	})

})

function audio (data){



store[data.name][data.action]();
store[data.name].rate(data.speed||1);
store[data.name].loop(data.loop||false);
store[data.name].volume(data.volume||1)

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


this.on('wiki', msg=>{
	var wiki = this.TREE.volume_1.wiki
	$('.stream__wiki')
					.html(`<p class='info'>${msg}</p>`)
					.append(`<p>${wiki[msg]}</p>`)

});


}