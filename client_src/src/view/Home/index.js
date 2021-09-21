import React, { Component } from "react";
import Flex from "../../components/Flex";
import Column from "../../components/Column";
import store from "../../store";
import styles from "./styles.module.scss";
import { withTranslation } from "react-i18next";

class Home extends Component {
  render() {
    return (
      <Flex classes={styles.container} width="100%">
        <Column width="100%">
          <div className={styles.title}>
            <div className={styles.avatar} />
            <div className={styles.titleText}>
              {this.props.t("general.bienvenido") +
                " " +
                store.getState().nombre +
                " " +
                store.getState().apellido}
            </div>
          </div>
        </Column>
      </Flex>
    );
  }
}

export default withTranslation()(Home);
