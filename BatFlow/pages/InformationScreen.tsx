import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import NavigationBar from '../components/NavigationBar';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

// Page d'information
const InformationScreen = () => {
  // Style custom
  const customStyles = StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: colors.white,
      height: '100%',
      width: '100%',
      color: colors.black,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      paddingTop: 60,
      paddingBottom: 30,
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '90%',
      flexGrow: 1,
      gap: 30,
    },
    largePanelContainer: {
      borderRadius: 30,
      padding: 30,
      width: '100%',
      marginTop: 30,
    },
    smallPanelContainer: {
      borderRadius: 30,
      padding: 30,
      width: '70%',
      marginTop: 10,
    },
    mediumPanelContainer: {
      backgroundColor: '#F0F0F0E5',
      borderRadius: 30,
      padding: 30,
      width: '100%',
      marginTop: 10,
    },
    titleText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    normalText: {
      color: 'white',
      fontSize: 14,
    },
    greyText: {
      color: 'grey',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.body}>
      <View style={styles.mainContainer}>
        <Header />
        <TopWave />
        <ScrollView style={{ width: '100%' }}>
          <View style={customStyles.container}>
            <View style={customStyles.actions}>
              <LinearGradient
                style={customStyles.largePanelContainer}
                colors={['#fc0e46', '#fd6085']}
                useAngle={true}
                angle={140}
              >
                <CustomText style={customStyles.titleText}>What is heavy menstrual bleeding ?</CustomText>
                <View style={{ marginTop: 20 }}>
                  <CustomText style={customStyles.normalText}>
                    Heavy menstrual bleeding (HMB) is defined as excessive menstrual blood loss that interferes with
                    quality of life. It is an under-diagnosed and under-treated disorder due to the poor correlation
                    between patient perception and objective menstrual blood loss, as well as the scarcity of validated
                    diagnostic tools.
                  </CustomText>
                  <View style={{ marginTop: 10 }} />
                  <CustomText style={customStyles.normalText}>
                    Anaemia caused by HMB is a common problem, underestimated on many occasions and with consequences
                    that go beyond the scope of gynaecology.
                  </CustomText>
                </View>
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <LinearGradient
                  colors={['#fc0e46', '#fd6085']}
                  useAngle={true}
                  angle={140}
                  style={[customStyles.smallPanelContainer, { alignSelf: 'flex-start' }]}
                >
                  <CustomText style={customStyles.titleText}>What does the Samanta score mean ?</CustomText>
                  <View style={{ marginTop: 20 }}>
                    <CustomText style={customStyles.normalText}>0 - XX : not alarming</CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>XX - YY : This may indicates...</CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>YY - ZZ : This may indicates...</CustomText>
                  </View>
                </LinearGradient>
                <Image
                  source={require('../assets/towel.png')}
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View style={customStyles.mediumPanelContainer}>
                <CustomText style={customStyles.greyText}>
                  The Samanta test is based off ... (texte écrit avec la doc) El sangrado menstrual abundante (SMA) se
                  define como una pérdida excesiva de sangre menstrual que interfiere con la calidad de vida.
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../assets/blood.png')}
                  style={{
                    width: 40,
                    height: 60,
                    marginRight: 50,
                  }}
                />
                <LinearGradient
                  colors={['#fc0e46', '#fd6085']}
                  useAngle={true}
                  angle={140}
                  style={[customStyles.smallPanelContainer, { justifyContent: 'center' }]}
                >
                  <CustomText style={customStyles.titleText}>What does the PBAC score mean ?</CustomText>
                  <View style={{ marginTop: 20 }}>
                    <CustomText style={customStyles.normalText}>0 - XX : not alarming</CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>XX - YY : This may indicates...</CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>YY - ZZ : This may indicates...</CustomText>
                  </View>
                </LinearGradient>
              </View>
              <View style={customStyles.mediumPanelContainer}>
                <CustomText style={customStyles.greyText}>
                  The PBAC test is based off ... (texte écrit avec la doc) El sangrado menstrual abundante (SMA) se
                  define como una pérdida excesiva de sangre menstrual que interfiere con la calidad de vida.
                </CustomText>
              </View>
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default InformationScreen;
