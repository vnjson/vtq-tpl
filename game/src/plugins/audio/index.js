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
		this.$store[data].play();
	})
};