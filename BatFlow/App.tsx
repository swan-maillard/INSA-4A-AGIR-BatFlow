import * as React from 'react';
import questionsSamanta from './content/QuestionsSamanta.ts';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import CalendarScreen from './pages/CalendarScreen';
import StatsScreen from './pages/StatsScreen';
import InformationScreen from './pages/InformationScreen';
import QuestionnairePBAC from "./pages/QuestionnairePBAC";
import QuestionnaireSamanta from './pages/QuestionnaireSamanta';
import SettingsScreen from './pages/SettingsScreen';
import ResultsSamanta from './pages/ResultsSamanta';
import ResultsPBAC from "./pages/ResultsPBAC.tsx";
import CycleOverview from './pages/CycleOverview.tsx';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddSanitoryProductScreen from "./pages/AddSanitoryProductScreen.tsx";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Stats" component={StatsScreen} />
          <Stack.Screen name="Overview" component={CycleOverview} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="AddSanitoryProduct" component={AddSanitoryProductScreen} />
          <Stack.Screen name="Information" component={InformationScreen} />
          {/*} DEBUT QUESTIONNAIRE PBAC {*/}
          {Array(4).fill(0).map((_, index) => (
            <Stack.Screen
              key={index}
              name={`QuestionnairePBAC${index}`}
              component={QuestionnairePBAC}
              initialParams={{
                questionIndex: index,
                answers: []
            }}/>
          ))}
          <Stack.Screen name={`ResultsPBAC`} component={ResultsPBAC}/>
          {/*} FIN QUESTIONNAIRE PBAC {*/}

          {/*} DEBUT QUESTIONNAIRE SAMANTA {*/}
          {questionsSamanta.map((_, index) => (
            <Stack.Screen
              key={index}
              name={`QuestionnaireSamanta${index}`}
              component={QuestionnaireSamanta}
              initialParams={{
                questionIndex: index,
                answers: []
            }}/>
          ))}
          <Stack.Screen name={`ResultsSamanta`} component={ResultsSamanta}/>
          {/*} FIN QUESTIONNAIRE SAMANTA {*/}

        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;