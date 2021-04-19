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