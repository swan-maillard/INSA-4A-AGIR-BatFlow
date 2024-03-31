import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import questionsSamanta from './content/QuestionsSamanta.ts';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import CalendarStartCycleScreen from './pages/CalendarStartCycleScreen.tsx';
import StatsScreen from './pages/StatsScreen';
import InformationScreen from './pages/InformationScreen';
import QuestionnairePBAC from './pages/QuestionnairePBAC';
import QuestionnaireSamanta from './pages/QuestionnaireSamanta';
import SettingsScreen from './pages/SettingsScreen';
import CycleOverview from './pages/CycleOverview.tsx';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddSanitoryProductScreen from './pages/AddSanitoryProductScreen.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Data, DataContext } from './context/DataContext.tsx';
import DataManager from './data/DataManager.ts';
import CalendarEndCycleScreen from './pages/CalendarEndCycleScreen.tsx';

const Stack = createNativeStackNavigator();

const App = () => {
  const [data, setData] = useState<Data>({});
  const dataManager = useMemo(() => new DataManager(data, setData), [data, setData]);

  useEffect(() => {
    if (!data) {
      AsyncStorage.getItem('AGIR-data').then((value) => {
        if (!JSON.parse(value as string)) {
          setData(value ? JSON.parse(value) : {});
        }
      });
    } else {
      AsyncStorage.setItem('AGIR-data', JSON.stringify(data)).then();
    }
  }, [data]);

  return (
    <DataContext.Provider value={dataManager}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CalendarStartCycle" component={CalendarStartCycleScreen} />
          <Stack.Screen name="CalendarEndCycle" component={CalendarEndCycleScreen} />
          <Stack.Screen name="Stats" component={StatsScreen} />
          <Stack.Screen name="Overview" component={CycleOverview} initialParams={{ index: 0 }} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="AddSanitoryProduct" component={AddSanitoryProductScreen} />
          <Stack.Screen name="Information" component={InformationScreen} />
          {/*} DEBUT QUESTIONNAIRE PBAC {*/}
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Stack.Screen
                key={index}
                name={`QuestionnairePBAC${index}`}
                component={QuestionnairePBAC}
                initialParams={{
                  questionIndex: index,
                  answers: [],
                }}
              />
            ))}
          {/*} FIN QUESTIONNAIRE PBAC {*/}

          {/*} DEBUT QUESTIONNAIRE SAMANTA {*/}
          {questionsSamanta.map((_, index) => (
            <Stack.Screen
              key={index}
              name={`QuestionnaireSamanta${index}`}
              component={QuestionnaireSamanta}
              initialParams={{
                questionIndex: index,
                answers: [],
              }}
            />
          ))}
          {/*} FIN QUESTIONNAIRE SAMANTA {*/}
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
};

export default App;
