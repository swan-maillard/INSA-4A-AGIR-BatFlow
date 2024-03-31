import { AllUsersData, AnswersPBAC, Data, UserDataKeys } from '../context/DataContext.tsx';

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

    console.log(this._data.swan);
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
      // Create a new cycle array and add the start date
      cycles.push([date.toLocaleDateString('en-CA')]);
      this.setUserData('cycles', cycles);

      // Create a new PBAC answers array
      const answersPBAC = this.getAnswersPBAC();
      answersPBAC.push([]);
      this.setUserData('answersPBAC', answersPBAC);

      // Initialize a new PBAC score
      const scoresPBAC = this.getUserData<number[]>('scoresPBAC', []);
      scoresPBAC.push(0);
      this.setUserData('scoresPBAC', scoresPBAC);

      // Compute the new gap duration average
      let averageGapDuration = this.getUserData<number | null>('averageGapDuration', null);
      if (averageGapDuration === null) {
        this.setUserData('averageGapDuration', 28);
      } else {
        const end = new Date(cycles[cycles.length - 2][1]);
        const start = new Date(cycles[cycles.length - 2][0]);
        const gapDuration = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        console.log('Gap duration', gapDuration);
        averageGapDuration = (averageGapDuration * (cycles.length - 1) + gapDuration) / cycles.length;
        averageGapDuration = Math.round(averageGapDuration * 10) / 10;
        console.log('Average', averageGapDuration);
        this.setUserData('averageGapDuration', averageGapDuration);
      }
    }
  }

  endCycle(date: Date) {
    const cycles = this.getCycles();
    if (cycles.length > 0 && cycles[cycles.length - 1].length === 1) {
      // Add the end date of the last cycle
      const endDate = date.toLocaleDateString('en-CA');
      cycles[cycles.length - 1].push(endDate);
      this.setUserData('cycles', cycles);

      // Compute the new duration average of a cycle
      let averageDuration = this.getUserData<number | null>('averageDuration', null);
      const start = new Date(cycles[cycles.length - 1][0]);
      const end = new Date(endDate);
      const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1);
      averageDuration =
        averageDuration === null ? duration : (averageDuration * (cycles.length - 1) + duration) / cycles.length;

      averageDuration = Math.round(averageDuration * 10) / 10;
      this.setUserData('averageDuration', averageDuration);

      // Compute the new PBAC score average
      const scoresPBAC = this.getUserData('scoresPBAC', [0]);
      const score = scoresPBAC[scoresPBAC.length - 1];
      let averagePBAC = this.getUserData<number | null>('averagePBAC', null);
      averagePBAC = averagePBAC === null ? score : (averagePBAC * (cycles.length - 1) + score) / cycles.length;

      averagePBAC = Math.round(averagePBAC * 10) / 10;
      this.setUserData('averagePBAC', averagePBAC);
    }
  }

  getAnswersPBAC(): AnswersPBAC[][] {
    return this.getUserData('answersPBAC', []);
  }

  addAnswersPBAC(answers: AnswersPBAC) {
    const answersPBAC = this.getAnswersPBAC();
    answersPBAC[answersPBAC.length - 1].push(answers);
    this.setUserData('answersPBAC', answersPBAC);
  }

  addScorePBAC(score: number) {
    const scoresPBAC = this.getUserData('scoresPBAC', [0]);
    scoresPBAC[scoresPBAC.length - 1] += score;
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
    // Add the new Samanta score
    const scores = this.getUserData<number[]>('scoresSamanta', []);
    scores.push(score);
    this.setUserData('scoresSamanta', scores);

    // Compute the new average score
    let average = this.getUserData<number | null>('averageSamanta', null);
    average = average === null ? score : (average * (scores.length - 1) + score) / scores.length;

    average = Math.round(average * 10) / 10;
    this.setUserData('averageSamanta', average);
  }

  clean() {
    this._setData({});
  }
}
