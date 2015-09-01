import Thumbnail from '../../app/js/thumbnail.js';

describe('thumbnail.js test', function(){
	let th;
	beforeEach(()=>{
		this.th = null;
	});

	afterEach(()=>{});

	it('Create Object of thumbnail', () => {
		this.th = new Thumbnail(1);
		expect(this.th.getId()).toEqual(1);
	});
});
