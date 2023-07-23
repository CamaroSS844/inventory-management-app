import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ReportSummary from './reports';
import SalesReport from './salesReport';
import RemovalsReport from './removals';
import RestockingReport from './restockingReport';


const Tab = createMaterialTopTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions = {{
                tabBarActiveTintColor: "#e91e63",
                tabBarLabelStyle: {
                    fontSize: 12
                },
                tabBarStyle: {
                    backgroundColor: "white"
                }
            }}
            >
                <Tab.Screen
                    name="Overall"
                    component={ReportSummary}
                    options={{tabBarLabel: 'Overall'}}
                />
                <Tab.Screen
                    name='Sales'
                    component={SalesReport}
                    options={{tabBarLabel: 'Sales'}}
                />
                <Tab.Screen
                    name='Removals'
                    component={RemovalsReport}
                    options={{tabBarLabel: 'Removals'}}
                />
                <Tab.Screen
                    name='ReStocking'
                    component={RestockingReport}
                    options={{tabBarLabel: 'ReStocking'}}
                />
            </Tab.Navigator>
    )
}

export default function TopBarNavigator(){
    return (
       <MyTabs /> 
    )
}