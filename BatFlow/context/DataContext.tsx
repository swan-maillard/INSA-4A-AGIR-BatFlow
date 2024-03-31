import { createContext } from 'react';
import DataManager from '../data/DataManager.ts';

export type AnswersPBAC = [
  'pad' | 'tampon',
  'low' | 'medium' | 'high',
  'clot-none' | 'clot-small' | 'clot-big',
  'flooding' | 'no-flooding',
];

export type CurrentUser = {
  user?: string;
};
export type UserData = {
  cycles?: string[][];
  averageDuration?: number;
  averageGapDuration?: number;
  answersPBAC?: AnswersPBAC[][];
  scoresPBAC?: number[];
  averagePBAC?: number;
  answersSamanta?: boolean[][];
  scoresSamanta?: number[];
  averageSamanta?: number;
  notifications?: boolean;
  sharing?: boolean;
};

export type AllUsersData = {
  [key: string]: UserData;
};

export type Data = CurrentUser & AllUsersData;
export type UserDataKeys = keyof UserData;

export const DataContext = createContext<DataManager>(new DataManager({}, () => null));
