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
		return `<img class="sp" src="${this.getUrl()}" />`;
	}

}

export default new Image();
