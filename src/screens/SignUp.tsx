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
import Tick from '../assets/Tick.svg';
import {useNavigation} from '@react-navigation/native';
import {encryptToken, validateEmail} from '../common/CommonFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(true);
  const [errorLabel, setErrorLabel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loader, setLoader] = useState(false);
  const [borderChange, setborderChange] = useState({
    emailBorder: '#F8F8F8',
    passwordBorder: '#F8F8F8',
    nameBorder: '#F8F8F8',
  });
  const [allowNotif, setAllowNotif] = useState(false);
  const [allowTermService, setAllowTermService] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name.trim()) {
      setErrorLabel('Please enter name');
      setName('');
      setborderChange({...borderChange, nameBorder: 'red'});
      return;
    } else if (!email.trim()) {
      setEmail('');
      setborderChange({...borderChange, emailBorder: 'red'});
      setErrorLabel('Please enter email address.');
      return;
    } else if (!validateEmail(email)) {
      setErrorLabel('Please enter valid email');
      setborderChange({...borderChange, emailBorder: 'red'});
      return;
    } else if (!password.trim()) {
      setErrorLabel('Please enter password');
      setPassword('');
      setborderChange({...borderChange, passwordBorder: 'red'});
      return;
    }else if (!allowTermService) {
        setErrorLabel('Please accept terms & services');
        return;
      }
    setLoader(true);
    let data = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    await fetch(
      'ADD SIGNUP API RUL',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      },
    )
      .then(res => {
        return res.json();
      })
      .then(async res => {
        console.log('res', res);
        setLoader(false);
        if (res.data) {
            await encryptToken(res.data.Token);
            AsyncStorage.setItem('userData', JSON.stringify(res.data));
            navigation.replace('BottomNavigation',{screen:'Profile'});
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
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subTitle}>
        You don't have account let's create account{' '}
      </Text>
      <View
        style={[styles.inputContainer, {borderColor: borderChange.nameBorder}]}>
        <Sms height={responsiveHeight(3)} width={responsiveWidth(6)} />
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#B3B3B3"
          style={styles.input}
          onChangeText={text => {
            setName(text);
            setErrorLabel('');
            setborderChange({
              ...borderChange,
              nameBorder: '#F8F8F8',
            });
          }}
        />
      </View>
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

      <TouchableOpacity
        style={[styles.rowContainer]}
        onPress={() => setAllowTermService(!allowTermService)}>
        <View
          style={{
            backgroundColor: allowTermService ? '#047CFF' : '#ccc',
            padding: responsiveHeight(0.3),
          }}>
          <Tick height={responsiveHeight(1.5)} width={responsiveWidth(3)} />
        </View>
        <Text style={styles.label}> I agree with term & conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.rowContainer]}
        onPress={() => setAllowNotif(!allowNotif)}>
        <View
          style={{
            backgroundColor: allowNotif ? '#047CFF' : '#ccc',
            padding: responsiveHeight(0.3),
          }}>
          <Tick height={responsiveHeight(1.5)} width={responsiveWidth(3)} />
        </View>
        <Text style={styles.label}> Allow Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
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
    marginBottom: responsiveHeight(3),
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
    marginBottom: responsiveHeight(2),
    width: responsiveWidth(90),
  },
  btn: {
    backgroundColor: '#047CFF',
    width: responsiveWidth(90),
    padding: responsiveHeight(2),
    borderRadius: responsiveHeight(15),
    marginTop: responsiveHeight(10),
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'LexendBold'
  },
  label: {
    fontSize: 12,
    color: '#333333',
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
