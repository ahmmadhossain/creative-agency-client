import React, { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebase from "./firebase.config";
import Google from "../../images/icons/google.png";
import Logo from "../../images/logos/logo.png";
import "./Login.css";

const handleGoogleSignIn = () => {
const provider = new firebase.auth.GoogleAuthProvider();

return firebase
  .auth()
  .signInWithPopup(provider)
  .then(function (result) {
    const user = result.user;
    return user;
  })
  .catch(function (error) {
    return error.message;
  });
};

const handleGoogleSignOut = () => {
return firebase
  .auth()
  .signOut()
  .then(function () {
    return true;
  })
  .catch(function (error) {
    return error.message;
  });
};

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || {
    from: {
      pathname: "/",
    },
  };

  const isAdmin = (email) => {
    return fetch("https://my-creative-agency.herokuapp.com/isAdmin", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch(() => alert("An Error occurred"));
  };

  const googleLogin = () => {
    let userInfo = { ...loggedInUser };
    handleGoogleSignIn()
      .then((result) => {
        if (result.email) {
          userInfo.isLoggedIn = true;
          userInfo.name = result.displayName;
          userInfo.email = result.email;
          userInfo.image = result.photoURL;
          userInfo.error = null;
          isAdmin(result.email).then((data) => {
            userInfo.isAdmin = data;
            setLoggedInUser(userInfo);
            history.replace(from);
          });
        } else {
          userInfo.error = result;
        }
        setLoggedInUser(userInfo);
      })
      .catch(() => {
        userInfo.error = "An Error occurred";
        setLoggedInUser(userInfo);
      });
  };

  const googleLogout = () => {
    const userInfo = { ...loggedInUser };
    handleGoogleSignOut().then((result) => {
      if (result === true) {
        userInfo.isLoggedIn = false;
        userInfo.name = null;
        userInfo.email = null;
        userInfo.error = null;
      } else {
        userInfo.error = result;
      }
      setLoggedInUser(userInfo);
    });
  };

  return (
    <>
      <Link to="/">
        <Image src={Logo} className="w-25 d-block mx-auto mt-3" />
      </Link>
      <div className="mt-5 login text-center  ">
        {loggedInUser.error && (
          <p className="text-danger">{loggedInUser.error}</p>
        )}
        {loggedInUser.isLoggedIn && (
          <>
            <p className="text-success">{loggedInUser.name} is now logged in </p>
            <Link to="/">
              <Button variant="danger" onClick={googleLogout}>
                  Log out
              </Button>
            </Link>
          </>
        )}
        {loggedInUser.isLoggedIn === false && (
          <>
            <h1>Login With</h1>
            <div className="google mt-4 ">
              <Button
                variant="light"
                onClick={googleLogin}
                className="google-border"
              >
                <Image src={Google} />
                Continue with google
              </Button>
              <p>
                Don't have an account?{" "}
                <Button
                  className="btn btn-light"
                  variant="primary"
                  onClick={googleLogin}
                >
                  Create an account
                </Button>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
