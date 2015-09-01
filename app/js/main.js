import util from './utils'
import listContainer from './list-container';

var twrap = document.getElementById('twrap');
if(twrap){
	twrap.appendChild(listContainer.getContainer());
	listContainer.show();
}

export default {};
