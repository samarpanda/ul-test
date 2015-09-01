class Large{
	constructor(url){
		this.url = url;
		this.init();
	}

	init(){
		this.item = document.createElement('img');
		this.item.className = 'img-lrg';
		this.setData('src', this.url);

		this.item.addEventListener('UPDATE_LARGE_IMAGE', (e) => {
			let detail = e.detail;
			console.log(detail);
		});
	}

	setData(key, value){
		this.item.setAttribute(key, value);
	}

	getData(key){
		return this.item.getAttribute(key);
	}

	getItem(){
		return this.item;
	}
}

export default new Large();
