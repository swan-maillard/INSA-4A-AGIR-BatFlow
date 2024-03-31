import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import NavigationBar from '../components/NavigationBar';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import { DataContext } from '../context/DataContext.tsx';
import AppCalendar from '../components/AppCalendar.tsx';

// Calendrier pour choisir les dates du cycle menstruel
const CalendarStartCycleScreen = ({ navigation }: any) => {
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
  const computeCalendarDates = useMemo(() => {
    const periods = cycles.map(([start, end]) => [new Date(start), new Date(end)]);

    const markedDates: { [key: string]: any } = {};

    // Pour chaque cycle défini par sa date de début et de fin
    periods.forEach(([start, end]) => {
      // On parcourt tous les jours sur cette période
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const formattedDate = date.toISOString().split('T')[0];

        markedDates[formattedDate] = {
          period: true,
        };
      }
    });

    return markedDates;
  }, [cycles]);

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
              <AppCalendar
                markedDates={computeCalendarDates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                options={{
                  maxDate: new Date().toLocaleDateString('en-CA'),
                }}
              />
              <View style={{ marginTop: 20, width: '100%' }}>
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

export default CalendarStartCycleScreen;
