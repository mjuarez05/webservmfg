import React, {PureComponent} from 'react';

import styles from './styles.module.scss';

export default class ComboBox extends PureComponent {
  createStyles = () => {
    let names = [styles.component];
    if (this.props.disabled === 'disabled') {
      names.push(styles.disabled);
    }
    switch (this.props.type) {
      case 'clean':
        names.push(styles.clean);
        break;
      default:
        break;
    }
    names.push(styles.ripple);
    if (this.props.classes) names.push(this.props.classes);
    return names.join(' ');
  };
  render() {
    let listItems;
    if (
      this.props.items.length > 0 &&
      JSON.stringify(this.props.items[0]) !== '{}'
    )
      this.props.items.unshift({});
    if (this.props.itemId !== undefined && this.props.itemText !== undefined) {
      listItems = this.props.items.map((data, index) =>
        index === 0 ? (
          <option
            key={index}
            value=""
            // disabled
            className={styles.options}
          >
            ...
          </option>
        ) : (
          <option
            key={index}
            value={data[this.props.itemId]}
            className={styles.options}
          >
            {this.props.itemText.constructor.name === 'Array'
              ? this.props.itemText
                  .map((value) => {
                    return data[value];
                  })
                  .join(' | ')
              : data[this.props.itemText]}
          </option>
        ),
      );
    } else {
      listItems = this.props.items.map((data, index) =>
        index === 0 ? (
          <option
            key={index}
            value=""
            // disabled
            className={styles.options}
          >
            ...
          </option>
        ) : (
          <option key={index} value={data} className={styles.options}>
            {data}
          </option>
        ),
      );
    }
    let size = {
      width: 'auto',
      height: 'auto',
    };
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
    return (
      <div className={styles.container} style={size}>
        <label htmlFor={this.props.id} className={styles.label}>
          {this.props.label}
        </label>
        <select
          id={this.props.id}
          name={this.props.id}
          value={this.props.value}
          // defaultValue={''}
          className={this.createStyles()}
          disabled={this.props.disabled ? 'disabled' : ''}
          onChange={this.props.onSelect}
        >
          {listItems}
        </select>
      </div>
    );
  }
}
