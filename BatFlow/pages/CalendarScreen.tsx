import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import NavigationBar from '../components/NavigationBar';
import CustomText from '../components/CustomText';
import { Calendar } from 'react-native-calendars';
import Header from '../components/Header';
import { DataContext } from '../context/DataContext.tsx';

// Calendrier pour choisir les dates du cycle menstruel
const CalendarScreen = ({ navigation }: any) => {
  const data = useContext(DataContext);
  // Date selectionnée (par défaut la date actuelle)
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

  const [cycles, setCycles] = useState<string[][]>([]);
  const [lastCycle, setLastCycle] = useState<string[]>([]);

  const retrieveData = useCallback(() => {
    setCycles(data.getCycles());
    setLastCycle(data.getLastCycle());
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  // Si le dernier cycle est commencé mais pas terminé, on redirige l'utilisateur vers sa page profil
  if (lastCycle.length === 1) {
    navigation.navigate('Profile');
  }

  // Quand l'utilisateur confirme la date de début de cycle, on lui rajoute un nouveau cycle
  // et on le redirige à sa page profil
  const confirmDate = () => {
    data.startCycle(new Date(selectedDate));
    navigation.navigate('Profile');
  };

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

    const markedDates: { [key: string]: any } = {};

    // Pour chaque cycle défini par sa date de début et de fin
    periods.forEach(([start, end]) => {
      // On parcourt tous les jours sur cette période
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const formattedDate = date.toISOString().split('T')[0];

        // Il y a différents cas d'affichage
        if (date.getTime() === start.getTime() && date.getTime() === end.getTime()) {
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

  // Style custom du calendrier
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

  // Structure de la page
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
                  When did your period <CustomText style={styles.highlight}>first appear</CustomText> this month?
                </CustomText>
              </View>
              <Calendar
                value={selectedDate}
                onDayPress={(day) => setSelectedDate(day.dateString as any)}
                maxDate={new Date().toLocaleDateString('en-CA')}
                markingType={'period'}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    startingDay: true,
                    endingDay: true,
                    color: colors.primary,
                  },
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
              <View style={{ marginTop: 20, width: '100%' }}>
                <CustomText
                  style={{
                    ...styles.highlight,
                    textAlign: 'center',
                  }}
                >
                  {new Date(selectedDate).toDateString()}
                </CustomText>
                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: colors.primary,
                    width: '100%',
                  }}
                  onPress={() => confirmDate()}
                >
                  <CustomText style={{ color: colors.white }}>Confirm</CustomText>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default CalendarScreen;
