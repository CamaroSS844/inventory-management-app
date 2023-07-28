import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { remove } from "../redux/productsListSlice";
import { cancel, check } from "./newProduct";
import { isInStock, checkFields } from "./newProduct";
import { logNewRemoval } from "../redux/removalsLogSlice";
import moment from "moment/moment";
import { removeBarcode } from "../redux/currentBarcodeSlice";
import { Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const barcode = <MaterialCommunityIcons name="line-scan" size={170} />

//sorting according to quantity
//date of adding inventory
///date to assist with reordering
//age analysis


//inventory app
class TransferScreen extends React.Component {
    constructor(props){
        super(props);
        this.check = isInStock(this.props.currentBarcode, this.props.inventory)
        this.branches = this.props.authenticate.Branches;

        this.state = {
            barcodeNumber: !this.props.currentBarcode? "" : this.props.currentBarcode,
            productName: !this.check? "": this.check.productName,
            quantity: "",//or all for every thing
            branch: "",
            instock: false
        }
    }

    autofill = (barcode) => {
      value = isInStock(barcode, this.props.inventory)
      if(!value){
        this.setState({
          productName: "",
          instock: false
      })
      this.setState({instock: value})
      return null
      }
      this.setState({
        productName: value.productName,
        instock: value
      })
    }

    logRemovalPrep = () => {
      /*
        action.payload format
        "2023-07-14": {
          "12345":{
            dateUI: "14th July 2023, 2:41:42 pm",
            quantity: "10",
            category: "damaged",
            reason: "fell off the shelf"
          },
          "1234567":{ 
            dateUI: "14th July 2023, 2:41:42 pm",
            quantity: "2",
            category: "expired",
            reason: "spent too long in the freezer"
          },
        } 
      */
      let payload = {};
      time = moment().format();
      payload[moment().format()] = {
        [this.state.barcodeNumber]: {
          dateUI: moment().format('Do MMMM YYYY, h:mm:ss a'),
          quantity: this.state.quantity,
          category: this.state.Category,
          reason: this.state.Reason
        }
      }
      this.props.logNewRemoval({...payload});
      this.props.removeBarcode();
    }

    popUP = (obj) => {
        Alert.alert(
          `Are you sure you want to transfer ${this.state.productName} to ${this.state.branch}`,
          " ",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Confirm",
              onPress: () => {
                this.props.remove({
                  barcode: this.state.barcodeNumber, 
                  quantity: this.state.quantity,
                  dateCode: moment().format(),
                  dateUI: moment().format('Do MMMM YYYY, h:mm:ss a')
                })
              
                this.logRemovalPrep()

                showMessage({
                  message: `  Saved!`,
                  type: "success",
                  autoHide: true,
                  icon: () => check
                })
              },
            },
          ]
        );
    }


    handleConfirm = (obj) => {
        value = isInStock(this.state.barcodeNumber, this.props.inventory);
        if (typeof(value) != "object"){
            showMessage({
                message: `  Barcode ${this.state.barcodeNumber} does not exist`,
                description: `  Check for any typos or rescan the barcode`,
                type: "danger",
                autoHide: true,
                duration: 10000,
                icon: () => cancel
              });
        }
        else{
            this.popUP(value);
        }
    }

    render(){
        // data: [
        //     {key:'366', value:'All'},
        //     {key:'7', value:'1 week'},
        //     {key:'30', value:'1 month'},
        //     {key:'90', value:'3 months'},
        //     {key:'180', value:'6 months'},
        //     {key:'365', value:'1 year'},
        // ]
        data = []
        for(i=0; i < this.branches.length; i ++){
            data.push({key: `${i+1}`, value: this.branches[i]})
        }



        return (
          <ScrollView >
            <View style={styles.Container}>
                <Pressable 
                  style={{backgroundColor: "white", borderRadius: 20, marginBottom: -60, zIndex: 1}}
                  onPress={() => this.props.navigation.push("BarcodeScreen", {id : 'Transfer'})}
                  >
                  {barcode}
                </Pressable>
                <View style={styles.main}>
                  <View style={{width: "100%", display: "flex", alignItems: "center"}}>
                       <TextInput
                          style={styles.input}
                          placeholder="Enter Barcode"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.barcodeNumber}
                          keyboardType={"visible-password"}
                          onChangeText={(barcodeNumber) => {
                            this.setState({ barcodeNumber })
                            this.autofill(barcodeNumber);
                          }}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Product name"
                          placeholderTextColor={"black"}
                          editable={false}
                          value={this.state.productName}
                          keyboardType={"visible-password"}
                          onChangeText={(productName) => this.setState({ productName })}
                        />
                        
                        <TextInput
                          style={styles.input}
                          placeholder="Enter quantity"
                          placeholderTextColor={"grey"}
                          editable={true}
                          value={this.state.quantity}
                          keyboardType={"numeric"}
                          onChangeText={(quantity) => this.setState({ quantity })}
                        />

                        <View style={{ 
                            width: '85%', padding: 20,
                            display: 'flex', justifyContent: 'center', 
                            alignItems: 'center'}}>
                            <SelectList 
                                setSelected={(branch) => this.setState({branch})} 
                                data={data} 
                                save="value"
                                searchPlaceholder="Filter"
                                boxStyles={styles.input}
                            />
                        </View>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly", marginBottom: "20%"}}>
                      <TouchableOpacity style={{...styles.button, backgroundColor: "#bb0606"}} onPress={
                        () => {
                            this.setState({
                                barcodeNumber: "",
                                productName: "",
                                quantity: "",
                            })
                        }}>
                          <Text style={{color: "white"}}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {
                        checkFields({...this.state}, this.handleConfirm)
                        }}>
                          <Text style={{color: "white"}}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
    currentBarcode: state.currentBCS.value,
    authenticate: state.accounts.value
  })
  
const mapDispatchToProps = () => ({
  remove,
  logNewRemoval,
  removeBarcode
})
  
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(TransferScreen)


const styles = StyleSheet.create({
  Container: {
      backgroundColor: "#CF8DB9", 
      height: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
  },
  main: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#D9D9D9",
      width: "100%",
      height: "80%",
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      paddingTop: 70
  },
  input : {
      marginBottom: 30,
      backgroundColor: "white",
      width: "70%",
      padding: 10,
      borderRadius: 20,
      color: 'black'
  },
  button: {
      backgroundColor: "#476C6C",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 90,
      height: 35,
      borderRadius: 15

  },
  item: {
      color: "white"
  },
  para: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20
  }
})

