import React, { PureComponent } from "react";
import LeftMenu from "./components/LeftBar";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import Content from "../components/Content";

import styles from "./styles.module.scss";

export default class Layout extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <TopBar />
        <LeftMenu />
        <Content>test</Content>
        <Footer />
      </div>
    );
  }
}
