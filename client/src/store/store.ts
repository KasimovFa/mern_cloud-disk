import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/reducers/UserSlice';
import fileReducer from '../store/reducers/FilesSlice';
import uploadreducer from "./reducers/UploaderSlice";
import appreducer from './reducers/AppSlice';


const rootReducer = combineReducers({
     userReducer,
     fileReducer,
     uploadreducer,
     appreducer
})

export const setupReducer = () => {
    return configureStore({
            reducer:rootReducer
})           
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupReducer>
export type AppDispatch  = AppStore['dispatch']