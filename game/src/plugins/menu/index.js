
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
   
    $('.game-menu').off( "click", clickHundler)
    $('.game-menu').hide();
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