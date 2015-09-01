import utils from './utils';
class MoveContainer{
	constructor(){
		this.type = 'div';
		this.init();
		this.prevNode = null;
	}

	init(){
		this.item = document.createElement(this.type);
		this.item.className = 'mcon-b';
		this.item.id = 'mov-con';

		this.item.addEventListener('THUMB_CLICKED', (e) => {
			let detail = e.detail;
			let lastRowItem = this.getRowLastEl(detail.item, detail.type);

			if(this.preNode === lastRowItem){
				this.toggle();
				return;
			}
			this.moveItem(lastRowItem);
		});

		this.hide();
	}

	moveItem(el){
		this.preNode = el;
		utils.insertAfter(this.item, el);
		this.show();
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
