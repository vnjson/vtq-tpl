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
