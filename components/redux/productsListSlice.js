import { createSlice } from "@reduxjs/toolkit";



// "78909": {
//   barcodeNumber: "123456",
//   productName: "books",
//   quantity: "100",
//   minLevel: "20",
//   pricePerUnit: "5"
// }



const initialState = {
    value: {
      "1234567890": {
        barcodeNumber: "1234567890",
        productName: "books",
        quantity: "20",
        minLevel: "5",
        pricePerUnit: "1"
      },
    }
}

export const productsSlice = createSlice({
    name: 'inventoryList',
    initialState,
    reducers: {
        getItem: (state = {}, action) => {
          console.log(state);
          value = checkState(state, action);
          if ( !value ) return value;
          return state.value[action.payload]
        }
        ,
        addNewProducts: (state = {}, action) => {
            state.value = addToInventory(state.value, action.payload);
          },
        remove: (state= {}, action) => {
          barcode = action.payload
          delete state.value.barcode;
        },
        clearAll: (state) => {
          state.value = {}
        }
    }
})

export const { addNewProducts ,clearAll, getItem, remove } = productsSlice.actions

export default productsSlice.reducer


const addToInventory = ( state, item) => {
    return {...state, ...item}
  };

  const Sort = (list) => {
    for (let i = 0; i < list.length - 1; i++) {
      if (parseInt(list[i + 1].key) < parseInt(list[i].key)) {
        let temporalList = list[i];
        list[i] = list[i + 1];
        list[i + 1] = temporalList;
        Sort(list);
      }
    }
    return list;
  };