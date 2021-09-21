import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
export default class Switch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handlerOnChange = () => {
    this.setState(prevState => {
      return { checked: !prevState.checked };
    });
  };

  componentDidMount = () => {
    this.setState({
      checked: this.props.checked
    });
  };

  render() {
    let disabled = this.props.disabled ? "disabled" : "";
    return (
      <div className={styles.container}>
        <label
          className={
            this.props.disabled
              ? styles.switch + " " + styles.disabled
              : styles.switch
          }
        >
          <input
            id={this.props.id}
            type="checkbox"
            className={styles.input}
            checked={this.state.checked ? "checked" : ""}
            onClick={this.handlerOnChange}
            disabled={disabled}
          />
          <span
            className={
              this.props.type === "rounded"
                ? styles.slider + " " + styles.rounded
                : styles.slider
            }
          />
        </label>
        {this.props.title ? (
          <span className={styles.title}>{this.props.title}</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}
