//dependencias
import React, { PureComponent } from "react";
import { Icon } from "react-fa";
//assets
import styles from "./styles.module.scss";

//components
//import Spinner from '../Spinner';

class Preload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  mostrarPreload() {}

  ocultarPreload() {}

  componentWillReceiveProps(nextProps) {
    this.setState = {
      visible: nextProps.visible
    };
  }

  render() {
    var html = "";

    if (this.props.visible) {
      html = (
        <div className={styles.preload}>
          {this.props.icon ? (
            <Icon
              spin
              name={this.props.icon}
              size="2x"
              style={{ color: "white" }}
            />
          ) : (
            ""
          )}
          {this.props.message ? (
            <div className={styles.message}>{this.props.message}</div>
          ) : (
            ""
          )}
          {this.props.messageSecondary ? (
            <div className={styles.messageSecondary}>
              {this.props.messageSecondary}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
    return html;
  }
}

export default Preload;
