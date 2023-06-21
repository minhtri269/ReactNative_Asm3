import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import Detail from '../screens/Detail'
import BottomTab from './BottomTab'
import Setting from '../screens/Setting'

const Drawer = createDrawerNavigator()

const DrawerLayout = () => {
    return (
        <Drawer.Navigator initialRouteName='Home' screenOptions={{ headerShown: true}}>
            <Drawer.Screen name='Home' component={BottomTab} />
            <Drawer.Screen name='Setting' component={Setting} />
        </Drawer.Navigator>
    )
}

export default DrawerLayout