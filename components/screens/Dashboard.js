import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import React from "react"
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";

const processSale = <FontAwesome5 name="hand-holding-usd" size={60} />
const viewInventory = <MaterialCommunityIcons name="archive-search-outline" size={60} />
const account = <MaterialCommunityIcons name="account-circle" size={50} />
const newStock = <MaterialCommunityIcons name="archive-plus-outline" size={60} />
const transferStock = <MaterialCommunityIcons name="archive-arrow-up-outline" size={63} />
const removeStock = <FontAwesome name="trash-o" size={60} />
const reports = <Ionicons name="document-text-outline" size={60} />


//inventory app
export default class DashboardScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.Container}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Pressable>
                    {account}
                    </Pressable>
                    <View>
                        <Text>Trinity Cacciola</Text>
                        <Text>Phelandaba</Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <View style={styles.div}>
                        <Pressable onPress={() => this.props.navigation.push("ProcessSale")}>
                            {processSale}
                            <Text style={{textAlign: "center"}}>Process</Text>
                            <Text style={{textAlign: "center"}}>Sale</Text>
                        </Pressable>
                        <Pressable onPress={() => this.props.navigation.push("InventoryTable")} >
                            {viewInventory}
                            <Text style={{textAlign: "center"}}>View</Text>
                            <Text style={{textAlign: "center"}}>Inventory</Text>
                        </Pressable>
                    </View>
                    <View style={styles.div}>
                        <Pressable onPress={() => this.props.navigation.push("new Product")}>
                            {newStock}
                            <Text style={{textAlign: "center"}}>Add new</Text>
                            <Text style={{textAlign: "center"}}>Stock</Text>
                        </Pressable>
                        <Pressable >
                            {transferStock}
                            <Text style={{textAlign: "center"}}>Transfer</Text>
                            <Text style={{textAlign: "center"}}>Stock</Text>
                        </Pressable>
                    </View>
                    <View style={styles.div}>
                        <Pressable onPress={() => this.props.navigation.push("remove product")}>
                            {removeStock}
                            <Text style={{textAlign: "center"}}>Remove</Text>
                            <Text style={{textAlign: "center"}}>Stock</Text>
                        </Pressable>
                        <Pressable onPress={() => this.props.navigation.push("reports")}>
                            {reports}
                            <Text style={{textAlign: "center", marginTop: 10}}>Reports</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#CF8DB9", 
        height: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    main: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        width: "100%",
        height: "78%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 20
    },
    div: {
        display: "flex",
        flexDirection: "row",
        padding: 20,
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "baseline"
    },
})

