import { createSlice } from "@reduxjs/toolkit";

/*
second account
Fernandez Torres:{
       password: "executive1",
       branch: "SouthWold"
*/



const initialState = {
    value: {
        Fernandez Torres: {
            password: "Maboy",
            branch: "Phelandaba"
        }
    }
  }


export const accountsSlice= createSlice({
    name: 'accountsS',
    initialState,
    reducers: {
        newAccount: (state = {}, action) => {
            /*
            action.payload format
            
            */
            state.value = addToInventory(state.value, action.payload);
        },
    }
})


export const { logNewRemoval } = accountsSlice.actions

 const addNew = ( state, item) => {
    dateId  = Object.keys(item)[0]
    if(dateId in state){
        state[dateId] = {...state[dateId], ...item[dateId]}
        return state
    }
    return {...state, ...item}
};
