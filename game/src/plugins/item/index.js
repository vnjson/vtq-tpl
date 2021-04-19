function itemVnjson (){

Sortable.create(userItems, {
  group: {
    name: 'userItems',
    pull: true
  },
  animation: 100
});

Sortable.create(activeItems, {
  group: {
    name: 'activeItems',
    put: ['userItems']
  },
  animation: 100
});


var userArr = [];

function item (id){

	
		if(Array.isArray(id)){
			id.map(item=>{
				$('#userItems').append(this.TREE.$root.store[item])
			})
		}else{
			$('#userItems').append(this.TREE.$root.store[id])
		}

};

this.on('item', item);


}