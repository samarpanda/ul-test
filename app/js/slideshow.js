import large from './large';
class Slideshow{
	constructor(){
		this.type = 'div';
		this.init();
	}

	init(){
		this.item = document.createElement(this.type);
		this.item.className = '';
		this.item.appendChild(large.getItem());
	}

	getItem(){
		return this.item;
	}
}

export default new Slideshow();
