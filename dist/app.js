

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

$('.screen__game-menu').show();

function menu (menuObj){

	for(var [label, menuItem ] of Object.entries(menuObj)){
		
		if(label==='?'){
			$('.screen__text-box').html(menuItem)
		}else{

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

	const prevScreen = false;

	this.on('screen', function (screenName){
		if(prevScreen){		
			$(`.screen__${prevScreen}`).hide();
		}
		$(`.screen__${screenName}`).show();

	})
}

function printVnjson (){
	this.on('$', function (reply){
		$('.screen__text-box').html(reply)
	});

	this.on('character', (chracter, reply)=>{
		console.log(chracter, reply)
	})
}

function debugVnjson (){
	this.on('*', event=>{
		if(event!=='exec'){
			console.error(`Плагин { ${event} } не найден`)
		}
	});

	this.on('label.end', _=>{
		console.warn('label is end')
	})
}

const vnjs = new Vnjson();



vnjs.use(jumpVnjson);
vnjs.use(menuVnjson)
vnjs.use(screenVnjson);

vnjs.use(printVnjson);

//vnjs.emit('screen', 'stream')


$.getJSON("./scenes/vn.json",  package=>{
	let { TREE, entry, debug } = package;

	if(debug===true){
		vnjs.use(debugVnjson)
	}
 	vnjs.setTree(TREE);
 	vnjs.emit('jump', entry)

 	vnjs.on('init', scene=>{
 		vnjs.exec();
 	})


 });


$('.screen__text-box').on('mousedown', e=>{
		vnjs.next()
})