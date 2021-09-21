const loginAuthorized = (token, userid, username, nombre, apellido, ttl) => {
  return {
    type: "LOGIN_AUTHORIZE",
    token,
    userid,
    username,
    nombre,
    apellido,
    ttl
  };
};

const changeLanguage = lang => {
  return { type: "CHANGE_LANGUAGE", lang };
};

const logout = (token, userid) => {
  return { type: "LOGOUT", token, userid };
};

const addNewTab = tab => {
  return { type: "ADD_NEW_TAB", tab };
};

const removeTab = trx => {
  return { type: "REMOVE_TAB", trx };
};

const changeActiveTab = newIndex => {
  return { type: "CHANGE_ACTIVE_TAB", newIndex };
};

const closeMenu = state => {
  return { type: "CLOSE_MENU", state };
};

export {
  loginAuthorized,
  changeLanguage,
  logout,
  addNewTab,
  removeTab,
  changeActiveTab,
  closeMenu
};
