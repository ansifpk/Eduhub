
import {createSlice} from '@reduxjs/toolkit'


interface currentUser{
   _id:string
   name:string,
   image:string,
   email:string,
   isBlock:boolean,
   isVerified:boolean,
   isAdmin:boolean,
   isInstructor:boolean
}

const initialState:currentUser = {
    _id:"",
    name: "",
    email: "",
    image: "",
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
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.image = action.payload.image;
            state.name = action.payload.name;
            state.isVerified = action.payload.isVerified;
            state.isBlock = action.payload.isBlock;
            state.isInstructor = action.payload.isInstructor;
        },
        setInstructor:(state,action)=>{
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.isVerified = action.payload.isVerified;
            state.isBlock = action.payload.isBlock;
            state.isInstructor = action.payload.isInstructor;
        },
        setAdmin:(state,action)=>{
            state._id = action.payload._id;
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
        profileUpdated:(state,action)=>{
          state.name = action.payload
        },
        changeEmail:(state,action)=>{
          state.email = action.payload.email
        },
        changeImage:(state,action)=>{
          state.image = action.payload.image
        },
        removeUser:(state)=>{
            console.log("removinf");
            
            state._id = "";
            state.email ="";
            state.name = "";
            state.image = "";
            state.isVerified = false;
            state.isBlock = false;
            state.isAdmin = false;
            state.isInstructor = false;
        },
    }
});

export const {setUser,setAdmin,blockUser,setInstructor,removeUser,profileUpdated,changeEmail} = authSLice.actions;
export default authSLice.reducer;


