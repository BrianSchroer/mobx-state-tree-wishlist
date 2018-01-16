import React from 'react';
import renderer from 'react-test-renderer';

/**
 * React component snapshot helper
 */
export default class ComponentSnapshotTester {

  /**
   * Create new ComponentSnapshotTester instance
   * @param {*} component - React component
   */
  constructor(component) {
    this.component = component.type;
    this.props = component.props;
    this.adjustProps = (props, propOverrides) => Object.assign({}, props, propOverrides);
  }

  /**
   * Specify callback function to be called by the test function to adjust component
   * props with propOverrides.
   * (Defaults to adjusting top-level props.)
   */
  withPropAdjustor = (adjustor) => {
    this.adjustProps = adjustor;
    return this;
  };

  /**
   * Adjust props that were passed to the constructor with propOverrides, then create
   * snapshot and assert that it matches previously accepted screenshot.
   */
  test = (propOverrides) => {
    const Component = this.component;
    const props = this.adjustProps(this.props, propOverrides);

    const newSnapshot = renderer.create(<Component {...props} />).toJSON();

    expect(newSnapshot).toMatchSnapshot();
  }

  /**
   * Create snapshot and assert that it matches previously accepted screenshot. 
   * @param {*} component - React component1 
   */
  static test(component) {
    new ComponentSnapshotTester(component).test();
  }
}