import appConstants from "../../appConstants.js";

export function createUserTokenCookie(token) {
 // console.log("createUserTokenCookie : create token called");
  var user_cookie = appConstants.USER_TOKEN;
  const expires = new Date(Date.now() + 30 * 864e5).toUTCString();
  document.cookie = `${user_cookie}=${token}; path=/; expires=${expires}; Domain=${
    import.meta.env.VITE_APP_USER_TOKEN_DOMAIN
  }`;

  // let cookie = this.readUserTokenCookie();
  // if (cookie) {
  //   console.log("cookie =>", cookie);
  // }
}

export function readUserTokenCookie() {
  //console.log("readUserTokenCookie : read token called")
  var user_cookie = appConstants.USER_TOKEN;
  var result = document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === user_cookie ? parts[1] : r;
  }, "");
  //console.log(`readUserTokenCookie : token value : ${result}`)
  return result;
}

export function deleteUserTokenCookie() {
  //console.log("deleteUserTokenCookie : Delete token called")
  var user_cookie = appConstants.USER_TOKEN;
  const expires = new Date(Date.now() - 10 * 864e5).toUTCString();
  document.cookie = `${user_cookie}=""; path=/;  expires=${expires}; Domain=${
    import.meta.env.VITE_APP_USER_TOKEN_DOMAIN
  }`;
}

export function updateUserTokenExpiryDate() {
  //console.log("updateUserTokenExpiryDate : update token called")
  var user_cookie = appConstants.USER_TOKEN;
  const expires = new Date(Date.now() + 30 * 864e5).toUTCString();
  var token_value = readUserTokenCookie();
  if (token_value != "") {
    document.cookie = `${user_cookie}=${token_value}; path=/; expires=${expires}; Domain=${
      import.meta.env.VITE_APP_USER_TOKEN_DOMAIN
    }`;
  }
}
