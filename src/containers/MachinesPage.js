import React, { Component } from 'react';
import { connect } from 'react-redux';
import Machines from '../components/Machines';
import * as MachinesActions from '../actions/machines';
import wrapActionCreators from '../utils/wrapActionCreators';

@connect(state => ({
  machines: state.machines
}), wrapActionCreators(MachinesActions))
export default class MachinesPage extends Component {
  render() {
    return (
      <Machines {...this.props} />
    );
  }
}
