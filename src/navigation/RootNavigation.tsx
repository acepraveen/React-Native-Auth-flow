import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import BottomNavigation from './BottomNavigation'
import SplashScreen from '../screens/SplashScreen'

const Stack= createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} 
    //   initialRouteName="Login"
      >
      <Stack.Screen name='SplashScreen' component={SplashScreen}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}