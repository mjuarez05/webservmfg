import React, {PureComponent} from 'react';

import styles from './styles.module.scss';

export default class Input extends PureComponent {
  createStyles = () => {
    let names = [styles.component];
    this.props.border
      ? names.push(styles.border)
      : names.push(styles.withoutBorder);
    if (this.props.disabled) names.push(styles.disabled);
    if (this.props.classes) names.push(styles.classes);
    return names.join(' ');
  };

  render() {
    switch (this.props.type) {
      case 'text':
      case 'password':
      case 'number':
      case 'time':
      case 'date':
      case 'datetime-local':
      case 'email':
        let disabled = this.props.disabled ? 'disabled' : '';
        return (
          <div className={styles.container}>
            <label
              htmlFor={this.props.id}
              className={
                this.props.type === 'time' ||
                this.props.type === 'date' ||
                this.props.type === 'datetime-local'
                  ? styles.labeltime
                  : styles.label
              }
            >
              {this.props.label}
            </label>
            <input
              id={this.props.id}
              name={this.props.id}
              required={this.props.required ? 'required' : ''}
              className={this.createStyles()}
              type={this.props.type}
              autoComplete={this.props.autocomplete ? '' : 'new-password'}
              placeholder={this.props.placeholder}
              disabled={disabled}
              onChange={this.props.onChange}
              onKeyPress={this.props.whenKeyPress}
              onKeyUp={this.props.whenKeyUp}
              onBlur={this.props.whenBlur}
              value={this.props.value === null ? '' : this.props.value}
              maxLength={this.props.maxlength}
              size={this.props.size}
              max={this.props.max}
              min={this.props.min}
              step={this.props.step}
              pattern={this.props.pattern}
            />
          </div>
        );
      default:
        return <div>ERROR! Type not soported!</div>;
    }
  }
}
