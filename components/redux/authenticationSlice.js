import { createSlice } from "@reduxjs/toolkit";

/*

sales slice: {
  17june2022: {
    1234567890:{
      quantity: 20, 
      totalValue: 200,
    }
  },
}

stock added 
sales
stock removed
adjustable intervals, daily weekly, monthly
display monthly graphs or 
*/



const initialState = {
    value: {
        "Trinity Cacciola": {
            password: "Maboy",
        }
    }
  }


export const removalsLogSlice = createSlice({
    name: 'removalsLog',
    initialState,
    reducers: {
        logNewRemoval: (state = {}, action) => {
            /*
            action.payload format
            "2023-07-14": {
              "12345":{
                dateUI: "14th July 2023, 2:41:42 pm",
                quantity: "10",
                category: "damaged",
                reason: "fell off the shelf"
              },
              "1234567":{ 
                dateUI: "14th July 2023, 2:41:42 pm",
                quantity: "2",
                category: "expired",
                reason: "spent too long in the freezer"
              },
            }
            */
            state.value = addToInventory(state.value, action.payload);
        },
    }
})


export const { logNewRemoval } = removalsLogSlice.actions

export default removalsLogSlice.reducer

const addToInventory = ( state, item) => {
    dateId  = Object.keys(item)[0]
    if(dateId in state){
        state[dateId] = {...state[dateId], ...item[dateId]}
        return state
    }
    return {...state, ...item}
};
