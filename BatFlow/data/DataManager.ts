import {
  AllUsersData,
  AnswersPBAC,
  Data,
  UserDataKeys,
} from '../context/DataContext.tsx';

export default class DataManager {
  private readonly _data: Data;
  private readonly _setData: (newData: Data) => void;
  constructor(data: Data, setData: (newData: Data) => void) {
    this._data = data;
    this._setData = setData;
  }

  getUser(): string {
    return this._data?.user || '';
  }
  setUser(user: string) {
    if (!this._data) {
      return;
    }
    this._data.user = user.trim();
    this._setData(this._data);
  }

  getUserData<T extends any>(key: UserDataKeys, initialValue: T): T {
    if (!this._data) {
      return initialValue;
    }
    const data = this._data as AllUsersData;
    const userData = data[this.getUser().toLowerCase()]?.[key] || initialValue;
    return userData as T;
  }

  setUserData(key: UserDataKeys, newValue: any) {
    if (!this._data) {
      return;
    }
    const data = this._data;
    if (!data[this.getUser().toLowerCase()]) {
      data[this.getUser().toLowerCase()] = {};
    }

    const userData = data[this.getUser().toLowerCase()] as {
      [keys in UserDataKeys]: any;
    };

    userData[key] = newValue;

    console.log(this._data);
    this._setData(this._data);
  }

  getCycles(): string[][] {
    return this.getUserData('cycles', [] as string[][]) || [];
  }

  getLastCycle(): string[] {
    const cycles = this.getCycles();
    return cycles.length > 0 ? cycles[cycles.length - 1] : [];
  }

  startCycle(date: Date) {
    const cycles = this.getCycles();
    if (cycles.length === 0 || cycles[cycles.length - 1].length === 2) {
      cycles.push([date.toLocaleDateString('en-CA')]);
      this.setUserData('cycles', cycles);
    }
  }

  endCycle(date: Date) {
    const cycles = this.getCycles();
    if (cycles.length > 0 && cycles[cycles.length - 1].length === 1) {
      const start = new Date(cycles[cycles.length - 1][0]);
      const duration = Math.round(
        (date.getTime() - start.getTime()) / (1000 * 3600 * 24),
      );
      cycles[cycles.length - 1].push(date.toLocaleDateString('en-CA'));
      this.setUserData('cycles', cycles);
      let average = this.getUserData<number | null>('averageDuration', null);
      average =
        average === null
          ? duration
          : (average * (cycles.length - 1) + duration) / cycles.length;

      this.setUserData('averageDuration', average);
    }
  }

  getAnswersPBAC(): AnswersPBAC[] {
    return this.getUserData('answersPBAC', []);
  }

  addAnswersPBAC(answers: AnswersPBAC) {
    const answersPBAC = this.getAnswersPBAC();
    answersPBAC.push(answers);
    this.setUserData('answersPBAC', answersPBAC);
  }

  getAnswersSamanta(): boolean[][] {
    return this.getUserData('answersSamanta', []);
  }

  addAnswersSamanta(answers: boolean[]) {
    const answersSamanta = this.getAnswersSamanta();
    answersSamanta.push(answers);
    this.setUserData('answersSamanta', answersSamanta);
  }

  setScoreSamanta(score: number) {
    const scores = this.getUserData<number[]>('scoresSamanta', []);
    scores.push(score);
    let average = this.getUserData<number | null>('averageSamanta', null);
    average =
      average === null
        ? score
        : (average * scores.length + score) / (scores.length + 1);
    this.setUserData('scoresSamanta', scores);
    this.setUserData('averageSamanta', average);
  }

  clean() {
    this._setData({});
  }
}
