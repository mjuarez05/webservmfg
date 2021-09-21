import React, {Component} from 'react';
import {Icon} from 'react-fa';
import styles from './styles.module.scss';

export default class Error extends Component {
  render() {
    let icon = '';
    switch (this.props.icon) {
      case '401':
        icon = 'lock';
        break;
      case 'need_param':
        icon = 'sliders';
        break;
      case '404':
        icon = 'exclamation';
        break;
      default:
        icon = 'warning';
        break;
    }
    return (
      <div className={styles.container}>
        <Icon className={styles.icon} name={icon} />
        <h1 className={styles.title}>{this.props.title}</h1>
        <h3 className={styles.msg}>{this.props.message}</h3>
        <h4 className={styles.msg}>{this.props.data}</h4>
      </div>
    );
  }
}
