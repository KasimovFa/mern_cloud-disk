import { createSlice, PayloadAction} from "@reduxjs/toolkit";

type TypeFileView = 'list' | 'plate';

interface AppState {
   isLoading: boolean,
   fileView: TypeFileView
}


const initialState: AppState = {
    isLoading: false,
    fileView: 'list'
}

export const AppSlice = createSlice({
    name:'loader',
    initialState,
    reducers: {
        showLoader(state) {
            state.isLoading = true
        },
        hideUpLoader(state) {
            state.isLoading = false
        },
        setFileView(state, action: PayloadAction<TypeFileView>){
            state.fileView = action.payload;
        }
    }
})

export const {showLoader, hideUpLoader, setFileView} = AppSlice.actions;
export default AppSlice.reducer