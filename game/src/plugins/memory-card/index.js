

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