import Link from "next/link";
import { useState, useContext } from "react";
import DefaultLayout from "../../layouts";
import valid from "../../utils/validForm";
import { DataContext } from "../../stores/GlobalState";
import { postData } from "../../utils/fetchData";
import { useRouter } from "next/router";
const Register = (props) => {
  const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    passWord: "",
    cfPassWord: "",
    email: "",
    phoneNumber: "",
  };
  const [userData, setUserData] = useState(initialState);
  const {
    firstName,
    lastName,
    userName,
    passWord,
    cfPassWord,
    email,
    phoneNumber,
  } = userData;
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(
      firstName,
      lastName,
      userName,
      passWord,
      cfPassWord,
      email,
      phoneNumber
    );
    if (errMsg) return dispatch({ type: "NOFITY", payload: { error: errMsg } });
    dispatch({ type: "NOFITY", payload: { loading: true } });
    const res = await postData("auth/register", userData);
    if (res.err)
      return dispatch({ type: "NOFITY", payload: { error: res.err } });
    router.push("/user");
    return dispatch({ type: "NOFITY", payload: { success: res.msg } });
  };

  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-user">
          <div className="nls-container">
            <h2 className="nls-txt-title">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="nls-b-item">
                <div className="nls-form-group nls-input-50">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="nls-form-group nls-input-50">
                  <label htmlFor="">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChangeInput}
                  />
                </div>
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
                <div className="nls-form-group">
                  <label htmlFor="">Confirm password</label>
                  <input
                    type="password"
                    name="cfPassWord"
                    value={cfPassWord}
                    onChange={handleChangeInput}
                  />
                </div>
                <div>
                  <div className="nls-form-group ">
                    <button type="submit">Register</button>
                  </div>
                  <div className="nls-form-group ">
                    <Link href="/user">Back To Login</Link>
                  </div>
                </div>
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
      seo: { title: "Nelson - Register" },
      breakcrumb: {
        title: "Register",
        href: "/user/register",
      },
    },
  };
}
export default Register;
