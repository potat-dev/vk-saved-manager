import { useState, useEffect } from "react";

export default function useAuth({ apiId, settings }) {
  const [VK] = useState(window.VK);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const getUserInfo = (id, callback) => {
    VK.Api.call(
      "users.get",
      {
        user_ids: id,
        fields: "domain, photo_100",
        v: "5.131",
      },
      (r) => {
        if (r.response) {
          let user = r.response[0];
          user = {
            id: user.id,
            domain: user.domain,
            name: user.first_name,
            surname: user.last_name,
            photo: user.photo_100,
          };
          setUser(user);
          callback(user);
        }
      }
    );
  };

  useEffect(() => {
    console.log(user);
    VK.init({ apiId });
    VK.Auth.getLoginStatus((response) => {
      if (response.session) {
        setSignedIn(true);
        if (!user) {
          getUserInfo(response.session.user.id, (user) => {
            localStorage.setItem("user", JSON.stringify(user));
          });
        }
      }
    });
  });

  const signIn = () => {
    return VK.Auth.login((response) => {
      if (response.session) {
        setSignedIn(true);
        getUserInfo(response.session.user.id, (user) => {
          localStorage.setItem("user", JSON.stringify(user));
        });
      }
    }, settings);
  };

  const signOut = () => {
    return VK.Auth.logout(() => {
      setUser(null);
      setSignedIn(false);
      localStorage.setItem("user", null);
    });
  };

  return {
    VK,
    user,
    signIn,
    signedIn,
    signOut,
  };
}
