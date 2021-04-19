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
					action: 'stop',
					volume: 0.1,
					speed: 0.7,
					loop: true
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
					volume: 0.1,
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
	$('.stream-aside__wiki')
					.html(`<p class='info'>${msg}</p>`)
					.append(`<p>${wiki[msg]}</p>`)

});


}
