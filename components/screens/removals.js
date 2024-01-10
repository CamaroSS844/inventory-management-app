import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { PresentData } from "./screenComponents/presentData";
import React from "react";


//inventory app
class RemovalsReport extends React.Component {
    constructor(props){
        super(props);
        this.keyslist = Object.keys(this.props.removals);
        this.valueslist = Object.values(this.props.removals);
    }
    render(){
        return (
            <View style={styles.Container}>
                <View style={styles.main}>
                    <PresentData keysList={[...this.keyslist]} valuesList={[...this.valueslist]} names ={{...this.props.productNames}} category={'category'}/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    inventory: state.inventoryList.value,
    removals: state.removalsLog.value,
    productNames: state.productLog.value
  })
  
  const mapDispatchToProps = () => ({
    
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(RemovalsReport)

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
        width: "100%",
        height: "93%",
        backgroundColor: "#D9D9D9",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 30
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

