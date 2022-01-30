import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFileUpload } from "../../models/IFile";


interface UploadState {
    files: IFileUpload[],
    isVisable: boolean
}

const initialState: UploadState = {
    files: [],
    isVisable: false
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        showLoader(state) {
            state.isVisable = true
        },
        hideUpLoader(state) {
            state.isVisable = false
        },
        addUpLoadFile(state, action: PayloadAction<IFileUpload>) {
            state.files.push(action.payload)
        },
        deleteUpLoadFile(state, action: PayloadAction<String>) {
            state.files = state.files.filter(f => f.id !== action.payload);
        },
        changeUpLoadFile(state, action: PayloadAction<IFileUpload>) {
            console.log(action.payload.progress)
            state.files = state.files.map(f => 
                f.id === action.payload.id ? {...f, progress: action.payload.progress} : {...f})
        }
    }
})

export const {showLoader, hideUpLoader, deleteUpLoadFile, addUpLoadFile, changeUpLoadFile} = uploadSlice.actions;

export default uploadSlice.reducer;