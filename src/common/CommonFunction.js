import AsyncStorage from '@react-native-async-storage/async-storage';
import crypto from 'react-native-crypto';

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePassword = password => {
  return String(password).match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  );
};

export const encryptToken = async token => {
  const secretKey = '@token';

  const keyBuffer = Buffer.from(secretKey, 'utf8');
  const tokenBuffer = Buffer.from(token, 'utf8');

  const cipher = crypto.createCipher('aes-256-cbc', keyBuffer);

  const encryptedToken = Buffer.concat([
    cipher.update(tokenBuffer),
    cipher.final(),
  ]).toString('base64');

  await AsyncStorage.setItem('token', encryptedToken);
};

export const decryptToken = async () => {
  const secretKey = '@token';

  const encryptedToken = await AsyncStorage.getItem('token');

  if(encryptedToken){
    const keyBuffer = Buffer.from(secretKey,'utf8')
    const tokenBuffer = Buffer.from(encryptedToken,'utf8')

    const cipher = crypto.createCipher('aes-256-cbc', keyBuffer)

    const decryptedToken = Buffer.concat([cipher.update(tokenBuffer),cipher.final(),]).toString('utf8')

    return decryptedToken
  }
  return null
};
