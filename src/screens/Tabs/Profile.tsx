import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Camera from '../../assets/camera.svg';
import People from '../../assets/people.svg';
import Shield from '../../assets/shield.svg';
import User from '../../assets/profile.svg';
import ArrowRight from '../../assets/arrow-right.svg';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  const list = [
    {
      id: 1,
      label: 'Account Information',
    },
    {
      id: 2,
      label: 'Google Business Profile',
    },
    {
      id: 3,
      label: 'Team Members',
    },
  ];

  const logout = async () => {
    await AsyncStorage.getAllKeys().then(key => {
      AsyncStorage.multiRemove(key);
    });
    navigation.replace('Login');
  };

  const getUserData = async () => {
    let data = await AsyncStorage.getItem('userData');
    setUserData(JSON.parse(data));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../assets/profilePic.png')}
          resizeMode={'contain'}
        />
        <TouchableOpacity style={styles.camView}>
          <Camera height={responsiveHeight(2.5)} width={responsiveWidth(5)} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{userData?.Name}</Text>
      <Text
        style={[
          styles.title,
          {
            color: '#B3B3B3',
            fontSize: 14,
            fontFamily: 'LexendRegular',
          },
        ]}>
        {userData?.Email}
      </Text>
      <FlatList
        data={list}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.rowContainer}>
            <View style={styles.innerRow}>
              {index === 0 ? (
                <User height={responsiveHeight(4)} width={responsiveWidth(8)} />
              ) : index == 1 ? (
                <Shield
                  height={responsiveHeight(4)}
                  width={responsiveWidth(8)}
                />
              ) : index === 2 ? (
                <People
                  height={responsiveHeight(4)}
                  width={responsiveWidth(8)}
                />
              ) : null}
              <Text style={styles.txt}>{item.label}</Text>
            </View>
            <ArrowRight
              height={responsiveHeight(4)}
              width={responsiveWidth(8)}
            />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          padding: responsiveHeight(3),
          borderRadius: responsiveHeight(2),
          alignSelf: 'center',
        }}
        onPress={logout}>
        <Text
          style={{color: 'white', fontSize: 18, fontFamily: 'LexendRegular'}}>
          Logout{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: responsiveHeight(2),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
    backgroundColor: '#fff',
    elevation: 4,
    padding: responsiveHeight(2),
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#333333',
    marginLeft: responsiveWidth(2),
    fontFamily: 'LexendRegular',
  },
  imgContainer: {
    height: responsiveHeight(17),
    width: responsiveWidth(30),
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(3),
  },
  camView: {
    padding: responsiveHeight(1),
    elevation: 4,
    backgroundColor: '#047CFF',
    borderRadius: responsiveHeight(15),
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
  title: {
    fontSize: 18,
    color: '#333333',
    marginBottom: responsiveWidth(3),
    textAlign: 'center',
    fontFamily: 'LexendRegular',
  },
});
