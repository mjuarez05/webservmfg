import React, {PureComponent} from 'react';

import styles from './styles.module.scss';

export default class Flex extends PureComponent {
  createStyles = () => {
    let names = [styles.container];
    this.props.direction === 'row'
      ? names.push(styles.row)
      : names.push(styles.column);
    if (this.props.reverse) names.push(styles.reverse);
    switch (this.props.justifyContent) {
      case 'center': {
        names.push(styles.justifyContentCenter);
        break;
      }
      case 'start': {
        names.push(styles.justifyContentStart);
        break;
      }
      case 'end': {
        names.push(styles.justifyContentEnd);
        break;
      }
      case 'between': {
        names.push(styles.justifyContentBetween);
        break;
      }
      case 'around': {
        names.push(styles.justifyContentAround);
        break;
      }
      default:
        break;
    }
    switch (this.props.alignItems) {
      case 'center': {
        names.push(styles.alignItemsCenter);
        break;
      }
      case 'start': {
        names.push(styles.alignItemsStart);
        break;
      }
      case 'end': {
        names.push(styles.alignItemsEnd);
        break;
      }
      case 'stretch': {
        names.push(styles.alignItemsStretch);
        break;
      }
      case 'baseline': {
        names.push(styles.alignItemsBaseline);
        break;
      }
      default:
        break;
    }
    switch (this.props.alignContent) {
      case 'center': {
        names.push(styles.alignContentCenter);
        break;
      }
      case 'start': {
        names.push(styles.alignContentStart);
        break;
      }
      case 'end': {
        names.push(styles.alignContentEnd);
        break;
      }
      default:
        break;
    }
    switch (this.props.justivyContent) {
      case 'stretch': {
        names.push(styles.alignContentsStretch);
        break;
      }
      case 'between': {
        names.push(styles.justifyContentBetween);
        break;
      }
      case 'around': {
        names.push(styles.justifyContentAround);
        break;
      }
      case 'center': {
        names.push(styles.justifyContentCenter);
        break;
      }
      default:
        break;
    }
    switch (this.props.wrap) {
      case 'wrap': {
        names.push(styles.wrap);
        break;
      }
      case 'nowrap': {
        names.push(styles.nowrap);
        break;
      }
      case 'wrapReverse': {
        names.push(styles.wrapReverse);
        break;
      }
      default:
        break;
    }
    if (this.props.classes) names.push(this.props.classes);
    return names.join(' ');
  };
  render() {
    let size = {
      width: '100%',
      heigth: '100%',
      backgroundColor: 'transparent',
    };
    if (this.props.round) {
      size.borderRadius = this.props.round;
      size.overflow = 'hidden';
      size.boxShadow = '0 0 3px lightgray';
    }
    if (this.props.width) {
      size.width = this.props.width;
    }
    if (this.props.height) {
      size.height = this.props.height;
    }
    if (this.props.padding) {
      size.padding = this.props.padding;
    }
    if (this.props.margin) {
      size.margin = this.props.margin;
    }
    if (this.props.overflow) {
      size.overflow = this.props.overflow;
    }
    if (this.props.minHeight) {
      size.minHeight = this.props.minHeight;
    }
    return (
      <div className={this.createStyles()} style={size}>
        {this.props.children}
      </div>
    );
  }
}
