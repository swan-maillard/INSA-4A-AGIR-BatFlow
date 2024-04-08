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
                    <CustomText style={customStyles.normalText}>
                      <CustomText style={{ ...customStyles.normalText, ...styles.bold }}>0 - 2 :</CustomText> Not
                      alarming
                    </CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>
                      <CustomText style={{ ...customStyles.normalText, ...styles.bold }}>3 or more :</CustomText> This
                      score indicates Heavy Menstrual Bleeding that interferes with quality of life
                    </CustomText>
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
                  The SAMANTA test is developed around six targeted questions aimed at identifying Heavy Menstrual
                  Bleeding (HMB). SAMANTA questionnaire was created by a committee of HMB-expert gynaecologists.
                </CustomText>
                <View style={{ marginTop: 10 }} />
                <CustomText style={customStyles.greyText}>
                  Initially, an extensive literature review was conducted to identify pertinent questionnaires and
                  concepts related to HMB and its impact on Health-Related Quality of Life (HRQoL). These questions
                  underwent rigorous cognitive interviews with a sample of women experiencing HMB to ensure clarity and
                  relevance.
                </CustomText>
                <View style={{ marginTop: 10 }} />
                <CustomText style={customStyles.greyText}>
                  The SAMANTA questionnaire presented high sensitivity (86.7%) and specificity (89.5%), with a positive
                  predictive value of 92.0%, a nega- tive predictive value of 83% and a discriminatory capacity of
                  87.9%.
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
                    <CustomText style={customStyles.normalText}>
                      <CustomText style={{ ...customStyles.normalText, ...styles.bold }}>0 - 99 :</CustomText> Not
                      alarming
                    </CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>
                      <CustomText style={{ ...customStyles.normalText, ...styles.bold }}>100 - 149 :</CustomText> This
                      may indicates that your menstrual bleeding flow is higher that normal
                    </CustomText>
                    <View style={{ marginTop: 10 }} />
                    <CustomText style={customStyles.normalText}>
                      <CustomText style={{ ...customStyles.normalText, ...styles.bold }}>150 or more :</CustomText> Such
                      a score seems highly correlated with a Heavy Menstrual Bleeding, please seek medical advice
                    </CustomText>
                  </View>
                </LinearGradient>
              </View>
              <View style={customStyles.mediumPanelContainer}>
                <CustomText style={customStyles.greyText}>
                  The Pictorial Blood Loss Assessment Chart (PBAC) is based off semi-quantitative methods. The PBAC
                  combines the number of sanitary pads or tampons used during menstruation and their level of
                  impregnation to assess menstrual blood loss. Patients complete the chart over their menstruation
                  period, scoring points for each pad used based on its degree of saturation.
                </CustomText>
                <View style={{ marginTop: 10 }} />
                <CustomText style={customStyles.greyText}>
                  A cummulated score above 100 on the PBAC has been associated with menstrual blood loss greater than 80
                  ml, making it a commonly used tool in clinical research. However, it requires significant time and
                  effort from both the patient, who collects data, and the doctor, who evaluates the charts.
                </CustomText>
                <View style={{ marginTop: 10 }} />
                <CustomText style={customStyles.greyText}>
                  Additionally, the PBAC may not be valid for all types of menstrual products and does not assess the
                  quality of life related to bleeding.
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
