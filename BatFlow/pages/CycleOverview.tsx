import React, {useEffect} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Touchable, View} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave'
import CustomText from '../components/CustomText'
import {useStorage} from '../hooks/useStorage'
import Header from '../components/Header'
import NavigationBar from "../components/NavigationBar.tsx";
import Svg, {Path} from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";

const StatsScreen = ({navigation}: any) => {
     const [currentUser] = useStorage('AGIR@current-user', '') as [string]
     const [cycles, setCycles, refreshCycles] = useStorage('AGIR@cycles', {})
     const currentUserLC = currentUser.toLowerCase();

     let userCycles = cycles[currentUserLC] || []
     let lastCycle = userCycles.length > 0 ? userCycles[userCycles.length-1] : []
     if (lastCycle.length === 1) navigation.navigate('Profile')

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

          if (date.getTime() === start.getTime()) {
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
                    <View style={{alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <Pressable onPress={() => navigation.navigate('Stats')}>
                            <Svg viewBox="0 0 192 512" height="50" width="50" fill={colors.primary}>
                                <Path d="m192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142l-128.662-128.662c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"/>
                            </Svg>
                        </Pressable>

                        <View>
                            <CustomText style={{color: colors.primary, ...styles.bold, fontSize: 25}}>Cycle Overview</CustomText>
                            <CustomText>May 3rd 2023 - May 8th 2023</CustomText>
                        </View>

                    </View>
                    <LinearGradient colors={['#fa7091', '#faa8ba']} useAngle={true} angle={140} style={{...styles.periodDurationContainer, flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                        <Image source={require('./../assets/blood.png')} style={{width: 30, height: 44}}/>
                        <View>
                            <CustomText style={styles.textDurationStat}>Your period lasted...</CustomText>
                            <CustomText style={styles.durationStat}>6 days</CustomText>
                        </View>
                    </LinearGradient>
                    <View style={styles.statsContainer}>
                        <>
                            <View style={styles.scoreContainer}>
                                <CustomText style={styles.descriptionStat}>Cumulated PBAC : 90 Number of products : 15</CustomText>
                            </View>
                            <View style={styles.scoreContainer}>
                                <CustomText style={styles.descriptionStat}>A score of 90 may be a little bit high. (Write a little text based on the documentation)</CustomText>
                            </View>
                            </>
                    </View>
                    <View style={styles.samanthaStatsContainer}>
                                            <>
                            <View style={styles.samanthaScoreContainer}>
                                <CustomText style={styles.samanthaDescriptionStat}>SAMANTA Score :{`\n`}

                                 <CustomText style={styles.scoreValue}> 24</CustomText> </CustomText>
                            </View>
                            <View style={styles.samanthaScoreContainer}>
                                <CustomText style={styles.samanthaDescriptionStat}>A score of 24 means... (Write a little text based on the documentation)</CustomText>
                            </View>
                            </>
                    </View>
                    <CustomText style={{textAlign: "center", fontFamily: "FiraSans-Medium"}}>This is your 4th highest PBAC Score.
                    {`\n`}
                    This is your 6th highest Samantha Score.</CustomText>
                </View>
              </View>
            </ScrollView>
          <NavigationBar/>
      </View>
    </View>

  );
};

export default StatsScreen;
