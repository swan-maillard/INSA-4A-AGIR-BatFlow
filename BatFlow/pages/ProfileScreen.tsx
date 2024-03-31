import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import NavigationBar from '../components/NavigationBar';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { AnswersPBAC, DataContext } from '../context/DataContext.tsx';

// Page profil de l'utilisateur
const ProfileScreen = ({ navigation }: any) => {
  const data = useContext(DataContext);
  const [cycles, setCycles] = useState<string[][]>([]);
  const [lastCycle, setLastCycle] = useState<string[]>([]);
  const [answersPBAC, setAnswersPBAC] = useState<AnswersPBAC[][]>([]);
  const [scoresSamanta, setScoresSamanta] = useState<number[]>([]);

  const retrieveData = useCallback(() => {
    setCycles([...data.getCycles()]);
    setAnswersPBAC([...data.getAnswersPBAC()]);
    setLastCycle(data.getLastCycle());
    setScoresSamanta([...data.getUserData('scoresSamanta', [])]);
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  const numberProtections = useMemo(() => {
    if (answersPBAC.length === 0) {
      return 0;
    }
    return answersPBAC[answersPBAC.length - 1].length;
  }, [answersPBAC]);

  const waitingSamanta = useMemo(() => {
    return lastCycle.length === 2 && scoresSamanta.length < cycles.length;
  }, [lastCycle.length, scoresSamanta.length, cycles.length]);

  const noDataOnCycle = useMemo(() => lastCycle.length === 0, [lastCycle.length]);
  const noCurrentCycle = useMemo(() => lastCycle.length === 2, [lastCycle.length]);
  const isCurrentCycle = useMemo(() => lastCycle.length === 1, [lastCycle.length]);

  const daysBeforeNextCycle = useMemo(() => {
    if (noDataOnCycle) return 0;

    const lastEndDate = new Date(lastCycle[1] || new Date());
    const today = new Date();
    const diff = Math.floor((today.getTime() - lastEndDate.getTime()) / (1000 * 3600 * 24));
    const gapDuration = data.getUserData<number>('averageGapDuration', 28);

    return gapDuration - diff;
  }, [data, lastCycle, noDataOnCycle]);

  // L'utilisateur termine son cycle en cours
  const endCycle = () => {
    data.endCycle(new Date());
    retrieveData();
  };

  const startCycle = () => {
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
        <ScrollView style={{ width: '100%' }}>
          <View style={customStyles.container}>
            <View style={customStyles.actions}>
              {isCurrentCycle && (
                <>
                  <LinearGradient
                    colors={['#fc0e46', '#fd6085']}
                    useAngle={true}
                    angle={140}
                    style={{
                      ...styles.button,
                      ...customStyles.cycleInfoContainer,
                    }}
                  >
                    <CustomText
                      style={{
                        color: colors.white,
                        fontSize: 22,
                        ...styles.bold,
                      }}
                    >
                      Your cycle has started on the{' '}
                      {new Date(lastCycle[0]).toLocaleDateString('en-us', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </CustomText>
                    <CustomText
                      style={{
                        color: colors.white,
                        fontSize: 14,
                        fontFamily: 'FiraSans-Light',
                      }}
                    >
                      Your period still likely is heavy, and you may have cramps or stomach pain.
                    </CustomText>
                  </LinearGradient>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                    }}
                  >
                    <LinearGradient
                      colors={['#fa7091', '#faa8ba']}
                      useAngle={true}
                      angle={140}
                      style={{
                        ...styles.periodDurationContainer,
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        width: '80%',
                      }}
                    >
                      <View>
                        <CustomText style={{ ...styles.durationStat, fontSize: 22 }}>
                          {numberProtections} protection(s) used
                        </CustomText>
                      </View>
                    </LinearGradient>
                    <Image source={require('./../assets/towel.png')} style={{ width: 50, height: 50 }} />
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
                    onPress={() => navigation.navigate('AddSanitoryProduct')}
                  >
                    <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24" />
                    <CustomText style={{ color: colors.primary }}>Add a sanitory product used</CustomText>
                    <Svg
                      style={{ alignSelf: 'flex-end' }}
                      fill="none"
                      stroke={colors.primary}
                      height="40"
                      width="40"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    >
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
                    onPress={() => endCycle()}
                  >
                    <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24" />
                    <CustomText style={{ color: colors.white }}>My cycle has now ended</CustomText>
                    <Svg
                      style={{ alignSelf: 'flex-end' }}
                      fill="none"
                      stroke={colors.white}
                      height="40"
                      width="40"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    >
                      <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                    </Svg>
                  </Pressable>
                </>
              )}

              {noCurrentCycle && (
                <>
                  <LinearGradient
                    colors={
                      daysBeforeNextCycle < 7
                        ? daysBeforeNextCycle < 3
                          ? ['#fc0e46', '#fd6085'] // Lower than 3 days
                          : ['#fb4977', '#f892a7'] // Lower than 7 days
                        : ['#fa7091', '#faa8ba']
                    }
                    useAngle={true}
                    angle={140}
                    style={{
                      ...styles.button,
                      ...customStyles.cycleInfoContainer,
                    }}
                  >
                    <CustomText
                      style={{
                        color: colors.white,
                        fontSize: 22,
                        ...styles.bold,
                      }}
                    >
                      Your next cycle is due in {daysBeforeNextCycle} day{daysBeforeNextCycle !== 1 && 's'}
                    </CustomText>
                    <CustomText
                      style={{
                        color: colors.white,
                        fontSize: 14,
                        fontFamily: 'FiraSans-Light',
                        marginTop: 10,
                      }}
                    >
                      You may experience premenstrual symptoms such as cramps, fatigue, mood swings, breast tenderness,
                      and water retention.
                    </CustomText>
                  </LinearGradient>
                  {waitingSamanta && (
                    <>
                      <View style={{ width: '100%' }}>
                        <CustomText
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          Don't forget to quickly answer the{' '}
                          <CustomText style={styles.highlight}>SAMANTA questionnaire</CustomText> after the end of your
                          period.
                        </CustomText>
                        <CustomText
                          style={{
                            textAlign: 'center',
                            fontFamily: 'FiraSans-Light',
                          }}
                        >
                          It is very important to get accurate results !
                        </CustomText>

                        <Pressable
                          style={{
                            width: '100%',
                            marginTop: 10,
                          }}
                          onPress={() => navigation.navigate('QuestionnaireSamanta0')}
                        >
                          <LinearGradient
                            colors={['#fb1121', '#ff8d97']}
                            style={{
                              ...styles.button,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <CustomText
                              style={{
                                color: colors.white,
                                fontSize: 40,
                              }}
                            >
                              !!
                            </CustomText>
                            <View
                              style={{
                                display: 'flex',
                              }}
                            >
                              <CustomText
                                style={{
                                  color: colors.white,
                                }}
                              >
                                Fill in the questionnaire
                              </CustomText>
                            </View>

                            <Svg
                              fill="none"
                              stroke={colors.white}
                              height="40"
                              width="40"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                            >
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
                        onPress={() => navigation.navigate('Stats')}
                      >
                        <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24" />
                        <CustomText
                          style={{
                            color: colors.primary,
                          }}
                        >
                          View cycle stats
                        </CustomText>
                        <Svg
                          style={{
                            alignSelf: 'flex-end',
                          }}
                          fill="none"
                          stroke={colors.primary}
                          height="40"
                          width="40"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                        >
                          <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                        </Svg>
                      </Pressable>
                    </>
                  )}
                </>
              )}

              {waitingSamanta || isCurrentCycle || (
                <>
                  <View style={{ width: '100%' }}>
                    <CustomText
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      Track your <CustomText style={styles.highlight}>cycles</CustomText> and the{' '}
                      <CustomText style={styles.highlight}>intensity</CustomText> of your periods.
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
                      onPress={() => startCycle()}
                    >
                      <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24" />
                      <CustomText
                        style={{
                          color: colors.white,
                        }}
                      >
                        My cycle has started
                      </CustomText>
                      <Svg
                        style={{
                          alignSelf: 'flex-end',
                        }}
                        fill="none"
                        stroke={colors.white}
                        height="40"
                        width="40"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                      >
                        <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                      </Svg>
                    </Pressable>
                  </View>

                  {noDataOnCycle || (
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
                      onPress={() => navigation.navigate('Stats')}
                    >
                      <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24" />
                      <CustomText
                        style={{
                          color: colors.primary,
                        }}
                      >
                        View cycle stats
                      </CustomText>
                      <Svg
                        style={{
                          alignSelf: 'flex-end',
                        }}
                        fill="none"
                        stroke={colors.primary}
                        height="40"
                        width="40"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                      >
                        <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002" />
                      </Svg>
                    </Pressable>
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
