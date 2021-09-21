import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Flex from "../../components/Flex";
import Column from "../../components/Column";
import styles from "./styles.module.scss";
import store from "../../store";

class Welcome extends Component {

  render() {
    const { t } = this.props;
    return (
      <Flex
        direction="column"
        alignContent="center"
        alignItems="start"
        justifyContent="center">

        <Column margin="0" auto={false}>
          <div className={styles.padding}>
            <h1 className={styles.title}>{(!store.getState().username)
              ? t("welcome.title")
              : t("welcome.howisyourday", {
                usuario: store
                  .getState()
                  .nombre + " " + store
                    .getState()
                    .apellido
              })}</h1>
          </div>
        </Column>
        <Column margin="0" auto={false}>
          <div className={styles.padding}>{t("welcome.text1")}</div>
        </Column>
        <Column margin="0" auto={false}>
          <div className={styles.padding}>
            {t("welcome.text2")}
            <a href="/">
              {t("welcome.problems")}</a>.
          </div>
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(Welcome);
