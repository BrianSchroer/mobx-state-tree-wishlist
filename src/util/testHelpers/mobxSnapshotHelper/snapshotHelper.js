import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';

/**
 * mobx snapshot helper methods
 */
export default class {
  /**
   * Create snapshot of original state for target 
   * and snapshots/patches when state changes are made. Assert that snapshots
   * match saved snapshots/patches.
   * @param {*} target for which snapshots are to be created/matched
   * @param {*} callback function that makes state changes
   */
  static test(target, callback) {
    const snapshots = [getSnapshot(target)];

    onSnapshot(target, snapshot => snapshots.push(snapshot));
    onPatch(target, patch => snapshots.push(patch));

    if (callback) {
      callback(target);
    }

    if (snapshots.length > 1) {
      expect(snapshots).toMatchSnapshot();
    } else {
      expect(snapshots[0]).toMatchSnapshot();
    }
  }
}