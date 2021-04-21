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
/**
 * audio
 */
function audioVnjson (){

var audio = data=>{

	if(typeof data==='string'){
	
		this.$store[data].play();

	}
	else{
		this.$store[data.name].rate(data.speed||1);
		this.$store[data.name].loop(data.loop||false);
		this.$store[data.name].volume(data.volume||1)
		this.$store[data.name][data.action]();
	}

}

	this.on('audio', audio);
	this.on('sound', data=>{
		this.$store[data].volume(0.05)
		this.$store[data].play();

	})
};
function debugVnjson (){


var error = new Howl({src: './assets/error.mp3'});

var log = {
  error: msg=>{
  	error.play()
    console.log(`%c Error %c ${msg}`, "color: white; background: red; font-size:12px;", "color: red; font-size:12px;");
  },

  scene: (scene, label)=>{
    console.log(`%c ${scene} %c ${label}`, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  event: (e, msg="")=>{
    console.log(`%c ${e} %c ${msg} `, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  //#A0BACB
  index: _=>{
    console.log(`%c vnjson.js %c v${this.version} `, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  warn: msg=>{

    console.log(`%c Warn %c ${msg}`, "color: white; background: #fab52a; font-size:12px;", "color: #e89b00; font-size:12px;");
  },
}
log.index()

 	this.on('preload', _=>{
 		log.event('<preload>', 'TREE')
 	});
 	this.on('load', asset=>{
 		console.log(asset)
 	})
 	this.on('postload', _=>{
 		log.event('</postload>')
 	})
 	this.on('init', scene=>{
 		console.log(this.current.sceneName, this.current.labelName)
 	})
/**
 * Регистрируем системные события,
 * что бы не выводило в консоль ошибку
 * неизвестного события
 *//*
var sysEvents = ['postload'];
this.on('setTree', _=>{
	Object.keys(this.TREE).map(e=>{
		sysEvents.push(`postload.${e}`)
	});


})
*/

	this.on('pathNotFound', ()=>{
		log.error('{ menu } or { jump } leads nowhere');
		console.warn(`scene: ${this.current.sceneName}`);
		console.warn(`label: ${this.current.labelName}`);
	});
	this.on('labelEnd', ()=>{
		
		log.warn(`No way out of the label [ ${this.current.labelName} ]`)
	});

	this.on('*', event=>{

		log.error(`Плагин { ${event} } не найден`);
		/*sysEvents.forEach(e=>{
			if(event!==e){
			//	console.log(event,e)
				
			}
		})*/
	});


	this.on('exec', ctx=>{
		
		//console.log(ctx)
	});
/*
this.on('init', scene=>{
	history()
})
var history = _=>{
	
	let { labelName, sceneName, index } = this.current;
	let pathName =`/${sceneName}/${ labelName }`
	window.location.hash = pathName;
	this.emit('saveData')
}


if(window.location.hash!==''){
	this.emit('loadData')
}

*/


}
function mainMenuVnjson (){

let scene = `<div class="scene scene__main-menu">
								<div class="main-menu__item-wrapper"></div>
						</div>`;

$('#screen').append(scene)

this.emit('scene', 'main-menu')


function mainMenu (data){
	for(var [label, text ] of Object.entries(data)){
			$('.scene__main-menu').append(`<div class='main-menu__item' data-label="${label}">${text}</div>`)
	}

var clickHundler = e=>{
  this.emit('jump', e.target.dataset.label)

}

$( ".main-menu__item" ).on( "click", clickHundler);


}

this.on('mainMenu', mainMenu)




}

/**
 * Input
 */

function inputVnjson (){

var setName;


function input (menuObj){
$('.game-menu').html('');	
$('.game-menu').show();


	for(var [label, menuItem ] of Object.entries(menuObj)){
		
		if(label==='$'){
			this.emit('character', this.getCharacterById(label), `${menuItem}<b><input type="text" id="userData">`)
		}
		else if(this.getCharacterById(label)){
			this.emit('character', this.getCharacterById(label), `${menuItem}<b><input type="text" id="userData">`)
		}
		else if(label==='set'){
			setName = menuItem
		}
		else{

			let str = `<div data-label="${ label }" class="game-menu__menu-item">${ menuItem }</div>`;
			$('.game-menu').append(str)

		}


var handler = e=>{
  e.preventDefault();
  var userData = $('#userData').val();

  if(userData!==''){
  	this.current.data[setName] = userData

  	if(setName==='userName'){
  		this.getCharacterById('$').name = this.current.data.userName;

  		this.emit('jump', e.target.dataset.label);
    	$('.game-menu').hide();
    	$( ".game-menu" ).off( "click", handler);
  	}
  }

}


$( ".game-menu" ).on( "click", ".game-menu__menu-item", handler);

}

$( ".game-menu__menu-item").mouseover(_=>{

	this.exec({
		audio: {
			name: 'item',
			action: 'play',
			volume: 0.2,
			speed: 2.5
		} 
	})
})


}

this.on('input', input);



}
function itemVnjson (){

Sortable.create(userItems, {
  group: {
    name: 'userItems',
    pull: true
  },
  animation: 100
});

Sortable.create(activeItems, {
  group: {
    name: 'activeItems',
    put: ['userItems']
  },
  animation: 100
});


var userArr = [];

function item (id){

	
		if(Array.isArray(id)){
			id.map(item=>{
				$('#userItems').append(this.TREE.$root.store[item])
			})
		}else{
			$('#userItems').append(this.TREE.$root.store[id])
		}

};

this.on('item', item);


}

/**
 * menu
 */

function menuVnjson(){


function menu (menuObj){
$('.game-menu').html('');	
$('.game-menu').show();




	for(var [label, menuItem ] of Object.entries(menuObj)){
		var character = this.getCharacterById(label)
		if(character){
			if(label==='$'){
				character.name = this.current.data.userName;
			}
			this.emit('character', character, menuItem)
		}
		else{

			let str = `<div data-label="${ label }" class="game-menu__menu-item">${ menuItem }</div>`;
			$('.game-menu').append(str)

		}
	}


var clickHundler = e=>{
    e.preventDefault();

    this.emit('jump', e.target.dataset.label)
    $('.game-menu').hide();
    $('.game-menu').off( "click", clickHundler)
}



$( ".game-menu" ).on( "click", ".game-menu__menu-item", clickHundler);

$( ".game-menu__menu-item").mouseover(_=>{

	this.exec({
		audio: {
			name: 'item',
			action: 'play',
			volume: 0.2,
			speed: 2.5
		} 
	})
})
}

this.on('menu', menu);


}
/**
 * notify
 */
function notifyVnjson (){

	this.on('alert', msg=>{
		if(!msg){
			$('.stream-aside__notifer').removeClass('alert').fadeIn(500);
			setTimeout(_=>{ 
				$('.stream-aside__notifer').text('')	
			},600)
			this.exec({
				audio: {
					name: 'warn',
					action: 'stop'
				}
			})

		}
		else{
			$('.stream-aside__notifer').addClass('alert');
			$('.stream-aside__notifer').text(msg)
			this.exec({
				audio: {
					name: 'warn',
					action: 'play',
					volume: 0.05,
					speed: 0.7,
					loop: true
				}
			})
		}
		
	});



this.on('info', msg=>{

	$('.stream-aside__notifer').addClass('info')
	$('.stream-aside__notifer').text(msg);
	this.emit('sound', 'item')
	
setTimeout(_=>{
	$('.stream-aside__notifer').removeClass('info').fadeIn().text('');
	//$('.stream__notifer').text('');	
},2000)

})

}



function memoryCardVnjson (){

//this.emit('stateSave')
this.on('saveData', _=>{
	store(this.current);
})

//this.emit('stateLoad') debug
this.on('loadData', _=>{


this.current = store.getAll();

this.emit('scene', this.current.render.screen)

this.emit('jump', [this.current.sceneName, this.current.labelName].join('.'))

if(!this.ctx.hasOwnProperty('menu')||!this.ctx.hasOwnProperty('input')){
	$('.game-menu').hide();
}

})

}
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
function wikiVnjson(){


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

this.on('wiki', key=>{
	var wiki = this.TREE.$root.wiki;
	wiki.map(item=>{
		if(item.key===key){
				$('.stream-aside__wiki')
					.html(`<p class='info'>${item.title}</p>`)
					.append(`<p>${item.text}</p>`)
		}
	})


});


}
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