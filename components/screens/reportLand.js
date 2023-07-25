import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ReportSummary from './reports';
import SalesReport from './salesReport';
import RemovalsReport from './removals';
import RestockingReport from './restockingReport';
import { View, Text } from 'react-native';

const Loading = () => {
    return (
        <View style={{flex: 1, backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Text>Loading...</Text>
        </View>
    )
}


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
                },
            }}
            >
                <Tab.Screen
                    name="Overall"
                    component={ReportSummary}
                    options={{
                        tabBarLabel: 'Overall',
                        lazy: true,
                        lazyPreloadDistance: 1,
                        lazyPlaceholder: () => {
                            <Loading />
                        }
                    }}
                />
                <Tab.Screen
                    name='Sales'
                    component={SalesReport}
                    options={{
                        tabBarLabel: 'Sales',
                        lazy: true,
                        lazyPreloadDistance: 0,
                        lazyPlaceholder: () => {
                            <Loading />
                        }
                    }}
                />
                <Tab.Screen
                    name='Removals'
                    component={RemovalsReport}
                    options={{
                        tabBarLabel: 'Removals',
                        lazy: true,
                        lazyPreloadDistance: 1,
                        lazyPlaceholder: () => {
                            <Loading />
                        }
                    }}
                />
                <Tab.Screen
                    name='ReStocking'
                    component={RestockingReport}
                    options={{
                        tabBarLabel: 'ReStocking',
                        lazy: true,
                        lazyPreloadDistance: 1,
                        lazyPlaceholder: () => {
                            <Loading />
                        }
                    }}
                />
            </Tab.Navigator>
    )
}

export default function TopBarNavigator(){
    return (
       <MyTabs /> 
    )
}