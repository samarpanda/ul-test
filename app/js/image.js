class Image{
	constructor(){
		this.url = '';
	}

	getUrl(){
		return this.url;
	}
	setUrl(url){
		this.url = url;
	}
	getThumbnailImg(){
		return `<img class="img-thu" src="${this.getUrl()}" />`;
	}
	getLargeImg(){
		return `<img class="img-lrg" src="${this.getUrl()}" />`;
	}

}

export default new Image();
