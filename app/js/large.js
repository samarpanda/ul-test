class Large{
	constructor(url){
		this.url = url;
		this.init();
	}

	init(){
		this.item = document.createElement('img');
		this.item.className = 'img-lrg';
		this.setData('src', this.url);

		addEventListener('THUMB_CLICKED', (e)=>{
			let detail = e.detail;
			let item = detail.item;
			this.setData('src', item.getAttribute('data-url'));
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
