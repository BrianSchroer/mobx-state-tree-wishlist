import { getSnapshot } from 'mobx-state-tree';

export default class {
  static createSnapshot(target) {
    return getSnapshot(target);
  }

  static assertMatch(target) {
    expect(this.createSnapshot(target)).toMatchSnapshot();
  }
}