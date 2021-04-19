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