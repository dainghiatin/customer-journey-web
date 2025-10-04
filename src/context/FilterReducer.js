import { LOGIN, LOGOUT,  CHANGE_USER_COUNTRY } from './action/filterAction';

const initialState = {
  nation: localStorage.getItem("nation")|| "",
  category: localStorage.getItem("category")|| "",
  condition: localStorage.getItem("condition")|| "",
  subcategory: localStorage.getItem("subcategory")|| "",
  district: localStorage.getItem("district")|| "",
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_COUNTRY:
      return {
        ...state,
        nation: action.payload
      };
    default:
      return state; 
  }
}

export default filterReducer;
