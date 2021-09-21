import React, {memo} from 'react';
import styles from './styles.module.scss';

const DatePicker = memo(
  ({
    id,
    type,
    format,
    max,
    min,
    step,
    value,
    disabled,
    onChange,
    onFocusOut,
    label,
    margin,
    padding,
    width,
    height,
  }) => {
    let size = {
      width: 'auto',
      height: 'auto',
    };
    if (margin) {
      size.margin = margin;
    }
    if (padding) {
      size.padding = padding;
    }
    if (width) {
      size.width = width;
    }
    if (height) {
      size.height = height;
    }
    return (
      <div className={styles.container} style={size}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          id={id}
          className={[styles.component, styles.withoutBorder].join(' ')}
          name={id}
          type={type}
          max={max}
          min={min}
          step={step}
          value={value}
          format={format}
          disabled={disabled ? 'disabled' : ''}
          onChange={onChange}
          onBlur={onFocusOut}
        ></input>
      </div>
    );
  },
);

export default DatePicker;
