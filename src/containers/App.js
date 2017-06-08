import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'class-names';
import styles from '../style/index.scss';

@CSSModules(styles)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    styles: PropTypes.object
  };

  render() {
    const { children, styles } = this.props;

    return (
      <div className={classNames(styles.container, 'container')}>
        {children}
      </div>
    );
  }
}
