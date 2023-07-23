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
      "2023-06-05T14:41:03": {
        "1234":{ 
          dateUI: "14th June 2023, 2:41:03 pm",//date to display on ui
          quantity: "5",
          totalValue: "200"
        }
      }, 
      "2022-07-14T14:41:42": {
        "12345":{
          dateUI: "14th July 2022, 2:41:42 pm",
          quantity: "10",
          totalValue: "20"
        },
        "1234567":{ 
          dateUI: "14th July 2022, 2:41:42 pm",
          quantity: "2",
          totalValue: "2"
        },
        "1234567890": { 
          dateUI: "14th July 2022, 2:41:42 pm",
          quantity: "10",
          totalValue: "50"
        }
      }, 
      "2023-03-14T14:42:03": {
        "123456":{
          dateUI: "14th March 2023, 2:42:03 pm",
          quantity: "10",
          totalValue: "20"
        }
      }
    }
  }


export const salesLogSlice = createSlice({
    name: 'salesLog',
    initialState,
    reducers: {
        logNewSale: (state = {}, action) => {
            /*
            action.payload format
            "2023-07-14T14:41:42": {
              "12345":{
                dateUI: "14th July 2023, 2:41:42 pm",
                quantity: "10",
                totalValue: "20"
              },
              "1234567":{ 
                dateUI: "14th July 2023, 2:41:42 pm",
                quantity: "2",12
                totalValue: "2"
              },
            }
            */
            state.value = addToInventory(state.value, action.payload);
        },
    }
})


export const { logNewSale } = salesLogSlice.actions

export default salesLogSlice.reducer

const addToInventory = ( state, item) => {
    return {...state, ...item}
};
