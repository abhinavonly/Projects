import {ADD_FLASH_MESSAGE}  from '../constants/ActionTypes';
export function addFlashMessage(message){
	return {type:ADD_FLASH_MESSAGE,
	message}
}