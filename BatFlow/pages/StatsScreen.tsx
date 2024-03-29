import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave'
import CustomText from '../components/CustomText'
import {Calendar} from "react-native-calendars"
import {useStorage} from '../hooks/useStorage'
import Header from '../components/Header'
import NavigationBar from "../components/NavigationBar.tsx";
import LinearGradient from "react-native-linear-gradient";

const StatsScreen = ({navigation}: any) => {
     const [currentUser] = useStorage('AGIR@current-user', '')
     const [cycles, setCycles, refreshCycles] = useStorage('AGIR@cycles', {})
     const currentUserLC = currentUser.toLowerCase();

     let userCycles = cycles[currentUserLC] || []
     let lastCycle = userCycles.length > 0 ? userCycles[userCycles.length-1] : []

     useEffect(() => {
         const unsubscribe = navigation.addListener('focus', () => refreshCycles());
         return unsubscribe;
       }, [navigation]);

     useEffect(() => {
         userCycles = cycles[currentUserLC] || []
         lastCycle = userCycles.length > 0 ? userCycles[userCycles.length-1] : []
     }, [cycles]);


    function transformPeriodsToMarkedDates(periods) {

        const fakePeriods = [
            [new Date('2023-11-10'), new Date('2023-11-15')],
            [new Date('2023-10-12'), new Date('2023-10-17')]
        ];

        periods = [...fakePeriods, ...periods];

      const markedDates = {};

      periods.forEach(([startDate, endDate]) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Loop through the days in the period
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
          const formattedDate = date.toISOString().split('T')[0];

            if (date.getTime() === start.getTime() && date.getTime() === end.getTime()) {
                markedDates[formattedDate] = {
                    selected: true,
                    startingDay: true,
                    endingDay: true,
                    color: colors.secondary,
                    disableTouchEvent: true
                };
            } else if (date.getTime() === start.getTime()) {
            // If it's the starting day
            markedDates[formattedDate] = {
              selected: true,
              startingDay: true,
              color: colors.secondary,
              disableTouchEvent: true
            };
          } else if (date.getTime() === end.getTime()) {
            // If it's the ending day
            markedDates[formattedDate] = {
              selected: true,
              endingDay: true,
              color: colors.secondary,
              disableTouchEvent: true
            };
          } else {
            // If it's a middle day
            markedDates[formattedDate] = {
              selected: true,
              color: colors.secondary,
              disableTouchEvent: true
            };
          }
        }
      });

      return markedDates;
    }


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
            gap: 10
        }
      })

  return (
  <View style={styles.body}>
       <View style={styles.mainContainer}>
           <Header/>
           <TopWave/>
           <ScrollView style={{width: '100%'}}>
               <View style={customStyles.container}>
                   <View style={customStyles.actions}>
                       <View>
                           <CustomText style={{textAlign: "center"}}>Ever wondered about the connection between your <CustomText style={styles.highlight}>period</CustomText> and your <CustomText style={styles.highlight}>health</CustomText>?</CustomText>
                           <CustomText style={{textAlign: "center", fontFamily: "FiraSans-Light"}}>Let's explore the answers together, <CustomText style={styles.highlight}>{currentUser}</CustomText>!</CustomText>
                       </View>
                       <LinearGradient colors={['#fa7091', '#faa8ba']} useAngle={true} angle={140} style={{...styles.periodDurationContainer, flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                           <Image source={require('./../assets/blood.png')} style={{width: 30, height: 44}}/>
                           <View>
                               <CustomText style={styles.textDurationStat}>Your period usually lasts...</CustomText>
                               <CustomText style={styles.durationStat}>6 days</CustomText>
                           </View>
                       </LinearGradient>
                       <View style={styles.statsContainer}>
                           <>
                               <View style={styles.scoreContainer}>
                                   <CustomText style={styles.descriptionStat}>Your average PBAC score is</CustomText>
                                   <CustomText style={{...styles.bold, fontSize: 25, textAlign: 'center'}}>24</CustomText>
                               </View>
                               <View style={styles.scoreContainer}>
                                   <CustomText style={styles.descriptionStat}>Your average SAMANTA score is</CustomText>
                                   <CustomText style={{...styles.bold, fontSize: 25, textAlign: 'center'}}>0</CustomText>
                               </View>
                           </>
                       </View>

                       <CustomText style={{textAlign: "center", fontFamily: "FiraSans-Medium", paddingTop: 10}}>Check the calendar of your menstrual cycles</CustomText>
                       <Calendar
                           onDayPress={() => navigation.navigate("Overview")}
                           maxDate={new Date().toLocaleDateString('en-CA')}
                           markingType={'period'}
                           markedDates={{
                               ...transformPeriodsToMarkedDates(userCycles)
                           }}
                           style={{
                               width: "100%"
                           }}
                           theme={{
                               backgroundColor: colors.white,
                               calendarBackground: colors.white,
                               textSectionTitleColor: colors.primary,
                               selectedDayBackgroundColor: colors.primary,
                               selectedDayTextColor: colors.white,
                               todayTextColor: colors.primary,
                               dayTextColor: colors.black,
                               textDisabledColor: "gray",
                               dotColor: colors.primary,
                               selectedDotColor: colors.white,
                               arrowColor: colors.primary,
                               disabledArrowColor: "gray",
                               monthTextColor: colors.primary,
                               indicatorColor: colors.primary
                           }}
                       />
                   </View>
               </View>
           </ScrollView>
           <NavigationBar/>
      </View>
</View>

  );
};

export default StatsScreen;
