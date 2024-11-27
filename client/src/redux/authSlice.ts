
import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';


interface currentUser{
   id:string
   name:string,
   email:string,
   isBlock:boolean,
   isVerified:boolean,
   isAdmin:boolean,
   isInstructor:boolean
}

const initialState:currentUser = {
    id:"",
    name: "",
    email: "",
    isBlock: true,
    isVerified:false,
    isAdmin:false,
    isInstructor:false,
}

const authSLice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.isVerified = action.payload.isVerified;
            state.isBlock = action.payload.isBlock;
            state.isInstructor = action.payload.isInstructor;
        },
        setInstructor:(state,action)=>{
            // console.log(action.payload,"ji");
            
            state.id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.isVerified = action.payload.isVerified;
            state.isBlock = action.payload.isBlock;
            state.isInstructor = action.payload.isInstructor;
            console.log(state.isInstructor,"ji");
        },
        setAdmin:(state,action)=>{
            state.id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.isVerified = action.payload.isVerified;
            state.isAdmin = action.payload.isAdmin;
            state.isBlock = action.payload.isBlock;
            state.isInstructor = action.payload.isInstructor;
        },
        blockUser:(state)=>{
            state.isBlock = true
        },
        removeUser:(state)=>{
            state.id = "";
            state.email ="";
            state.name = "";
            state.isVerified = false;
            state.isBlock = false;
            state.isAdmin = false;
            state.isInstructor = false;
        },
    }
});

export const {setUser,setAdmin,blockUser,setInstructor,removeUser} = authSLice.actions;
export default authSLice.reducer;


