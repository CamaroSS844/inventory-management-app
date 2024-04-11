import { View, Text, Pressable, StyleSheet, Alert,ScrollView , Dimensions, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import WavyHeader from "./wavyHeader";
import { toggleBSState } from "../redux/toggleBSSlice";
import { useDispatch, useSelector } from "react-redux";
import FontScreen from "./screenComponents/Font/Font";
import CompanyReg from "./screenComponents/compRegistration";
import { database } from "../../config/firebase";
import { FieldValue, addDoc, collection, collectionGroup, doc, setDoc, updateDoc, writeBatch, getDoc } from "firebase/firestore";
import { currentStock } from "../redux/productsListSlice";


const menu = <Ionicons name="menu" size={30} color='#fff'/>
const checkout = <MaterialIcons name="shopping-cart-checkout" size={30} />
const no_notif = <FontAwesome name="bell-o" size={23} color='#fff'/>
const notif = <FontAwesome name="bell-" size={25} color='#fff'/>
const viewInventory = <MaterialCommunityIcons name="archive-search-outline" size={30} />
const newStock = <MaterialCommunityIcons name="archive-plus-outline" size={30} />
const barcode = <MaterialCommunityIcons name="barcode-scan" size={30} />
const transfer = <MaterialCommunityIcons name="truck-delivery-outline" size={33} />

function CustomHeader({dispatch}){

  function handlePresentModal() {
    setTimeout(() => {
        dispatch(toggleBSState());
    }, 100);
  }

  return (
    <View style={styles.customHeader}>
        <Pressable onPress={() => handlePresentModal()}>
          {menu}
        </Pressable>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '900'}}>Company Name</Text>
        <Pressable>
          {no_notif}
        </Pressable>
    </View>
  )
}



