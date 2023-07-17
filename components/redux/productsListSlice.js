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
      "1234": {barcodeNumber: "1234", 
          dateUI: "14th July 2023, 2:41:03 pm",
          dateCode: "2023-06-05T14:41:03", 
          minLevel: "5", 
          pricePerUnit: "1",
          productName: "music",
          quantity: "20"
        }, 
      "12345": {barcodeNumber: "12345",
        dateUI: "14th July 2023, 2:41:42 pm",
        dateCode: "2022-07-14T14:41:42",
        minLevel: "100", 
        pricePerUnit: "10", 
        productName: "soap", 
        quantity: "1000"
      }, 
      "123456": {barcodeNumber: "123456", 
        dateUI: "14th July 2023, 2:42:03 pm", 
        dateCode: "2023-03-14T14:42:03",
        minLevel: "20", 
        pricePerUnit: "50", 
        productName: "box", 
        quantity: "80"
      }, 
      "1234567": {barcodeNumber: "1234567", 
        dateUI: "14th July 2023, 2:42:15 pm", 
        dateCode: "2023-07-14T14:42:15",
        minLevel: "5", 
        pricePerUnit: "2", 
        productName: "table", 
        quantity: "4"
      }, 
      "1234567890": {barcodeNumber: "1234567890", 
        dateUI: "14th July 2023, 2:42:15 pm",
        dateCode: "2023-07-14T14:42:15",
        minLevel: "5", 
        pricePerUnit: "1", 
        productName: "books", 
        quantity: "20"}
      }
    }


export const productsSlice = createSlice({
    name: 'inventoryList',
    initialState,
    reducers: {
        getItem: (state = {}, action) => {
          value = checkState(state, action);
          if ( !value ) return value;
          return state.value[action.payload]
        }
        ,
        addNewProducts: (state = {}, action) => {
            state.value = addToInventory(state.value, action.payload);
            console.log(state.value)
          },
        remove: (state= {}, action) => {
          barcode = `${action.payload}`
          delete state.value[barcode]


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