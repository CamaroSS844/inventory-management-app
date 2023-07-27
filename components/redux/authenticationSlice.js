import { createSlice } from "@reduxjs/toolkit";

/*
second account
Fernandez Torres:{
       password: "executive1",
       branch: "SouthWold"
}
*/



const initialState = {
    value: {
        "Fernandez Torres": {
          password: "executive1",
          branch: "SouthWold"
        },
        "Morgan": {
          password: "executive2",
          branch: "BradField"
        },
        ActiveAccount: 'none',//by default no account is active
        Branches: ["SouthWold", "BradField"]
    }
  }


export const accountsSlice= createSlice({
    name: 'accountsS',
    initialState,
    reducers: {
        newAccount: (state = {}, action) => {
            /*
            action.payload format
            Fernandez Torres:{
              password: "executive1",
              branch: "SouthWold"
            } 
            */
            state.value = addNew(state.value, action.payload);
            state.value.Branches = [...state.value.Branches, action.payload[Object.keys(action.payload)[0]].branch]
            console.log(state.value.Branches)
        },
        updateActiveAccount: (state = {}, action) => {
            /**
             * action.payload format
             * "Fernandez Torres"
             */
            state.value.ActiveAccount = action.payload
        }
    }
})


export const { updateActiveAccount, newAccount } = accountsSlice.actions
export default accountsSlice.reducer

 const addNew = ( state, item) => {
    accountId  = Object.keys(item)[0]
    if(accountId in state){
        state[accountId] = {...state[accountId], ...item[accountId]}
        return state
    }
    return {...state, ...item}
};
