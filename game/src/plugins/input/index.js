
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