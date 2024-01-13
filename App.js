import React, {createContext, useContext, useEffect, useState} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';


//Screens
import signup from "./components/screens/signup"
import Details from './components/screens/Details';
import SignInScreen from './components/screens/SignInScreen';
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

function DefaultAppNav(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
      <Stack.Screen name="my details" component={Details} />
      <Stack.Screen name="new Product" component={AddNewProduct} />
      <Stack.Screen name="ProcessSale" component={ProcessSale} />
      <Stack.Screen name="Receipt" component={Receipt} />
      <Stack.Screen name="InventoryTable" component={InventoryTable} />
      <Stack.Screen name="remove product" component={RemoveProduct} />
      <Stack.Screen name="reports" component={Reports} />
      <Stack.Screen name="prod info" component={InfoScreen} />
      <Stack.Screen name="BarcodeScreen" component={BarcodeScreen} />
      <Stack.Screen name="Transfer" component={transferStock} />
    </Stack.Navigator>
  )
}

function AuthStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="signUp" component={signup} options={{headerShown: false}}/>
      <Stack.Screen name="signIn" component={SignInScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function RootNavigator(){
  const user = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      async authenticateduser => {
        authenticateduser? user.setAuthUser(authenticateduser) : user.setAuthUser(null);
        setLoading(false);
      });
      return () => unsubscribe();
  }, [user.authUser])

  if(loading) {
    return (
      <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      {user.authUser? <DefaultAppNav />: <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthUserProvider >
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  </AuthUserProvider>
  );
}

