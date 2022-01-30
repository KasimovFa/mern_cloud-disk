import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../models/IFile";


interface FileState {
   files: IFile[],
   currentDir: string | undefined
   popupDisplay: string,
   dirStack: any[],

}

const initialState: FileState = {
    files:[],
    currentDir: undefined,
    popupDisplay: 'none',
    dirStack: []
}

export const FileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles(state, action: PayloadAction<IFile[]>) {
            state.files = action.payload;
        },
        setCurrentDir(state, action: PayloadAction<string>){
            state.currentDir = action.payload;
        },
       setPopupDisplay(state, action: PayloadAction<string>) {
            state.popupDisplay = action.payload
        },
        addFile(state, action: PayloadAction<IFile>) {
             state.files.push(action.payload)
        },
        setStackDir(state, action: PayloadAction<string | any[]>) {
            if (Array.isArray(action.payload)) {
                const arr = [...action.payload]
                state.dirStack = [...arr]
            } else {
                state.dirStack.push(action.payload)
            }
        },
        deleteFileAction(state, action: PayloadAction<string>) {
            const newArray = state.files.filter(f => f._id !== action.payload);
            state.files = [...newArray];
        }
    }
})


export const {setFiles, setCurrentDir, setPopupDisplay, addFile, setStackDir, deleteFileAction} = FileSlice.actions;
export default FileSlice.reducer