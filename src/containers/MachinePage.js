import React, { Component } from 'react';
import { connect } from 'react-redux';
import Machine from '../components/Machine';
import * as MachinesActions from '../actions/machines';
import wrapActionCreators from '../utils/wrapActionCreators';

@connect(state => ({
  machines: state.machines
}), wrapActionCreators(MachinesActions))
export default class MachinePage extends Component {
  render() {
    return (
      <Machine {...this.props} />
    );
  }
}
