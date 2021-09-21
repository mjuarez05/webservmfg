import React, { PureComponent } from "react";
import Flex from "../../components/Flex";
import Column from "../../components/Column";
import Input from "../../components/Input";
import store from "../../store";
import styles from "./styles.module.scss";
import { withTranslation } from "react-i18next";
import Button from "../../components/Button";
import { getUsuarioRoles } from "../../services/Usuarios";

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      newpass: "",
      repeatepass: ""
    };
  }
  componentDidMount = () => {
    getUsuarioRoles(store.getState().userid).then(response => {
      this.setState({ user: response.data });
    });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    let { user, newpass, repeatepass } = this.state;
    return user !== null ? (
      <Flex classes={styles.container} width="100%">
        <Column width="100%">
          <div className={styles.title}>
            <div className={styles.avatar} />
            <div className={styles.titleText}>
              {store.getState().nombre + " " + store.getState().apellido}
            </div>
          </div>
        </Column>
        <Flex classes={styles.container} width="100%" direction="row">
          <Column width="50%">
            <h3>{this.props.t("profile.datosPersonales")}</h3>
            <div>
              {this.props.t("profile.nombre")}: <b>{user.nombre}</b>
            </div>
            <div>
              {this.props.t("profile.apellido")}: <b>{user.apellido}</b>
            </div>
            <div>
              {this.props.t("profile.email")}: <b>{user.email}</b>
            </div>
            <div>
              {this.props.t("profile.usuario")}: <b>{user.username}</b>
            </div>
            <h3>{this.props.t("profile.CambiodePassword")}</h3>
            <Input
              id="newpass"
              type="password"
              placeholder={this.props.t("profile.newpass")}
              value={newpass || ""}
              autocomplete={false}
              onChange={this.handleInputChange}
            />
            <Input
              id="repetpass"
              type="password"
              value={repeatepass || ""}
              placeholder={this.props.t("profile.repetpass")}
              autocomplete={false}
              onChange={this.handleInputChange}
            />
            <Button
              visible={true}
              id="cambiarPass"
              icon="save"
              onPress={this.handlerSubmit}
              text={this.props.t("profile.changePassword")}
              disabled={
                newpass !== null &&
                repeatepass !== null &&
                newpass === repeatepass
              }
              styleType="success"
            />
          </Column>
          <Column width="50%">
            <h3>Roles</h3>
            {user &&
              user.roles.map(v => {
                return (
                  <div key={v.id}>
                    <b>{v.name}</b> - <span>{v.description}</span>
                  </div>
                );
              })}
            <h3>Widgets</h3>
          </Column>
        </Flex>
      </Flex>
    ) : null;
  }
}

export default withTranslation()(Profile);
