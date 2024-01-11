import { View, Text, Pressable, StyleSheet, Alert, Dimensions } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";


const menu = <Ionicons name="menu" size={30} color='#fff'/>
// const viewInventory = <MaterialCommunityIcons name="archive-search-outline" size={60} />
const notif = <FontAwesome name="bell" size={25} color='#fff'/>
const notifBlocked = <FontAwesome name="bell-slash" size={60} />
// const transferStock = <MaterialCommunityIcons name="archive-arrow-up-outline" size={63} />
// const removeStock = <FontAwesome name="trash-o" size={60} />
// const reports = <Ionicons name="document-text-outline" size={60} />

function CustomHeader(){
  return (
    <View style={styles.customHeader}>
        <Pressable>
          {menu}
        </Pressable>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '900'}}>Company Name</Text>
        <Pressable>
          {notif}
        </Pressable>
    </View>
  )
}

//inventory app
export default function DashboardScreen(props){
   
        return (
            <View style={styles.container}>
              <CustomHeader />
                <View style={styles.headerContainer}>
                  <Text style={{fontSize: 20, padding: 10}}>Transactions Today</Text>
                  <View style={{display: 'flex', flexDirection:'row', width: '100%', justifyContent: 'space-evenly'}}>
                    <Pressable style={{...styles.headerTiles, borderRightWidth: 1, borderColor: 'lightgrey'}}>
                      <Text style={{fontSize: 25}}>25</Text>
                      <Text style={{fontSize: 15}}>low stock</Text>
                    </Pressable>
                    <Pressable style={{...styles.headerTiles, borderRightWidth: 1, borderColor: 'lightgrey'}}>
                      <Text style={{fontSize: 25}}>4</Text>
                      <Text style={{fontSize: 15}}>sales today</Text>
                    </Pressable>
                    <Pressable style={styles.headerTiles}>
                      <Text style={{fontSize: 25}}>6</Text>
                      <Text style={{fontSize: 15}}>purchases</Text>
                    </Pressable>
                  </View>
                </View>
                <View>{/*this is the item containing all the dashboard tiles*/}
                  <View>
                    <Text>this tile will show amount of items in stock</Text>
                  </View>
                </View>
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        display: 'flex',
        alignItems: 'center'
      },
      headerContainer: {
        marginTop: 50,
        backgroundColor: '#fff',
        color: '#000',
        width: '95%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
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
        width: `30%`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }
})

