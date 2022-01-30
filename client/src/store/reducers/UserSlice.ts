import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";



interface UserState {
    isAuth: boolean,
    currentUsers: IUser | null
}

const initialState: UserState = {
    currentUsers: {} as IUser,
    isAuth: false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        userFetching(state, action: PayloadAction<IUser>) {
            state.currentUsers = action.payload;
            state.isAuth = true;
        },
        userLogout(state) {
            localStorage.removeItem('token')
            state.currentUsers = null;
            state.isAuth = false;
        }
    }
})

export const {userFetching, userLogout} = userSlice.actions;
export default userSlice.reducer