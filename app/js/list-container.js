import Thumbnail from './thumbnail';

class ListContainer{
	constructor(){
		this.init();
	}

	init(){
		this.frag = document.createDocumentFragment();

		this.type = 'div';
		this.container = document.createElement(this.type);
		this.container.className = 'list-thu';
		this.container.id = 'list-con';
		this.hide();
		this.createList();
	}

	createList(){
		var imgArr = ['images/india1.jpg', 'images/india2.jpg'];
		var th,
			url, len = imgArr.length;
		for(var i=1, j=0; i<30; i++){
			url = imgArr[j++];
			j = (j === (len) ? 0 : j);
			th = new Thumbnail(i, url);
			this.frag.appendChild(th.getItem());
		}
		this.container.appendChild(this.frag);
		this.addClick();
	}

	addClick(){
		this.container.addEventListener('click', (e) => {
			var clickedLi = e.target.parentNode;
		});
	}

	getRowLastEl(el, tagName){

	}

	getContainer(){
		return this.container;
	}

	show(){
		this.container.style.cssText = '';
	}

	hide(){
		this.container.style.cssText = 'display:none';
	}
}

export default new ListContainer();
