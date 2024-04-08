import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { DataContext } from '../context/DataContext.tsx';
import Svg, { Path } from 'react-native-svg';
import AppCalendar from '../components/AppCalendar.tsx';

const StatsScreen = ({ navigation }: any) => {
  const data = useContext(DataContext);

  const [currentUser, setCurrentUser] = useState('');
  const [cycles, setCycles] = useState<string[][]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [gapDuration, setGapDuration] = useState<number>(0);
  const [scorePBAC, setScorePBAC] = useState<number>(0);
  const [scoreSamanta, setScoreSamanta] = useState<number>(0);

  const retrieveData = useCallback(() => {
    setCurrentUser(data.getUser);
    setCycles(data.getCycles());
    setDuration(data.getUserData('averageDuration', 0));
    setGapDuration(data.getUserData('averageGapDuration', 28));
    setScorePBAC(data.getUserData('averagePBAC', 0));
    setScoreSamanta(data.getUserData('averageSamanta', 0));
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  const hasStats = useMemo(() => cycles.length > 0 && cycles[0].length === 2, [cycles]);
  const isHealthy = useMemo(() => scorePBAC < 150 && scoreSamanta < 3, [scorePBAC, scoreSamanta]);

  // Fonction pour transformer des périodes (tableaux avec date de début et date de fin)
  // en markedDates (https://github.com/wix/react-native-calendars?tab=readme-ov-file#customize-the-appearance-of-the-calendar)
  const computeCalendarDates = useMemo(() => {
    const periods = cycles.map(([start, end]) => [new Date(start), new Date(end)]);

    const markedDates: { [key: string]: any } = {};

    // Pour chaque cycle défini par sa date de début et de fin
    periods.forEach(([start, end], index) => {
      // On parcourt tous les jours sur cette période
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const formattedDate = date.toISOString().split('T')[0];

        markedDates[formattedDate] = {
          period: true,
          onPress: () => navigation.navigate('Overview', { index }),
        };
      }
    });

    if (cycles.length > 0) {
      const lastCycle = cycles[cycles.length - 1];

      if (lastCycle.length === 2) {
        let periodDate = new Date(lastCycle[1]);

        for (let i = 0; i < 5; ++i) {
          let ovulationDate = new Date(periodDate);
          periodDate.setDate(periodDate.getDate() + Math.floor(gapDuration));
          ovulationDate.setDate(ovulationDate.getDate() + Math.round(gapDuration / 2) - 3);

          for (let j = 0; j < Math.ceil(duration); ++j) {
            const formattedDate = periodDate.toISOString().split('T')[0];
            markedDates[formattedDate] = {
              period: true,
            };
            periodDate.setDate(periodDate.getDate() + 1);
          }

          for (let j = 0; j < 5; ++j) {
            const formattedDate = ovulationDate.toISOString().split('T')[0];

            markedDates[formattedDate] = {
              ovulation: true,
            };

            if (j === 3) {
              markedDates[formattedDate] = {
                optimalOvulation: true,
              };
            }

            ovulationDate.setDate(ovulationDate.getDate() + 1);
          }
        }
      }
    }

    return markedDates;
  }, [cycles]);

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
      gap: 10,
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
              <View>
                <CustomText style={{ textAlign: 'center' }}>
                  Ever wondered about the connection between your{' '}
                  <CustomText style={styles.highlight}>period</CustomText> and your{' '}
                  <CustomText style={styles.highlight}>health</CustomText>?
                </CustomText>
                <CustomText
                  style={{
                    textAlign: 'center',
                    fontFamily: 'FiraSans-Light',
                  }}
                >
                  Let's explore the answers together, <CustomText style={styles.highlight}>{currentUser}</CustomText>!
                </CustomText>
              </View>
              <LinearGradient
                colors={['#fa7091', '#faa8ba']}
                useAngle={true}
                angle={140}
                style={{
                  ...styles.periodDurationContainer,
                  flexDirection: 'row',
                  gap: 20,
                  alignItems: 'center',
                }}
              >
                <Image source={require('./../assets/blood.png')} style={{ width: 30, height: 44 }} />
                {hasStats ? (
                  <View>
                    <CustomText style={styles.textDurationStat}>Your period usually lasts...</CustomText>
                    <CustomText style={styles.durationStat}>{duration} days</CustomText>
                  </View>
                ) : (
                  <View>
                    <CustomText style={styles.textDurationStat}>You didn't start tracking your periods!</CustomText>
                  </View>
                )}
              </LinearGradient>
              {hasStats ? (
                <>
                  <View style={styles.statsContainer}>
                    <>
                      <View style={styles.scoreContainer}>
                        <CustomText style={styles.descriptionStat}>Your average PBAC score is</CustomText>
                        <CustomText
                          style={{
                            ...styles.bold,
                            fontSize: 25,
                            textAlign: 'center',
                            color: scorePBAC < 150 ? colors.green : colors.primary,
                          }}
                        >
                          {scorePBAC}
                        </CustomText>
                      </View>
                      <View style={styles.scoreContainer}>
                        <CustomText style={styles.descriptionStat}>Your average SAMANTA score is</CustomText>
                        <CustomText
                          style={{
                            ...styles.bold,
                            fontSize: 25,
                            textAlign: 'center',
                            color: scoreSamanta < 3 ? colors.green : colors.primary,
                          }}
                        >
                          {scoreSamanta}
                        </CustomText>
                      </View>
                    </>
                  </View>
                  <View style={{ gap: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                      {isHealthy && (
                        <Image source={require('./../assets/fertility.png')} style={{ width: 30, height: 30 }} />
                      )}
                      <CustomText
                        style={{
                          ...styles.bold,
                          color: isHealthy ? colors.green : colors.primary,
                          fontSize: 20,
                          textAlign: 'center',
                        }}
                      >
                        {isHealthy
                          ? 'Your periods look perfectly healthy!'
                          : 'You might suffer from Heavy Menstrual Bleeding. Please seek medical advice.'}
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    style={{
                      textAlign: 'center',
                      fontFamily: 'FiraSans-Medium',
                      paddingTop: 10,
                    }}
                  >
                    Check the calendar of your menstrual cycles
                  </CustomText>
                  <AppCalendar
                    markedDates={computeCalendarDates}
                    selectedDate={new Date().toLocaleString('en-CA')}
                    options={{
                      disabledByDefault: true,
                    }}
                  />
                </>
              ) : (
                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: colors.primary,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}
                  onPress={() => navigation.navigate('Profile')}
                >
                  <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24" />
                  <CustomText
                    style={{
                      color: colors.white,
                    }}
                  >
                    Start now
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
              )}
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default StatsScreen;
