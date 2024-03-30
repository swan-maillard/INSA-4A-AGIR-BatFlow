import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import Svg, {Path} from 'react-native-svg';
import Header from '../components/Header';
import questionsSamanta from '../content/QuestionsSamanta.ts';
import NavigationBar from '../components/NavigationBar.tsx';
import {DataContext} from '../context/DataContext.tsx';

const QuestionnaireSamanta = ({route, navigation}: any) => {
  const {questionIndex, answers} = route.params;
  const question = questionsSamanta[questionIndex];

  const data = useContext(DataContext);

  const [_, setAnswersSamanta] = useState<boolean[][]>([]);

  const [answer, setAnswer] = useState<boolean | null>(null);

  const retrieveData = useCallback(() => {
    setAnswersSamanta(data.getAnswersSamanta());
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  const handleYes = () => setAnswer(true);
  const handleNo = () => setAnswer(false);

  const saveAnswers = useCallback(
    (allAnswers: boolean[]) => {
      data.addAnswersSamanta(allAnswers);
      console.log(
        'Submitted Answers:',
        data.getAnswersSamanta()[data.getAnswersSamanta().length - 1],
      );
      const s = allAnswers.map(val => (val ? 1 : 0));
      const score = s[0] * 3 + s[1] + s[2] * 3 + s[3] + s[4] + s[5];

      data.setScoreSamanta(score);

      console.log('Score', data.getUserData('scoresSamanta', 0));
      console.log('Average', data.getUserData('averageSamanta', 0));

      navigation.navigate('Overview');
    },
    [data, navigation],
  );

  useEffect(() => {
    if (answer !== null) {
      // Check if it's the last question
      if (questionIndex === questionsSamanta.length - 1) {
        saveAnswers([...answers, answer] as boolean[]);
      } else {
        // If it's not the last question, navigate to the next question
        navigation.push(`QuestionnaireSamanta${questionIndex + 1}`, {
          answers: [...answers, answer], // Add the current answer to the answers array
        });
      }
    }
  }, [answer, answers, navigation, questionIndex, saveAnswers]);

  const progressSvgPath = (i: number) => {
    if (i < questionIndex) {
      return 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z';
    } else if (i === questionIndex) {
      return 'M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z';
    } else {
      return 'M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z';
    }
  };

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
      gap: 50,
    },
    actions: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '90%',
      height: '85%',
      gap: 50,
    },
    questionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 30,
      flexGrow: 1,
      justifyContent: 'center',
      paddingBottom: 100,
      width: '100%',
    },
    answers: {
      display: 'flex',
      flexDirection: 'row',
      gap: 30,
      width: '100%',
      justifyContent: 'center',
    },
    answer: {
      borderRadius: 50,
      color: 'white',
      width: 80,
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    },
    line: {
      width: '100%',
      backgroundColor: colors.primary,
      height: 2,
      position: 'absolute',
    },
    step: {
      width: 16,
      height: 16,
      backgroundColor: colors.white,
      zIndex: 1,
    },
  });

  return (
    <View style={styles.body}>
      <View style={styles.mainContainer}>
        <Header />
        <TopWave />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{width: '100%'}}>
          <View style={customStyles.container}>
            <CustomText
              style={{
                color: colors.primary,
                fontFamily: 'FiraSans-Bold',
                fontSize: 22,
              }}>
              End of cycle - CHECKUP
            </CustomText>
            <View style={customStyles.actions}>
              <View style={customStyles.questionsContainer}>
                <CustomText style={{textAlign: 'center', fontSize: 20}}>
                  {question}
                </CustomText>
                <View style={customStyles.answers}>
                  <Pressable
                    onPress={handleYes}
                    style={{
                      ...customStyles.answer,
                      backgroundColor: colors.primary,
                    }}>
                    <CustomText style={{color: 'white'}}>YES</CustomText>
                  </Pressable>
                  <Pressable
                    onPress={handleNo}
                    style={{
                      ...customStyles.answer,
                      backgroundColor: colors.black,
                    }}>
                    <CustomText style={{color: 'white'}}>NO</CustomText>
                  </Pressable>
                </View>
              </View>
              <View style={customStyles.progressBar}>
                <View style={customStyles.line} />
                {[...Array(6)].map((x, i) => (
                  <Svg
                    key={'step' + i}
                    fill={colors.primary}
                    style={customStyles.step}
                    viewBox="0 0 512 512">
                    <Path d={progressSvgPath(i)} />
                  </Svg>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <NavigationBar />
      </View>
    </View>
  );
};

export default QuestionnaireSamanta;
