import React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import {useStorage} from '../hooks/useStorage';
import Header from '../components/Header';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import styles, {colors} from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from "../components/NavigationBar.tsx";
import Svg, {Path} from "react-native-svg";

const SettingsScreen = ({navigation}: any) => {
  const [currentUser] = useStorage('AGIR@current-user', '');


  // State for the switches (assuming these are the settings you want to toggle)
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [sharingEnabled, setSharingEnabled] = React.useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleSharing = () => setSharingEnabled(previousState => !previousState);

  const customStyles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: colors.white,
        height: "100%",
        width: "100%",
        color: colors.black,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 90,
        paddingBottom: 30
    },
      actions: {
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "90%",
          flexGrow: 1,
          marginTop: 40,
          gap: 30
      },
    settingsItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 15,
    },
    settingsText: {
      fontSize: 20,
      color : 'white',
        fontWeight: "700",
    },
      usernameButton: {
        width: "100%",
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
    switch: {
      transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
  });

  return (
    <View style={styles.body}>
        <View style={styles.mainContainer}>
            <Header/>
            <TopWave/>
            <ScrollView style={{width: '100%'}}>
                <View style={customStyles.container}>
                    <CustomText style={{color:colors.primary, fontFamily:"FiraSans-Bold", fontSize:25}}>Settings</CustomText>
                    <View style={customStyles.actions}>

                        <Pressable style={{width: '100%'}} onPress={() => navigation.navigate('Profile')}>
                            <LinearGradient colors={['#fc0e46', '#fd6085']} useAngle={true} angle={140} style={{...styles.button, ...customStyles.usernameButton}}>
                                    <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
                                        <Image source={require('./../assets/logo-2.png')} style={{...styles.logo, width: 40, height: 40}}/>
                                        <View style={{display: "flex"}}>
                                            <CustomText style={customStyles.settingsText}>Username</CustomText>
                                            <CustomText style={{color: colors.white}}>{currentUser}</CustomText>
                                        </View>
                                    </View>
                                    <Svg fill="none" stroke={colors.white} height="40" width="40" viewBox="0 0 24 24" strokeLinecap="round" strokeWidth="1.5">
                                        <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002"/>
                                    </Svg>
                            </LinearGradient>
                        </Pressable>

                        <View style={ {backgroundColor : '#f0f0f0', borderRadius: 30} }>
                            <View style={  customStyles.settingsItem}>
                                <CustomText style={{color : "#333332", fontSize : 15, ...styles.bold}}>Allow notifications</CustomText>
                                <Switch
                                    trackColor={{ false: 'grey', true: colors.primary }}
                                    thumbColor={'white'}
                                    onValueChange={toggleNotifications}
                                    value={notificationsEnabled}
                                    style={customStyles.switch}
                                />
                            </View>
                            <View style={customStyles.settingsItem}>
                                <CustomText style={{color : "#333332", fontSize : 15, ...styles.bold, width: '75%'}}>Allow us to keep the pictures of your sanitory products for further research</CustomText>
                                <Switch
                                    trackColor={{ false: 'grey', true: colors.primary }}
                                    thumbColor={'white'}
                                    onValueChange={toggleSharing}
                                    value={sharingEnabled}
                                    style={customStyles.switch}
                                />
                            </View>
                        </View>
                        {/* You can add more settings items here */}
                        <Pressable style={{...styles.button, backgroundColor: colors.primary, width: "100%"}} onPress={() => navigation.navigate('Home')}>
                            <CustomText style={{color: colors.white}}>Log out</CustomText>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <NavigationBar/>
        </View>
    </View>
  );
};

export default SettingsScreen;
