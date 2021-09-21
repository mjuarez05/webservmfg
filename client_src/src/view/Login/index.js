import React, {Component} from 'react';
import Flex from '../../components/Flex';
import Column from '../../components/Column';
import LoginForm from '../LoginForm';
import Welcome from '../Welcome';

import {withTranslation} from 'react-i18next';
import styles from './styles.module.scss';

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      response: false,
    };
  }

  render() {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="row"
        padding="0"
        margin="0"
        classes={styles.app}
      >
        <Column
          width="70vw"
          height="100%"
          padding="0"
          margin="0"
          alignItems="center"
          justifyContent="center"
          backgroundColor="transparent"
        >
          <Welcome />
        </Column>
        <Column
          classes={styles.animate}
          width="40vw"
          height="100%"
          padding="20px"
          margin="0"
          alignItems="center"
          justifyContent="center"
          backgroundColor="var(--light)"
        >
          <LoginForm msg={this.props.msg} />
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(Login);
