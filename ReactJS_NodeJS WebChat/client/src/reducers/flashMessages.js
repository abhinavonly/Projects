import {ADD_FLASH_MESSAGE} from '../constants/ActionTypes';
import {DEL_FLASH_MESSAGE} from '../constants/ActionTypes';
import shortid from 'shortid';

const initialState = {
  id:null,
  type:null,
  text:null,
  loggedIn: false,
  token:null
}
export default(state=initialState,action) =>{
	switch (action.type){
		case ADD_FLASH_MESSAGE:
			return Object.assign({}, state, {id: shortid.generate(),type:action.message.type,text:action.message.text,loggedIn:true,token:action.message.token});
		case DEL_FLASH_MESSAGE:
		    return Object.assign({}, state, {id: null,type:null,text:null,loggedIn:false,token:null});	
	}
	return state;
}
