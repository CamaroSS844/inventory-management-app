import React, {createContext, useContext, useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase';


//Screens
import signup from "./components/screens/signup"
import Details from './components/screens/Details';
import LoginScreen from './components/screens/SignInScreen';
import AddNewProduct from './components/screens/newProduct';
import DashboardScreen from './components/screens/Dashboard';
import ProcessSale from './components/screens/checkOut';
import Receipt from './components/screens/Receipt';
import InventoryTable from './components/screens/viewInventory';
import RemoveProduct from './components/screens/removeStock';
import InfoScreen from './components/screens/productInfoScreen';
import Reports from './components/screens/reportLand';
import BarcodeScreen from './components/screens/barcodeScanning';
import transferStock from './components/screens/transferStock';

const Stack = createNativeStackNavigator();
const AuthUserContext = createContext({});

const AuthUserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="sign up" component={signup} />
          <Stack.Screen name="sign in" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="my details" component={Details} />
          <Stack.Screen name="new Product" component={AddNewProduct} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
          <Stack.Screen name="ProcessSale" component={ProcessSale} />
          <Stack.Screen name="Receipt" component={Receipt} />
          <Stack.Screen name="InventoryTable" component={InventoryTable} />
          <Stack.Screen name="remove product" component={RemoveProduct} />
          <Stack.Screen name="reports" component={Reports} />
          <Stack.Screen name="prod info" component={InfoScreen} />
          <Stack.Screen name="BarcodeScreen" component={BarcodeScreen} />
          <Stack.Screen name="Transfer" component={transferStock} />
        </Stack.Navigator>
      </Provider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

