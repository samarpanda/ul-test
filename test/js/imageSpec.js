import image from '../../app/js/image.js';

describe('image.js test', function(){
	let url = "sp.jpg";
	let blankThumbnailImg = '<img class="img-thu" src="" />';
	let thumbnailImg = `<img class="img-thu" src="${url}" />`;

	beforeEach(() => {
		image.setUrl('');
	});

	it('Initially url should be blank', () => {
		expect(image.getUrl()).toEqual('');
	});

	it('Initially thumbnail template', () => {
		expect(image.getThumbnailImg()).toEqual(blankThumbnailImg);
	});

	it('Test setter and getter url', () => {
		image.setUrl(url);
		expect(image.getUrl()).toEqual(url);
	});

	it('Template has the expected image url', () => {
		image.setUrl(url);
		expect(image.getThumbnailImg()).toEqual(thumbnailImg);
	});

	afterEach(() => {});
});
