import React, {PureComponent} from 'react';
import styles from './styles.module.scss';
import {Icon} from 'react-fa';

export default class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      text: '',
    };
  }
  createStyles = () => {
    let names = [styles.component];
    switch (this.props.styleType) {
      case 'outline':
        names.push(styles.outline);
        break;
      case 'success':
        names.push(styles.success);
        break;
      case 'danger':
        names.push(styles.danger);
        break;
      case 'info':
        names.push(styles.info);
        break;
      case 'warning':
        names.push(styles.warning);
        break;
      default:
        break;
    }

    if (this.props.classes) names.push(this.props.classes);
    if (this.props.disabled) {
      names.push(styles.disabled);
    }
    names.push(styles.ripple);
    return names.join(' ');
  };

  render() {
    let size = {
      width: 'auto',
      height: 'auto',
    };
    if (this.props.margin) {
      size.margin = this.props.margin;
    }
    if (this.props.border) {
      size.border = this.props.border;
    }
    if (this.props.padding) {
      size.padding = this.props.padding;
    }
    if (this.props.width) {
      size.width = this.props.width;
    }
    if (this.props.height) {
      size.height = this.props.height;
    }
    return (
      this.props.visible && (
        <button
          className={this.createStyles()}
          style={size}
          disabled={this.props.disabled ? 'disabled' : ''}
          onClick={this.props.onPress}
        >
          {this.state.loading ? (
            <Icon spin name="refresh" />
          ) : this.props.icon ? (
            <Icon name={this.props.icon} />
          ) : (
            ''
          )}
          {this.props.text ? (
            <span className={styles.title}>{this.props.text}</span>
          ) : (
            ''
          )}
        </button>
      )
    );
  }
}