//inventory app
export default function DashboardScreen(props){
  const dispatch = useDispatch();
  let bottomShelfState = useSelector( state =>  state.toggleBS.value);
  let registerState = useSelector( state =>  state.toggleReg.value);
  const [loading, setLoading] = useState(false);


  const getStock = async (destination) => {
    setLoading(true);
    const stockRef = doc(database, "CompaniesList/list/Brainbox/Stock")
    const stockSnapshot = await getDoc(stockRef).then((doc) => {
      if (doc.exists()) {
        setLoading(false);
        dispatch(currentStock(doc.data()));
        if (Object.keys(doc.data()).length == 0 && destination != "new Product") {
          Alert.alert("No stock available");
          return;
        } else if(destination == "Checkout"){
          props.navigation.push(destination, {cart: {}});
        }
        else {
          props.navigation.push(destination, {barcode: "", productName: "", price: "", activate: false});
        }
      } else {
        // doc.data() will be undefined in this case
        setLoading(false);
        Alert.alert("No such document in the database");
      }
    }).catch((error) => {
      setLoading(false);
      Alert.alert("Error getting document: check console");
      console.log("Error getting document:", error);
    });
  }
   
        return (
            <View style={styles.container}>
              <WavyHeader customStyles={styles.svgCurve} />
              <CustomHeader dispatch={dispatch}/>
                <View style={styles.headerContainer}>
                  <Text style={{fontSize: 20, padding: 10}}>Transactions Today</Text>
                  <View style={{display: 'flex', flexDirection:'row', width: '100%', justifyContent: 'space-evenly'}}>
                    <Pressable style={{...styles.headerTiles, borderRightWidth: 1, borderColor: 'lightgrey'}}>
                      <Text style={{fontSize: 25}}>0</Text>
                      <Text style={{fontSize: 15}}>low stock</Text>
                    </Pressable>
                    <Pressable style={{...styles.headerTiles, borderRightWidth: 1, borderColor: 'lightgrey'}}>
                      <Text style={{fontSize: 25}}>0</Text>
                      <Text style={{fontSize: 15}}>sales today</Text>
                    </Pressable>
                    <Pressable style={styles.headerTiles}>
                      <Text style={{fontSize: 25}}>0</Text>
                      <Text style={{fontSize: 15}}>purchases</Text>
                    </Pressable>
                  </View>
                </View>
                <ScrollView>{/*this is the item containing all the dashboard tiles*/}
                  <View style={{...styles.mainTiles, marginTop: 50}}>

                    <Pressable style={styles.mainTileIcon} onPress={() => getStock("Checkout")}>
                      <View style={{marginRight: 20, backgroundColor: '#ffbb00c2', padding: 15, borderRadius: 50}}>
                        {checkout}
                      </View>
                      <Text>Checkout</Text>
                    </Pressable>
                    <Pressable style={styles.mainTilebarcode} onPress={() => props.navigation.push('BarcodeScreen', {screenName: "Checkout" } )}>
                      {barcode}
                    </Pressable>
                  </View>

                  <View style={styles.mainTiles}>
                    <Pressable style={styles.mainTileIcon} onPress={() => getStock('new Product')}>
                      <View style={{marginRight: 20, backgroundColor: '#098d7ed1', padding: 15, borderRadius: 50}}>
                        {newStock}
                      </View>
                      <Text>New Stock</Text>
                    </Pressable>
                    <Pressable style={styles.mainTilebarcode} onPress={() => props.navigation.push('BarcodeScreen', {screenName: "new Product" } )}>
                      {barcode}
                    </Pressable>
                  </View>

                  <View style={styles.mainTiles}>
                    <Pressable style={styles.mainTileIcon} onPress={() => getStock('Transfer')}>
                    <View style={{marginRight: 20, backgroundColor: '#ff005dca', padding: 15, borderRadius: 100}}>
                        {transfer}
                    </View>
                      <Text>transfer Stock</Text>
                    </Pressable>
                    <Pressable style={styles.mainTilebarcode} onPress={() => props.navigation.push('BarcodeScreen', {screenName: "Transfer" } )}>
                      {barcode}
                    </Pressable>
                  </View>
                  
                  <View style={styles.mainTiles}>
                    <Pressable style={styles.mainTileIcon} onPress = {() => getStock("Transfer")}>
                    <View style={{marginRight: 20, backgroundColor: '#9696cd', padding: 15, borderRadius: 50}}>
                        {viewInventory}
                    </View>
                      <Text>View Inventory</Text>
                    </Pressable>
                    <Pressable style={styles.mainTilebarcode} onPress={() => props.navigation.push('BarcodeScreen')}>
                      {barcode}
                    </Pressable>
                  </View>

                </ScrollView>
                {
                  bottomShelfState?
                  <FontScreen />: null
                }
                {
                  registerState?
                  <CompanyReg />: null
                }
                {
                loading?
                  <View style={styles.loader}>
                    <ActivityIndicator animating={loading} size="large" color="purple"/>
                  </View>
                : null
                }
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        display: 'flex',
        alignItems: 'center'
      },
      headerContainer: {
        marginTop: 30,
        backgroundColor: '#fff',
        color: '#000',
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        shadowColor: "#000",
        elevation: 6,
        borderRadius: 5
      },
      customHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100, 
        width: "100%",
        // padding: 30,
        paddingTop: 30,
        backgroundColor: '#520bb0'
      },
      headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 35,
      },
      svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
      },
      headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        // change the color property for better output
        color: '#fff',
        textAlign: 'center',
        marginTop: 35
      },
      headerTiles: {
        display: 'flex', 
        flexDirection: 'column', 
        width: `35%`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      mainTiles: {
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        width: Dimensions.get('window').width * 0.9,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        elevation: 10,
        borderRadius: 5
      },
      mainTileIcon: {
        width: '40%', 
        padding: 10, 
        paddingLeft: 20,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      mainTilebarcode: {
        padding: 15, 
        paddingLeft: 30,
        paddingRight: 30, 
        borderLeftWidth: 1, 
        borderColor: 'lightgrey'
      },
      loader: {
        position: "absolute", 
        height: "100%", 
        width: "100%", 
        backgroundColor: "#00000047", 
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }
})

