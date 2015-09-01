import Thumbnail from '../../app/js/thumbnail.js';

describe('thumbnail.js test', function(){
	let th;
	beforeEach(()=>{
		console.log("Before");
		this.th = null;
	});

	afterEach(()=>{
		console.log("After");
	});
	it('Create Object of thumbnail', () => {
		this.th = new Thumbnail(1);
		expect(this.th.getId()).toEqual(1);
	});
});
