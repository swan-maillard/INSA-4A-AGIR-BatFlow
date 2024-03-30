import React, {useContext, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import {CommonActions} from '@react-navigation/native';
import {DataContext} from '../context/DataContext.tsx';

const LoginScreen = ({navigation}: any) => {
  const data = useContext(DataContext);
  // Nom d'utilisateur
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (!username) {
      return;
    }

    // On enregistre le nouvel utilisateur
    data.setUser(username);

    // On redirige vers le Profile, en réinitialisant l'historique
    navigation.dispatch(CommonActions.reset({routes: [{name: 'Profile'}]}));
  };

  const customStyles = StyleSheet.create({
    header: {
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 20,
      zIndex: 5,
      backgroundColor: colors.primary,
      width: '100%',
      marginBottom: -35,
    },
    container: {
      position: 'relative',
      backgroundColor: colors.white,
      height: '100%',
      width: '100%',
      color: colors.black,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      paddingTop: 125,
      gap: 10,
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 30,
      width: '90%',
    },
    title: {
      color: colors.black,
      fontWeight: '400',
      fontFamily: 'Kalnia-Regular',
      fontSize: 40,
    },
    loginButton: {
      backgroundColor: colors.primary,
      width: '100%',
    },
  });

  return (
    <View style={styles.body}>
      <View style={styles.mainContainer}>
        <View style={customStyles.header}>
          <Text style={customStyles.title}>Bat'Flow</Text>
          <Image source={require('./../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={customStyles.container}>
          <TopWave />
          <View style={customStyles.actions}>
            <CustomText style={{fontSize: 20, marginBottom: 20}}>
              Login
            </CustomText>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="gray"
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <Pressable
              style={{...styles.button, ...customStyles.loginButton}}
              onPress={handleLogin}>
              <CustomText style={{color: 'white'}}>Login</CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
