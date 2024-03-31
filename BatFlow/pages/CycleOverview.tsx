import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar.tsx';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { AnswersPBAC, DataContext } from '../context/DataContext.tsx';

const StatsScreen = ({ navigation }: any) => {
  const data = useContext(DataContext);
  const [lastCycle, setLastCycle] = useState<string[]>([]);
  const [answersPBAC, setAnswersPBAC] = useState<AnswersPBAC[]>([]);
  const [scorePBAC, setScorePBAC] = useState(0);
  const [scoreSamanta, setScoreSamanta] = useState(0);

  const retrieveData = useCallback(() => {
    setLastCycle(data.getLastCycle());
    setAnswersPBAC(data.getAnswersPBAC());
    setScorePBAC(data.getUserData('scoresPBAC', [0])[data.getUserData('scoresPBAC', [0]).length - 1]);
    setScoreSamanta(data.getUserData('scoresSamanta', [0])[data.getUserData('scoresSamanta', [0]).length - 1]);
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  const duration = useMemo(() => {
    if (lastCycle.length !== 2) {
      return 0;
    }
    const start = new Date(lastCycle[0]);
    const end = new Date(lastCycle[1]);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  }, [lastCycle]);

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
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Pressable onPress={() => navigation.navigate('Stats')}>
                  <Svg viewBox="0 0 192 512" height="50" width="50" fill={colors.primary}>
                    <Path d="m192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142l-128.662-128.662c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z" />
                  </Svg>
                </Pressable>

                <View>
                  <CustomText
                    style={{
                      color: colors.primary,
                      ...styles.bold,
                      fontSize: 25,
                    }}
                  >
                    Cycle Overview
                  </CustomText>
                  <CustomText>May 3rd 2023 - May 8th 2023</CustomText>
                </View>
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
                <View>
                  <CustomText style={styles.textDurationStat}>Your period lasted...</CustomText>
                  <CustomText style={styles.durationStat}>{duration} days</CustomText>
                </View>
              </LinearGradient>
              <View style={styles.statsContainer}>
                <>
                  <View style={styles.scoreContainer}>
                    <CustomText style={styles.descriptionStat}>
                      Cumulated PBAC : {scorePBAC} Number of products : {answersPBAC.length}
                    </CustomText>
                  </View>
                  <View style={styles.scoreContainer}>
                    <CustomText style={styles.descriptionStat}>
                      A score of {scorePBAC} may be a little bit high. (Write a little text based on the documentation)
                    </CustomText>
                  </View>
                </>
              </View>
              <View style={styles.samanthaStatsContainer}>
                <>
                  <View style={styles.samanthaScoreContainer}>
                    <CustomText style={styles.samanthaDescriptionStat}>
                      SAMANTA Score :{'\n'}
                      <CustomText style={styles.scoreValue}> {scoreSamanta}</CustomText>{' '}
                    </CustomText>
                  </View>
                  <View style={styles.samanthaScoreContainer}>
                    <CustomText style={styles.samanthaDescriptionStat}>
                      A score of 24 means... (Write a little text based on the documentation)
                    </CustomText>
                  </View>
                </>
              </View>
              <CustomText
                style={{
                  textAlign: 'center',
                  fontFamily: 'FiraSans-Medium',
                }}
              >
                This is your 4th highest PBAC Score.
                {'\n'}
                This is your 6th highest Samantha Score.
              </CustomText>
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default StatsScreen;
