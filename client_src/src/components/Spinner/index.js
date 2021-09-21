//dependencias
import React, {PureComponent} from 'react';

//assets
import SpinnerImage from '../../assets/oval.svg';
import styles from './styles.module.scss';

export default class Spinner extends PureComponent {
  render() {
    return (
      <div className={styles.spinner}>
        <img src={SpinnerImage} alt={this.props.alt} />
        <div className={styles.msg}>{this.props.msg}</div>
      </div>
    );
  }
}
