import { useState, useEffect } from "react";

// VK - User - SignedIn - Login() - Logout() - Api() - Execute();

export default function useVK({ apiId, settings }) {
  const [VK] = useState(window.VK);
  const [signedIn, setSignedIn] = useState(false);
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    VK.init({ apiId });
    VK.Auth.getLoginStatus((response) => {
      if (response.session) {
        setSignedIn(true);
        if (!User) getUserInfo(response.session.mid);
      }
    });
  });

  const Api = (method, payload) => {
    return new Promise((resolve, reject) => {
      VK.Api.call(method, { ...payload, v: "5.131" }, (r) => {
        if (r.response) {
          resolve(r.response);
        } else {
          reject(r.error);
        }
      });
    });
  };

  const getUserInfo = async (id) => {
    const userData = await Api("users.get", {
      user_ids: id,
      fields: "domain, photo_100",
      v: "5.131",
    });

    if (userData) {
      let user = userData[0];
      user = {
        id: user.id,
        domain: user.domain,
        name: user.first_name,
        surname: user.last_name,
        photo: user.photo_100,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const Login = () => {
    return VK.Auth.login((response) => {
      if (response.session) {
        setSignedIn(true);
        getUserInfo(response.session.user.id);
      }
    }, settings);
  };

  const Logout = () => {
    return VK.Auth.logout(() => {
      setUser(null);
      setSignedIn(false);
      localStorage.setItem("user", null);
    });
  };

  return {
    VK,
    User,
    signedIn,
    Login,
    Logout,
    Api,
  };
}
