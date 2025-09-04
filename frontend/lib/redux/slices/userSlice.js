import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: null,
    status: 'idle'
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state, action)=>{
            state.isLoggedIn = true;
            state.userData = action.payload;
            state.status = 'succeeded';
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.userData = null;
            state.status = 'idle';
        },
        setStaus:(state, action)=>{
            state.status = action.payload;
        } 
    }
})

export const {login, logout, setStaus} = userSlice.actions;

export default userSlice.reducer;