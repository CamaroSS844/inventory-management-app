import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";


/*
have two slices, this one for ui and another one for all records

the one for records will create an object like this 
{
  1234567890: {
    17June: {
      transactionType: 'sale',
      quantity: 10,
      valuePerunit: 2,
      amountReceived: 5
    }
    18June: {
      transactionType: 'Removed stock',

    }
    18: 'deleted evrything'
    24June: 'restocked everything'
    
  },
}



sales slice: {
  17june2022: {
    1234567890:{
      quantity: 20, 
      totalValue: 200,
    }
  },
}
removals slice: {
  17june2022: {
    id: 1234567890,
    quantity: 20, 
    totalValue: 200, 
    reason: "damaged"/ "expired" 
  },
}

transfer slice
add inventory slice
-
 */
/*
REPORTS
Summary for the last month
total stock in and total stock out.
>>>show a chart comparing all the sales for each of the items 
  in stock and how each individual sale compares to the other. 
  therby advise on which items should be prioritised upon restocking
>>>


Transactions
>>>a record of the last 10 to 20 transactions
Stock
>>>>display of the total stock out and in and total in hand.
>>>>display that on a pie chart if possible
sales---> adjust time as daily weekly monthly
added Stock or purchases -----> 
remove stock -----> include reason and date(spoilt and expired)
  and explanation
transferred stock ----> date and branch transferred to




stock added 
sales
stock removed
adjustable intervals, daily weekly, monthly
display monthly graphs or 

then by end of month should produce profit and loss account

*/



const initialState = {
    value: {}
    }


export const productsSlice = createSlice({
    name: 'inventoryList',
    initialState,
    reducers: {
        currentStock: (state = {}, action) => {
            temp = {...state.value, ...action.payload};
            state.value = temp;
        },
        remove: (state= {}, action) => {
          barcode = `${action.payload.barcode}`;
          quantity = action.payload.quantity;
          if (quantity == "all"){
            delete state.value[barcode];
          }else {
            decrement(state, barcode, action.payload);
          }
        },
        bulkRemove: (state={}, action) => {
          Object.values(action.payload).forEach(value => {
            decrement(state, value.barcodeNumber, value);
          })

        }
    }
})


export const { currentStock ,clearAll, remove, bulkRemove } = productsSlice.actions

export default productsSlice.reducer

function decrement(state, barcode, action){
  value = state.value[barcode].quantity - action.quantity;
  if (value > 0){
    state.value[barcode].quantity = value;
  }
}

const addToInventory = ( state, item) => {
    return {...state, ...item}
};
