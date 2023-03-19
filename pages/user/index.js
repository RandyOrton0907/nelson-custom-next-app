import Link from "next/link";
import DefaultLayout from "../../layouts";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../stores/GlobalState";
import Cookies from "js-cookie";
import { postData } from "../../utils/fetchData";
import { useRouter, Router } from "next/router";

const Login = (props) => {
  const initialState = {
    userName: "",
    passWord: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { userName, passWord } = userData;
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOFITY", payload: { loading: true } });
    const res = await postData("auth/login", userData);
    if (res.err)
      return dispatch({ type: "NOFITY", payload: { error: res.err } });

    dispatch({ type: "NOFITY", payload: { success: res.msg } });
    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        refresh: res.refresh_token,
        user: res.user,
      },
    });

    Cookies.set("refreshToken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) Router.push("/");
  }, [auth]);

  return (
    <>
      <DefaultLayout seo={props.seo}>
        <section className="nls-s-user">
          <div className="nls-container">
            <h2 className="nls-txt-title">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="nls-b-item">
                <div className="nls-form-group">
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="passWord"
                    value={passWord}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="nls-form-group nls-input-50">
                  <button type="submit">Login</button>
                </div>
                <div className="nls-form-group nls-input-50">
                  <Link href="/user/register">
                    <button type="button">Register</button>
                  </Link>
                </div>
                <Link href="/user/forgot" className="nls-txt">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};
export async function getStaticProps() {
  return {
    props: {
      seo: { title: "Nelson - Login" },
      breakcrumb: {
        title: "Login",
        href: "/user",
      },
    },
  };
}

export default Login;
