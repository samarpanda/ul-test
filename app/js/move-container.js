import utils from './utils';
import slideshow from './slideshow';
class MoveContainer{
	constructor(){
		this.type = 'div';
		this.activeNode = null;
		this.init();
	}

	createSlideshow(){
		this.item.appendChild(slideshow.getItem());
	}

	createNextPrevButton(){
		var next = document.createElement('div');
		next.className = 'next-arrow';
		this.item.appendChild(next);

		var prev = document.createElement('div');
		prev.className = 'prev-arrow';
		this.item.appendChild(prev);
	}

	prevNextHandler(i){
		var el;
		el = i === 1 ? this.getNextEl() : this.getPrevEl();
		if(el){
			var thumbClickEvent = new CustomEvent("THUMB_CLICKED", {
				detail: {
					item: el,
					type: el.tagName
				},
				bubbles: true,
				cancelable: false
			});
			this.item.dispatchEvent(thumbClickEvent);
		}
	}

	init(){
		this.item = document.createElement(this.type);
		this.item.className = 'mcon-b';
		this.item.id = 'mov-con';

		this.item.addEventListener('THUMB_CLICKED', (e) => {
			let detail = e.detail;
			// Toggle
			if(this.activeNode === detail.item){
				this.toggle();
				return;
			}
			this.activeNode = detail.item;

			let rowItem = this.getRowLastEl(detail.item, detail.type);
			this.moveItem(rowItem);
		});

		this.createSlideshow();
		this.createNextPrevButton();

		this.item.addEventListener('click', (e)=>{
			var clname = e.target.className;
			if( clname === 'prev-arrow'
				|| clname === 'next-arrow'
			){
				let i = clname === 'next-arrow' ? 1 : 0;
				this.prevNextHandler(i);
			}
		});

		//Default: Hide the movable container
		this.hide();
	}

	moveItem(el){
		utils.insertAfter(this.item, el);
		this.show();
	}

	getNextEl(){
		var el = this.activeNode.nextSibling;
		if(el && el.id === 'mov-con'){
			el = el.nextSibling;
		}
		return el;
	}

	getPrevEl(node){
		return this.activeNode.previousSibling;
	}

	getRowLastEl(node, tagName){
		if(!this.isValidNode(node, tagName)){
			return false;
		}
		var preNode = node;
		var curr, rect;
		while(this.isValidNode(node, tagName)){
			rect = node.getBoundingClientRect().bottom;
			curr = preNode.getBoundingClientRect().bottom;
			if(rect - curr > 30){
				break;
			}
			if(!this.hasNextValidNode(node)){
				return node;
			}
			preNode = node;
			node = node.nextSibling;
		}
		return preNode;
	}

	isValidNode(node, tagName){
		var tagName = tagName.toUpperCase();
		var bool = false;
		if(node
			&& node.nodeType === 1
			&& node.nodeName === tagName
			&& node.className === 'itm-thu'
		){
			bool = true;
		}
		return bool;
	}

	hasNextValidNode(node){
		var bool = false;
		if(node
			&& node.nodeType === 1
			&& node.nextSibling
		){
			var nxt = node.nextSibling;
			bool = nxt.className === 'itm-thu' ? true : false;
		}
		return bool;
	}

	getContainer(){
		return this.item;
	}

	toggle(){
		if(this.item.style.cssText === ''){
			this.hide();
		}else{
			this.show();
		}
	}

	show(){
		this.item.style.cssText = '';
	}

	hide(){
		this.item.style.cssText = 'display:none';
	}
}

export default new MoveContainer();
