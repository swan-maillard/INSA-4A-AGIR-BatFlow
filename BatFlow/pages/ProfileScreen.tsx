import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave';
import NavigationBar from '../components/NavigationBar';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {DataContext} from '../context/DataContext.tsx';
import DataManager from '../data/DataManager.ts';

// Page profil de l'utilisateur
const ProfileScreen = ({navigation}: any) => {
  const Data = useContext(DataContext);
  const [cycleEnded, setCycleEnded] = useState(false);

  const [lastCycle, setLastCycle] = useState<string[]>([]);

  const retrieveData = useCallback(() => {
    setLastCycle(Data.getLastCycle());
  }, [Data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  // L'utilisateur termine son cycle en cours
  const endCycle = () => {
    Data.endCycle(new Date());
    setCycleEnded(true);
  };

  const startCycle = () => {
    setCycleEnded(false);
    navigation.navigate('Calendar');
  };

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
      paddingTop: 90,
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
    cycleInfoContainer: {
      width: '100%',
      padding: 25,
      alignItems: 'flex-start',
    },
    cumulativePBACContainer: {
      backgroundColor: 'rgba(240, 240, 240, 0.9)',
      borderRadius: 15,
      padding: 15,
      width: '100%',
      marginTop: 10,
    },
    normalText: {
      color: 'white',
      fontSize: 12,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.body}>
      <View style={styles.mainContainer}>
        <Header />
        <TopWave />
        <ScrollView style={{width: '100%'}}>
          <View style={customStyles.container}>
            <View style={customStyles.actions}>
              {lastCycle.length === 1 ? (
                <>
                  <LinearGradient
                    colors={['#fc0e46', '#fd6085']}
                    useAngle={true}
                    angle={140}
                    style={{
                      ...styles.button,
                      ...customStyles.cycleInfoContainer,
                    }}>
                    <CustomText
                      style={{
                        color: colors.white,
                        fontSize: 22,
                        ...styles.bold,
                      }}>
                      Your cycle has started last{' '}
                      {new Date(lastCycle[0]).toDateString()}
                    </CustomText>
                    <CustomText
                      style={{
                        color: colors.white,
                        fontSize: 14,
                        fontFamily: 'FiraSans-Light',
                      }}>
                      Your period still likely is heavy, and you may have cramps
                      or stomach pain.
                    </CustomText>
                  </LinearGradient>
                  <Pressable
                    style={{
                      ...styles.button,
                      backgroundColor: colors.white,
                      borderColor: colors.primary,
                      borderWidth: 3,
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => navigation.navigate('AddSanitoryProduct')}>
                    <Svg
                      fill="none"
                      stroke="none"
                      height="40"
                      width="40"
                      viewBox="0 0 24 24"
                    />
                    <CustomText style={{color: colors.primary}}>
                      Add a sanitory product used
                    </CustomText>
                    <Svg
                      style={{alignSelf: 'flex-end'}}
                      fill="none"
                      stroke={colors.primary}
                      height="40"
                      width="40"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="1.5">
                      <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                    </Svg>
                  </Pressable>
                  <Pressable
                    style={{
                      ...styles.button,
                      backgroundColor: colors.primary,
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => endCycle()}>
                    <Svg
                      fill="none"
                      stroke="none"
                      height="40"
                      width="40"
                      viewBox="0 0 24 24"
                    />
                    <CustomText style={{color: colors.white}}>
                      My cycle has now ended
                    </CustomText>
                    <Svg
                      style={{alignSelf: 'flex-end'}}
                      fill="none"
                      stroke={colors.white}
                      height="40"
                      width="40"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="1.5">
                      <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                    </Svg>
                  </Pressable>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={[
                        customStyles.cumulativePBACContainer,
                        {flex: 1, marginRight: 20},
                      ]}>
                      <CustomText
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          fontFamily: 'FiraSans-Light',
                        }}>
                        Cumulated PBAC
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: 'FiraSans-Light',
                          textAlign: 'right',
                        }}>
                        24
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          fontFamily: 'FiraSans-Light',
                        }}>
                        Number of products
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: 'FiraSans-Light',
                          textAlign: 'right',
                        }}>
                        5
                      </CustomText>
                    </View>
                    <View
                      style={[customStyles.cumulativePBACContainer, {flex: 1}]}>
                      <CustomText
                        style={{fontSize: 14, fontFamily: 'FiraSans-Light'}}>
                        A score of 24 is not alarming. Menstrual loss is less
                        than 80mL. Keep updating the products you use to
                        maintain a relevant analysis!
                      </CustomText>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  {cycleEnded ? (
                    <>
                      <LinearGradient
                        colors={['#f87e9a', '#f8b5c3']}
                        useAngle={true}
                        angle={140}
                        style={{
                          ...styles.button,
                          ...customStyles.cycleInfoContainer,
                        }}>
                        <CustomText
                          style={{
                            color: colors.white,
                            fontSize: 22,
                            ...styles.bold,
                          }}>
                          Your next cycle is due in 23 days
                        </CustomText>
                        <CustomText
                          style={{
                            color: colors.white,
                            fontSize: 14,
                            fontFamily: 'FiraSans-Light',
                          }}>
                          You may notice increased energy and a generally
                          uplifted mood as your body prepares for ovulation.
                        </CustomText>
                      </LinearGradient>
                      <View style={{width: '100%'}}>
                        <CustomText style={{textAlign: 'center'}}>
                          Don't forget to answer the{' '}
                          <CustomText style={styles.highlight}>
                            SAMANTA questionnaire
                          </CustomText>{' '}
                          after the end of your period.
                        </CustomText>
                        <CustomText
                          style={{
                            textAlign: 'center',
                            fontFamily: 'FiraSans-Light',
                          }}>
                          It is very important to get accurate results !
                        </CustomText>

                        <Pressable
                          style={{width: '100%', marginTop: 10}}
                          onPress={() =>
                            navigation.navigate('QuestionnaireSamanta0')
                          }>
                          <LinearGradient
                            colors={['#fb1121', '#ff8d97']}
                            style={{
                              ...styles.button,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <CustomText
                              style={{color: colors.white, fontSize: 40}}>
                              !!
                            </CustomText>
                            <View style={{display: 'flex'}}>
                              <CustomText style={{color: colors.white}}>
                                Fill in the post-cycle questionnaire
                              </CustomText>
                              <CustomText
                                style={{color: colors.white, fontSize: 12}}>
                                3 days left
                              </CustomText>
                            </View>

                            <Svg
                              style={{alignSelf: 'flex-end'}}
                              fill="none"
                              stroke={colors.white}
                              height="40"
                              width="40"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeWidth="1.5">
                              <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                            </Svg>
                          </LinearGradient>
                        </Pressable>
                      </View>
                      <Pressable
                        style={{
                          ...styles.button,
                          backgroundColor: colors.white,
                          borderColor: colors.primary,
                          borderWidth: 3,
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => navigation.navigate('Stats')}>
                        <Svg
                          fill="none"
                          stroke="none"
                          height="40"
                          width="40"
                          viewBox="0 0 24 24"
                        />
                        <CustomText style={{color: colors.primary}}>
                          View cycle stats
                        </CustomText>
                        <Svg
                          style={{alignSelf: 'flex-end'}}
                          fill="none"
                          stroke={colors.primary}
                          height="40"
                          width="40"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeWidth="1.5">
                          <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                        </Svg>
                      </Pressable>
                    </>
                  ) : (
                    <LinearGradient
                      colors={['#fa7091', '#faa8ba']}
                      useAngle={true}
                      angle={140}
                      style={{
                        ...styles.button,
                        ...customStyles.cycleInfoContainer,
                      }}>
                      <CustomText
                        style={{
                          color: colors.white,
                          fontSize: 22,
                          ...styles.bold,
                        }}>
                        Your next cycle is due in 3 days
                      </CustomText>
                      <CustomText
                        style={{
                          color: colors.white,
                          fontSize: 14,
                          fontFamily: 'FiraSans-Light',
                          marginTop: 10,
                        }}>
                        You may experience premenstrual symptoms such as cramps,
                        fatigue, mood swings, breast tenderness, and water
                        retention.
                      </CustomText>
                    </LinearGradient>
                  )}

                  {cycleEnded || (
                    <>
                      <View style={{width: '100%'}}>
                        <CustomText style={{textAlign: 'center'}}>
                          Track your{' '}
                          <CustomText style={styles.highlight}>
                            cycles
                          </CustomText>{' '}
                          and the{' '}
                          <CustomText style={styles.highlight}>
                            intensity
                          </CustomText>{' '}
                          of your periods.
                        </CustomText>

                        <Pressable
                          style={{
                            ...styles.button,
                            backgroundColor: colors.primary,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}
                          onPress={() => startCycle()}>
                          <Svg
                            fill="none"
                            stroke="none"
                            height="40"
                            width="40"
                            viewBox="0 0 24 24"
                          />
                          <CustomText style={{color: colors.white}}>
                            My cycle has started
                          </CustomText>
                          <Svg
                            style={{alignSelf: 'flex-end'}}
                            fill="none"
                            stroke={colors.white}
                            height="40"
                            width="40"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeWidth="1.5">
                            <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                          </Svg>
                        </Pressable>
                      </View>

                      <Pressable
                        style={{
                          ...styles.button,
                          backgroundColor: colors.white,
                          borderColor: colors.primary,
                          borderWidth: 3,
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => navigation.navigate('Stats')}>
                        <Svg
                          fill="none"
                          stroke="none"
                          height="40"
                          width="40"
                          viewBox="0 0 24 24"
                        />
                        <CustomText style={{color: colors.primary}}>
                          View cycle stats
                        </CustomText>
                        <Svg
                          style={{alignSelf: 'flex-end'}}
                          fill="none"
                          stroke={colors.primary}
                          height="40"
                          width="40"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeWidth="1.5">
                          <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                        </Svg>
                      </Pressable>
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default ProfileScreen;
