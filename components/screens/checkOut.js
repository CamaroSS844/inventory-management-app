import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable} from "react-native";
import React, { useState } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import WavyHeader from "./wavyHeader";
import { ScrollView } from "react-native";
import { FloatingAction } from "react-native-floating-action";

const done = <Feather name="check-circle" size={30} color="#fff" />
const backIcon = <FontAwesome name="chevron-left" size={25} color="#fff"/>
const sale = 'sale'
const overallWidth = Dimensions.get('window').width;

function IdGen(transact){
  //generate ids for sales purchases and other transactions.
  //will be worked on accordingly
  //first 2 letters for company name id, next letter transact type then transact number
  switch(transact){
    case sale:
      return 'COS001';
    default:
      return null
  }
}

const actions = [
  {
    text: "done",
    icon: done,
    name: "complete transaction",
    position: 2
  }
];

function RenderItem({obj, navigation, Cart}){
  console.log("enter render item");
  return (
    <Pressable onPress = {() => 
    navigation.push('checkOutItemScreen', {barcode: `${obj.barcode}`, productName: obj.productName, price: obj.price, cart: Cart})
    }
    style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingLeft: 0, borderBottomWidth: 1, borderBottomColor: 'grey'}}>
      <Text >{obj.product_name}</Text>
      <Text style={{ marginLeft: 20}}>{obj.quantity}</Text>
      <Text style={{ marginLeft: 20}}>{obj.price}</Text>
    </Pressable>
  )
}

function CustomHeader(){

  return (
    <View style={styles.customHeader}>
        <Pressable style={{padding: 20}}>
          {backIcon}
        </Pressable>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '900', padding: 20}}>Checkout</Text>
    </View>
  )
}


//inventory app
export default function Checkout(props){
    const [salesPerson, setSalesPerson] = useState(() =>  "");
    const [customerName, setCustomerName] = useState(() => "");
    const shoppingCart = props.route.params.cart;
    const keyArray = Object.keys(shoppingCart);
    console.log(props.route.params.cart);

    
        return (
          <View style={styles.Container}>
          <WavyHeader customStyles={styles.svgCurve}/>
          <CustomHeader />
          <ScrollView>
                
                <View style={styles.main}>
                  <Text style={{fontSize: 25,fontFamily: 'serif', paddingLeft: 10}}>Cart</Text>
                      <TouchableOpacity style={styles.button}  onPress={() => props.navigation.replace('checkOutItemScreen', {barcode: "", productName: "", price: "", cart: shoppingCart})}>
                          <Text style={styles.item}>+ Add Item</Text>
                      </TouchableOpacity>
                      
                      {
                      keyArray.length > 0? 
                        <View>
                          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{fontWeight: "bold"}}>Name</Text>
                            <Text style={{fontWeight: "bold"}}>Quantity</Text>
                            <Text style={{fontWeight: "bold"}}>Price</Text>
                          </View>
                            {keyArray.map((item) => {
                              return (
                                <RenderItem key={keyArray.indexOf(item)} obj={shoppingCart[item]} navigation={props.navigation} Cart={shoppingCart}/>
                              )
                            })}
                        </View>
                        : 
                        <View style={{width: "100%",display: 'flex'}}>
                          <Text style={{fontSize: 24, color: "grey",fontStyle: "italic"}}>No items added</Text>
                        </View>
                      }
                    </View>

                <View style={styles.main}>
                  <Text style={{fontSize: 25,fontFamily: 'serif', paddingLeft: 10}}>Details</Text>
                        
                       <TextInput
                          style={styles.input}
                          placeholder="Customer Name"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={customerName}
                          keyboardType={"visible-password"}
                          onChangeText={(customer) => setCustomerName(customer)}
                        />
                        
                        <TextInput
                          style={styles.input}
                          placeholder="Sales Person"
                          placeholderTextColor="grey"
                          editable={true}
                          value={salesPerson}
                          onChangeText={(name) => {
                            setSalesPerson(name);
                            //autofill(name);
                          }}
                        />
                        
                        <TextInput
                          style={styles.input}
                          placeholder={``}
                          placeholderTextColor={"#000"}
                          editable={false}
                          value={`Sales order ${IdGen(sale)}`}
                        />
                        <TextInput
                          style={styles.input}
                          placeholderTextColor={"black"}
                          editable={false}
                          value={'12 Jan 2024'}
                          keyboardType={"numeric"}
                          onChangeText={() => ''}
                        />
                    </View>
                </ScrollView>
                {
                      keyArray.length > 0?
                      <FloatingAction
                      actions={actions}
                      floatingIcon={done}
                      color="purple"
                      onPressItem={name => {
                        console.log(`selected button: ${name}`);
                      }}
                    />
                      :
                      <FloatingAction
                        actions={actions}
                        floatingIcon={done}
                        color="grey"
                        onPressItem={name => {
                          console.log(`selected button: ${name}`);
                        }}
                      />
                    }
            </View>
        )
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    display: 'flex',
    alignItems: 'center'
  },
  customHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100, 
    width: "100%",
    // padding: 30,
    paddingTop: 30,
    backgroundColor: '#520bb0'
  },
  main: {
    marginTop: 30,
    backgroundColor: '#fff',
    color: '#000',
    width: overallWidth * 0.95,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 15,
    shadowColor: "#000",
    elevation: 6,
    borderRadius: 5
  },
  input : {
      marginBottom: 30,
      width: "95%",
      padding: 10,
      borderRadius: 20,
      borderBottomColor: 'purple',
      borderBottomWidth: 1,
      color: '#000'
  },
  button: {
    backgroundColor: "purple",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: overallWidth * 0.8,
    height: 45,
    borderRadius: 30,
    marginBottom: 40,
    marginTop: 20
},
item: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold'
},
  para: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  }
})


