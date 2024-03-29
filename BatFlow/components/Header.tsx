import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg'
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import styles, {colors} from '../pages/Styles'
import CustomText from "./CustomText.tsx";
import {useStorage} from "../hooks/useStorage.ts";

const style = {
    position: "absolute",
    top: 0
}

const customStyles = StyleSheet.create({
      header: {
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          width: "100%",
          zIndex: 5,
          backgroundColor: colors.primary
      },

      headerLeft: {
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          gap: 20
      }
    })

const Header = () => {
    const navigation: NavigationProp<any> = useNavigation();

    const [currentUser] = useStorage('DRACULA@current-user', '') as [string];

    return (
    <View style={customStyles.header}>
        <View style={customStyles.headerLeft}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                <Image source={require('./../assets/logo-2.png')} style={{...styles.logo, width: 40, height: 40}}/>
            </TouchableWithoutFeedback>
            <View style={{display: "flex"}}>
                <CustomText>Welcome,</CustomText>
                <CustomText style={{...styles.bold, lineHeight: 17}}>{currentUser}</CustomText>
            </View>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <Svg height="30" width="30" viewBox="0 0 24 24" fill={colors.black}>
              <Path d="m5 11h8v2h-8v3l-5-4 5-4zm-1 7h2.708a8 8 0 1 0 0-12h-2.708a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1 -8-4z"/>
          </Svg>
        </TouchableWithoutFeedback>
    </View>
    );
}

export default Header;

