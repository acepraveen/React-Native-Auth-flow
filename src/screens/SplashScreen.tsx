import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import { decryptToken } from '../common/CommonFunction';
import Logo from '../assets/Logo.svg'

export default function SplashScreen() {
  const navigation = useNavigation();

  setTimeout(async () => {
    let token = await decryptToken()
    console.log('token', token);
    if (token) {
      navigation.replace('BottomNavigation',{screen:'Profile'});
    } else {
      navigation.replace('Login');
    }
  }, 1000);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo height={responsiveHeight(8)} width={responsiveWidth(16)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: responsiveHeight(120),
    width: responsiveWidth(100),
    justifyContent: 'center',
    marginTop: responsiveHeight(-20),
  },
  logo: {
    backgroundColor: '#047CFF',
    padding: responsiveHeight(4),
    borderRadius: responsiveHeight(15),
  },
});
