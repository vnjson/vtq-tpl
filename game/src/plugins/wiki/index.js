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