import React, {PureComponent} from 'react';
import styles from './styles.module.scss';
export default class GroupForm extends PureComponent {
  createStyles = () => {
    let names = [styles.content];
    if (this.props.classes) names.push(this.props.classes);
    return names.join(' ');
  };
  render() {
    let size = {
      width: 'auto',
      height: 'auto',
    };
    if (this.props.position) {
      size.position = this.props.position;
    }
    if (this.props.top) {
      size.top = this.props.top;
    }
    if (this.props.left) {
      size.left = this.props.left;
    }
    if (this.props.right) {
      size.right = this.props.right;
    }
    if (this.props.bottom) {
      size.bottom = this.props.bottom;
    }

    if (this.props.margin) {
      size.margin = this.props.margin;
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
    if (this.props.overflow) {
      size.overflow = this.props.overflow;
    }
    if (this.props.minHeight) {
      size.minHeight = this.props.minHeight;
    }
    if (this.props.disabled) {
      return (
        <div className={styles.framedisable} style={size}>
          <span className={styles.title}>{this.props.title}</span>
          <div className={this.createStyles()}>{this.props.children}</div>
        </div>
      );
    } else {
      return (
        <div className={styles.frame} style={size}>
          <span className={styles.title}>{this.props.title}</span>
          <div className={this.createStyles()}>{this.props.children}</div>
        </div>
      );
    }
  }
}
