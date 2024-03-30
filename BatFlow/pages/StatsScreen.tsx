import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import {Calendar} from 'react-native-calendars';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {DataContext} from '../context/DataContext.tsx';

const StatsScreen = ({navigation}: any) => {
  const data = useContext(DataContext);

  const [currentUser, setCurrentUser] = useState('');
  const [cycles, setCycles] = useState<string[][]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [scorePBAC, setScorePBAC] = useState<number | null>(null);
  const [scoreSamanta, setScoreSamanta] = useState<number | null>(null);

  const retrieveData = useCallback(() => {
    setCurrentUser(data.getUser);
    setCycles(data.getCycles());
    setDuration(data.getUserData('averageDuration', null));
    setScorePBAC(data.getUserData('averagePBAC', 0));
    setScoreSamanta(data.getUserData('averageSamanta', 0));
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  // Fonction pour transformer des périodes (tableaux avec date de début et date de fin)
  // en markedDates (https://github.com/wix/react-native-calendars?tab=readme-ov-file#customize-the-appearance-of-the-calendar)
  function transformPeriodsToMarkedDates(periods: string[][] | Date[][]) {
    // TODO: à enlever en production
    // Faux cycles pour les tests
    const fakePeriods = [
      [new Date('2024-02-10'), new Date('2024-02-15')],
      [new Date('2024-03-12'), new Date('2024-03-17')],
    ];

    periods = periods.map(([start, end]) => [new Date(start), new Date(end)]);
    // On rajoute les faux cycles à la liste de cycles
    periods = [...fakePeriods, ...periods];

    const markedDates: {[key: string]: any} = {};

    // Pour chaque cycle défini par sa date de début et de fin
    periods.forEach(([start, end]) => {
      // On parcourt tous les jours sur cette période
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split('T')[0];

        // Il y a différents cas d'affichage
        if (
          date.getTime() === start.getTime() &&
          date.getTime() === end.getTime()
        ) {
          markedDates[formattedDate] = {
            selected: true,
            startingDay: true,
            endingDay: true,
            color: colors.secondary,
            disableTouchEvent: true,
          };
        } else if (date.getTime() === start.getTime()) {
          // S'il s'agit du premier jour du cycle
          markedDates[formattedDate] = {
            selected: true,
            startingDay: true,
            color: colors.secondary,
            disableTouchEvent: true,
          };
        } else if (date.getTime() === end.getTime()) {
          // // S'il s'agit du dernier jour du cycle
          markedDates[formattedDate] = {
            selected: true,
            endingDay: true,
            color: colors.secondary,
            disableTouchEvent: true,
          };
        } else {
          // Sinon il s'agit d'un jour au milieu
          markedDates[formattedDate] = {
            selected: true,
            color: colors.secondary,
            disableTouchEvent: true,
          };
        }
      }
    });

    return markedDates;
  }

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
        <ScrollView style={{width: '100%'}}>
          <View style={customStyles.container}>
            <View style={customStyles.actions}>
              <View>
                <CustomText style={{textAlign: 'center'}}>
                  Ever wondered about the connection between your{' '}
                  <CustomText style={styles.highlight}>period</CustomText> and
                  your <CustomText style={styles.highlight}>health</CustomText>?
                </CustomText>
                <CustomText
                  style={{textAlign: 'center', fontFamily: 'FiraSans-Light'}}>
                  Let's explore the answers together,{' '}
                  <CustomText style={styles.highlight}>
                    {currentUser}
                  </CustomText>
                  !
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
                }}>
                <Image
                  source={require('./../assets/blood.png')}
                  style={{width: 30, height: 44}}
                />
                {duration ? (
                  <View>
                    <CustomText style={styles.textDurationStat}>
                      Your period usually lasts...
                    </CustomText>
                    <CustomText style={styles.durationStat}>
                      {duration} days
                    </CustomText>
                  </View>
                ) : (
                  <View>
                    <CustomText style={styles.textDurationStat}>
                      You didn't track your periods yet!
                    </CustomText>
                  </View>
                )}
              </LinearGradient>
              {duration && (
                <View style={styles.statsContainer}>
                  <>
                    <View style={styles.scoreContainer}>
                      <CustomText style={styles.descriptionStat}>
                        Your average PBAC score is
                      </CustomText>
                      <CustomText
                        style={{
                          ...styles.bold,
                          fontSize: 25,
                          textAlign: 'center',
                        }}>
                        {scorePBAC}
                      </CustomText>
                    </View>
                    <View style={styles.scoreContainer}>
                      <CustomText style={styles.descriptionStat}>
                        Your average SAMANTA score is
                      </CustomText>
                      <CustomText
                        style={{
                          ...styles.bold,
                          fontSize: 25,
                          textAlign: 'center',
                        }}>
                        {scoreSamanta}
                      </CustomText>
                    </View>
                  </>
                </View>
              )}

              <CustomText
                style={{
                  textAlign: 'center',
                  fontFamily: 'FiraSans-Medium',
                  paddingTop: 10,
                }}>
                Check the calendar of your menstrual cycles
              </CustomText>
              <Calendar
                onDayPress={() => navigation.navigate('Overview')}
                maxDate={new Date().toLocaleDateString('en-CA')}
                markingType={'period'}
                markedDates={{
                  ...transformPeriodsToMarkedDates(cycles),
                }}
                style={{
                  width: '100%',
                }}
                theme={{
                  backgroundColor: colors.white,
                  calendarBackground: colors.white,
                  textSectionTitleColor: colors.primary,
                  selectedDayBackgroundColor: colors.primary,
                  selectedDayTextColor: colors.white,
                  todayTextColor: colors.primary,
                  dayTextColor: colors.black,
                  textDisabledColor: 'gray',
                  dotColor: colors.primary,
                  selectedDotColor: colors.white,
                  arrowColor: colors.primary,
                  disabledArrowColor: 'gray',
                  monthTextColor: colors.primary,
                  indicatorColor: colors.primary,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default StatsScreen;
