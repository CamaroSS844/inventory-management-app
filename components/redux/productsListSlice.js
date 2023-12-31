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
    value: {
      "1234": {
          barcodeNumber: "1234", 
          dateUI: "14th July 2023, 2:41:03 pm",
          dateCode: "2023-06-05T14:41:03", 
          minLevel: "5", 
          pricePerUnit: "1",
          productName: "music",
          quantity: "20"
      }, 
      "12345": {
        barcodeNumber: "12345",
        dateUI: "14th July 2023, 2:41:42 pm",
        dateCode: "2022-07-14T14:41:42",
        minLevel: "100", 
        pricePerUnit: "10", 
        productName: "soap", 
        quantity: "800"
      }, 
      "123456": {
        barcodeNumber: "123456", 
        dateUI: "14th July 2023, 2:42:03 pm", 
        dateCode: "2023-03-14T14:42:03",
        minLevel: "20", 
        pricePerUnit: "50", 
        productName: "box", 
        quantity: "80"
      }, 
      "1234567": {
        barcodeNumber: "1234567", 
        dateUI: "14th July 2023, 2:42:15 pm", 
        dateCode: "2023-07-14T14:42:15",
        minLevel: "5", 
        pricePerUnit: "2", 
        productName: "table", 
        quantity: "4"
      }, 
      "1234567890": {
        barcodeNumber: "1234567890", 
        dateUI: "14th July 2023, 2:42:15 pm",
        dateCode: "2023-07-14T14:42:15",
        minLevel: "5", 
        pricePerUnit: "1", 
        productName: "books", 
        quantity: "20"
      }
      }
    }


export const productsSlice = createSlice({
    name: 'inventoryList',
    initialState,
    reducers: {
        addNewProducts: (state = {}, action) => {
            state.value = addToInventory(state.value, action.payload);
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


export const { addNewProducts ,clearAll, remove, bulkRemove } = productsSlice.actions

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
