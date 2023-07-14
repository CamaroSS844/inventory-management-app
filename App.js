import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store';
import List from "./components/screens/List"
import Details from './components/screens/Details';
import LoginScreen from './components/screens/SignInScreen';
import AddNewProduct from './components/screens/newProduct';
import DashboardScreen from './components/screens/Dashboard';
import ProcessSale from './components/screens/checkOut';
import Receipt from './components/screens/Receipt';
import InventoryTable from './components/screens/viewInventory';
import RemoveProduct from './components/screens/removeStock';
import Reports from './components/screens/reports';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="my Todos" component={List} />
          <Stack.Screen name="sign in" component={LoginScreen} />
          <Stack.Screen name="my details" component={Details} />
          <Stack.Screen name="new Product" component={AddNewProduct} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="ProcessSale" component={ProcessSale} />
          <Stack.Screen name="Receipt" component={Receipt} />
          <Stack.Screen name="InventoryTable" component={InventoryTable} />
          <Stack.Screen name="remove product" component={RemoveProduct} />
          <Stack.Screen name="reports" component={Reports} />
        </Stack.Navigator>
      </Provider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

