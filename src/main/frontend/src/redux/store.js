import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import {userReducer} from './reducers/userReducer'
import { credentialReducer } from "./reducers/credentialReducer";
import {filesReducer} from './reducers/filesReducer'
const rootReducer=combineReducers({
    // reducers
    userReducer,
    credentialReducer,
    filesReducer
    

})
const store=createStore(rootReducer,{}, composeWithDevTools(applyMiddleware(thunk)));
export default store;