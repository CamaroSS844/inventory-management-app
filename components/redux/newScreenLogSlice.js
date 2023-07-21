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
      "2023-06-05": {
        "1234":{ 
          dateUI: "14th June 2023, 2:41:03 pm",//date to display on ui
          quantity: "5",
          category: "New Stock",
        }
      }, 
      "2022-07-14": {
        "1234":{
          dateUI: "14th July 2022, 2:41:42 pm",
          quantity: "10",
          category: "Restock",
        },
        "1234567":{ 
          dateUI: "14th July 2022, 2:41:42 pm",
          quantity: "2",
          category: "Restock",
        },
        "1234567890": { 
          dateUI: "14th July 2022, 2:41:42 pm",
          quantity: "10",
          category: "New Stock"
        }
      }, 
      "2023-03-14": {
        "123456":{
          dateUI: "14th March 2023, 2:42:03 pm",
          quantity: "10",
          category: "New Stock"
        }
      }
    }
  }


export const stockingLogSlice = createSlice({
    name: 'stockingLog',
    initialState,
    reducers: {
        logStocking: (state = {}, action) => {
            /*
            action.payload format
            "2023-07-14": {
              "12345":{
                dateUI: "14th July 2023, 2:41:42 pm",
                quantity: "10",
                category: "restock"
              },
              "1234567":{ 
                dateUI: "14th July 2023, 2:41:42 pm",
                quantity: "2",
                category: "New Stock"
              },
            }
            */
           console.log(action.payload);
            state.value = addToInventory(state.value, action.payload);
        },
    }
})


export const { logStocking } = stockingLogSlice.actions

export default stockingLogSlice.reducer

const addToInventory = ( state, item) => {
    dateId  = Object.keys(item)[0]
    if(dateId in state){
        state[dateId] = {...state[dateId], ...item[dateId]}
        return state
    }
    return {...state, ...item}
};
