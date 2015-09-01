import image from './image';
class Thumbnail{
	constructor(id, url){
		this.id = id;
		this.url = url;
		this.init();
	}

	init(){
		this.type = 'div';
		this.item = document.createElement(this.type);
		this.item.className = 'itm-thu';
		image.setUrl(this.url);
		this.item.innerHTML = image.getThumbnailImg();

		this.setData('data-id', this.id);
		this.setData('data-url', this.url);
	}

	setData(key, value){
		this.item.setAttribute(key, value);
	}

	getData(key){
		return this.item.getAttribute(key);
	}

	getId(){
		return this.id;
	}

	getItem(){
		return this.item;
	}
}

export default Thumbnail;
