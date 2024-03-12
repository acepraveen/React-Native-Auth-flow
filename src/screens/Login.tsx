import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Logo from '../assets/Logo.svg';
import Sms from '../assets/sms.svg';
import Lock from '../assets/lock.svg';
import Fb from '../assets/face.svg';
import Google from '../assets/gg.svg';
import Apple from '../assets/app.svg';
import Tick from '../assets/Tick.svg';
import {useNavigation} from '@react-navigation/native';
import {
  encryptToken,
  validateEmail,
  validatePassword,
} from '../common/CommonFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [errorLabel, setErrorLabel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [borderChange, setborderChange] = useState({
    emailBorder: '#F8F8F8',
    passwordBorder: '#F8F8F8',
  });

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.trim()) {
      setEmail('');
      setborderChange({...borderChange, emailBorder: 'red'});
      setErrorLabel('Please enter email address.');
      return;
    } else if (!validateEmail(email)) {
      setborderChange({...borderChange, emailBorder: 'red'});
      setErrorLabel('Please enter valid email address.');
      return;
    } else if (!password.trim()) {
      setPassword('');
      setErrorLabel('Please enter password.');
      setborderChange({...borderChange, passwordBorder: 'red'});
      return;
    }
    setLoader(true);
    let data = JSON.stringify({
      email: email,
      password: password,
    });
    console.log('d', data);

    await fetch('ADD LOGIN API URL', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(res => {
        return res.json();
      })
      .then(async res => {
        console.log('res', res);
        setLoader(false);
        if (res.data) {
          await encryptToken(res.data.Token);
          AsyncStorage.setItem('userData', JSON.stringify(res.data));
          navigation.replace('BottomNavigation', {screen: 'Profile'});
        } else if (res.code) {
          setErrorLabel(
            `${res.message ? res.message : 'Something went wrong'}`,
          );
        }
      });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}
      automaticallyAdjustKeyboardInsets>
      <Modal transparent visible={loader}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
      <View style={styles.logo}>
        <Logo height={responsiveHeight(7)} width={responsiveWidth(14)} />
      </View>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subTitle}>You have account let's Log in </Text>
      <View
        style={[
          styles.inputContainer,
          {borderColor: borderChange.emailBorder},
        ]}>
        <Sms height={responsiveHeight(3)} width={responsiveWidth(6)} />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#B3B3B3"
          style={styles.input}
          onChangeText={text => {
            setEmail(text);
            setErrorLabel('');
            setborderChange({
              ...borderChange,
              emailBorder: '#F8F8F8',
            });
          }}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          {borderColor: borderChange.passwordBorder},
        ]}>
        <TouchableOpacity
          onPress={() => {
            setShowPassword(!showPassword);
          }}>
          <Lock
            height={responsiveHeight(3)}
            width={responsiveWidth(6)}
            stroke={showPassword ? '#000' : '#fff'}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#B3B3B3"
          secureTextEntry={showPassword}
          style={styles.input}
          onChangeText={text => {
            setPassword(text);
            setErrorLabel('');
            setborderChange({
              ...borderChange,
              passwordBorder: '#F8F8F8',
            });
          }}
        />
      </View>
      {errorLabel !== '' ? (
        <Text style={styles.errorTxt}>{errorLabel}</Text>
      ) : null}
      <View
        style={[
          styles.rowContainer,
          {
            justifyContent: 'space-between',
            width: responsiveWidth(90),
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.rowContainer,
            {
              marginBottom: 0,
            },
          ]}
          onPress={() => {
            setRememberMe(!rememberMe);
          }}>
          <View
            style={{
              backgroundColor: rememberMe ? '#047CFF' : '#ccc',
              padding: responsiveHeight(0.3),
            }}>
            <Tick height={responsiveHeight(1.5)} width={responsiveWidth(3)} />
          </View>
          <Text style={styles.label}> Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.label, {color: '#047CFF'}]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.social}>
          <Fb height={responsiveHeight(4)} width={responsiveWidth(8)} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.social, {marginHorizontal: responsiveWidth(5)}]}>
          <Apple height={responsiveHeight(4)} width={responsiveWidth(8)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.social}>
          <Google height={responsiveHeight(4)} width={responsiveWidth(8)} />
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.hr} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.hr} />
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.footerLabel}>Don't have an account ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text
            style={[
              styles.footerLabel,
              {
                color: '#047CFF',
                marginLeft: responsiveWidth(2),
              },
            ]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnTxt}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(10),
  },
  logo: {
    backgroundColor: '#047CFF',
    padding: responsiveHeight(2),
    borderRadius: responsiveHeight(15),
  },
  title: {
    color: '#047CFF',
    // fontWeight: 'bold',
    marginVertical: responsiveHeight(2),
    fontSize: 24,
    fontFamily: 'LexendBold'
  },
  subTitle: {
    color: '#B3B3B3',
    marginVertical: responsiveHeight(2),
    fontSize: 14,
    fontFamily: 'LexendRegular'
  },
  inputContainer: {
    backgroundColor: '#F8F8F8',
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(3),
    paddingHorizontal: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    color: '#333333',
    paddingHorizontal: responsiveWidth(4),
    // backgroundColor:"red",
    width: responsiveWidth(78),
    fontSize: 14,
    fontFamily: 'LexendRegular'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(4),
  },
  social: {
    padding: responsiveHeight(1.5),
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(15),
  },
  btn: {
    backgroundColor: '#047CFF',
    width: responsiveWidth(90),
    padding: responsiveHeight(2),
    borderRadius: responsiveHeight(15),
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'LexendBold'
  },
  or: {
    color: '#047CFF',
    fontSize: 20,
    marginHorizontal: 5,
    fontFamily: 'LexendRegular'
  },
  hr: {
    height: 0.3,
    backgroundColor: '#A9A9A9',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#333333',
    fontFamily: 'LexendRegular'
  },
  footerLabel: {
    fontSize: 14,
    color: '#8083A3',
    fontFamily: 'LexendRegular'
  },
  errorTxt: {
    color: '#F33535',
    fontSize: 14,
    textAlign: 'left',
    width: responsiveWidth(90),
    marginBottom: responsiveHeight(1),
    fontFamily: 'LexendRegular'
  },
});
