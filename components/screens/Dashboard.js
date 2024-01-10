import { View, Text, Pressable, StyleSheet, Alert, Dimensions } from "react-native";
import React from "react";
import { updateActiveAccount } from "../redux/authenticationSlice";
import { connect } from "react-redux";
// import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";

import WavyHeader from "./wavyHeader";

// const processSale = <FontAwesome5 name="hand-holding-usd" size={60} />
// const viewInventory = <MaterialCommunityIcons name="archive-search-outline" size={60} />
// const account = <MaterialCommunityIcons name="account-circle" size={50}/>
// const newStock = <MaterialCommunityIcons name="archive-plus-outline" size={60} />
// const transferStock = <MaterialCommunityIcons name="archive-arrow-up-outline" size={63} />
// const removeStock = <FontAwesome name="trash-o" size={60} />
// const reports = <Ionicons name="document-text-outline" size={60} />


//inventory app
class DashboardScreen extends React.Component {
    constructor(props){
        super(props);
        this.Account = this.props.authenticate.ActiveAccount;
    }

    popUP = () => {
        Alert.alert(
          `Log out of ${this.Account} `,
          "  ",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Confirm",
              onPress: () => {
                this.props.navigation.replace('sign in');
              },
            },
          ]
        );
    }
    
    render(){
        return (
            <View style={styles.container}>
                <WavyHeader customStyles={styles.svgCurve} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Custom Header</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
    sales: state.salesLog.value,
    authenticate: state.accounts.value
  })
  
  const mapDispatchToProps = () => ({
    updateActiveAccount
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(DashboardScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      headerContainer: {
        marginTop: 50,
        marginHorizontal: 10
      },
      headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 35
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
      }
})

