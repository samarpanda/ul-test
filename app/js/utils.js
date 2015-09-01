function Utils(){}
Utils.prototype.validThumbnail = function(node){
	var bool = false;
	if(node && node.className === 'itm-thu'){
		bool = true;
	}
	return bool;
};
Utils.prototype.insertAfter = function(newEl, tarEl){
	tarEl.parentNode.insertBefore(newEl, tarEl.nextSibling);
}

export default Utils.prototype;
