import React, {PureComponent} from 'react';
import styles from './styles.module.scss';

export default class Column extends PureComponent {
  createStyles = () => {
    let names = [styles.container];
    switch (this.props.alignSelf) {
      case 'center': {
        names.push(styles.alignSelfCenter);
        break;
      }
      case 'start': {
        names.push(styles.alignSelfStart);
        break;
      }
      case 'end': {
        names.push(styles.alignSelfEnd);
        break;
      }
      case 'between': {
        names.push(styles.alignSelfBetween);
        break;
      }
      case 'around': {
        names.push(styles.alignSelfAround);
        break;
      }
      default:
        break;
    }
    if (this.props.animate) names.push(this.props.animate);
    if (this.props.classes) names.push(this.props.classes);
    return names.join(' ');
  };

  render() {
    let size = {
      width: '100%',
      height: 'auto',
      backgroundColor: 'transparent',
      flex: '1 1 auto',
    };
    if (!this.props.auto) {
      size.flex = '0 1 auto';
    }
    if (this.props.width) {
      size.width = this.props.width;
    }
    if (this.props.height) {
      size.height = this.props.height;
    }
    if (this.props.backgroundColor) {
      size.backgroundColor = this.props.backgroundColor;
    }
    if (this.props.margin) {
      size.margin = this.props.margin;
    }
    if (this.props.padding) {
      size.padding = this.props.padding;
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
