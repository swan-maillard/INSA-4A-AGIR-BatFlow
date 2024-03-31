import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import styles, { colors } from './Styles';
import TopWave from '../components/TopWave';
import CustomText from '../components/CustomText';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar.tsx';
import { AnswersPBAC, DataContext } from '../context/DataContext.tsx';

const QuestionnairePBAC = ({ route, navigation }: any) => {
  const { questionIndex, answers } = route.params;

  const data = useContext(DataContext);

  const [_, setAnswersPBAC] = useState<AnswersPBAC[]>([]);

  const [answer, setAnswer] = useState<string | null>(null);

  const retrieveData = useCallback(() => {
    setAnswersPBAC(data.getAnswersPBAC());
  }, [data]);

  useEffect(() => retrieveData, [retrieveData]);
  navigation.addListener('focus', () => retrieveData());

  const handlePad = () => setAnswer('pad');
  const handleTampon = () => setAnswer('tampon');
  const handleLow = () => setAnswer('low');
  const handleHigh = () => setAnswer('high');
  const handleMedium = () => setAnswer('medium');
  const handleNoneClot = () => setAnswer('clot-none');
  const handleSmallClot = () => setAnswer('clot-small');
  const handleBigClot = () => setAnswer('clot-big');
  const handleFlooding = () => setAnswer('flooding');
  const handleNoFlooding = () => setAnswer('no-flooding');

  const saveAnswers = useCallback(
    (allAnswers: AnswersPBAC) => {
      data.addAnswersPBAC(allAnswers);
      console.log('Submitted Answers:', data.getAnswersPBAC()[data.getAnswersPBAC().length - 1]);
      navigation.navigate('ResultsPBAC');
    },
    [data, navigation]
  );

  useEffect(() => {
    if (answer !== null) {
      // Check if it's the last question
      if (questionIndex === 3) {
        saveAnswers([...answers, answer] as AnswersPBAC);
      } else {
        // If it's not the last question, navigate to the next question
        navigation.push(`QuestionnairePBAC${questionIndex + 1}`, {
          answers: [...answers, answer], // Add the current answer to the answers array
        });
      }
    }
  }, [answer, answers, navigation, questionIndex, saveAnswers]);

  const question = (i: number) => {
    switch (i) {
      case 0:
        return 'Choose product type:';
      case 1:
        return 'What is the blood intensity?';
      case 2:
        return 'Did you have any blood clots, and if so, what size?';
      case 3:
        return 'Did you have any blood flooding?';
    }
  };

  const possibleAnswers = (i: number) => {
    switch (i) {
      case 0:
        return (
          <>
            <Pressable
              onPress={handlePad}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.primary,
              }}
            >
              <CustomText style={{ color: 'white' }}>PAD</CustomText>
            </Pressable>
            <Pressable
              onPress={handleTampon}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.black,
              }}
            >
              <CustomText style={{ color: 'white' }}>TAMPON</CustomText>
            </Pressable>
          </>
        );
      case 1:
        return (
          <>
            <Pressable
              onPress={handleLow}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.primary,
              }}
            >
              <CustomText style={{ color: 'white' }}>LOW</CustomText>
            </Pressable>
            <Pressable
              onPress={handleMedium}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.black,
              }}
            >
              <CustomText style={{ color: 'white' }}>MEDIUM</CustomText>
            </Pressable>
            <Pressable
              onPress={handleHigh}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.black,
              }}
            >
              <CustomText style={{ color: 'white' }}>HIGH</CustomText>
            </Pressable>
          </>
        );
      case 2:
        return (
          <>
            <Pressable
              onPress={handleNoneClot}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.primary,
              }}
            >
              <CustomText style={{ color: 'white' }}>NONE</CustomText>
            </Pressable>
            <Pressable
              onPress={handleSmallClot}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.black,
              }}
            >
              <CustomText style={{ color: 'white' }}>SMALL</CustomText>
            </Pressable>
            <Pressable
              onPress={handleBigClot}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.black,
              }}
            >
              <CustomText style={{ color: 'white' }}>BIG</CustomText>
            </Pressable>
          </>
        );
      case 3:
        return (
          <>
            <Pressable
              onPress={handleFlooding}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.primary,
              }}
            >
              <CustomText style={{ color: 'white' }}>YES</CustomText>
            </Pressable>
            <Pressable
              onPress={handleNoFlooding}
              style={{
                ...customStyles.answer,
                backgroundColor: colors.black,
              }}
            >
              <CustomText style={{ color: 'white' }}>NO</CustomText>
            </Pressable>
          </>
        );
    }
  };

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
      alignItems: 'center',
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ width: '100%' }}>
          <View style={customStyles.container}>
            <CustomText
              style={{
                color: colors.primary,
                fontFamily: 'FiraSans-Bold',
                fontSize: 22,
              }}
            >
              Usage of sanitory product
            </CustomText>
            <View style={customStyles.actions}>
              <View style={customStyles.questionsContainer}>
                <CustomText style={{ textAlign: 'center', fontSize: 20 }}>{question(questionIndex)}</CustomText>
                <View style={customStyles.answers}>{possibleAnswers(questionIndex)}</View>
              </View>
              <View style={customStyles.progressBar}>
                <View style={customStyles.line} />
                {[...Array(5)].map((x, i) => (
                  <Svg key={'step' + i} fill={colors.primary} style={customStyles.step} viewBox="0 0 512 512">
                    <Path d={progressSvgPath(i - 1)} />
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

export default QuestionnairePBAC;
