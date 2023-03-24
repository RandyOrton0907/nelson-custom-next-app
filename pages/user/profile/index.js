import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../../layouts";
import { DataContext } from "../../../stores/GlobalState";
import { patchData } from "../../../utils/fetchData";
import valid from "../../../utils/validForm";
import { imageUpload } from "../../../utils/imageUpload";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Profile = (props) => {
  const initialSate = {
    firstName: "",
    lastName: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    passWord: "",
    cfPassWord: "",
  };
  const [Tab, setTab] = useState("dashboard");
  const [data, setData] = useState(initialSate);
  const router = useRouter();
  const {
    firstName,
    lastName,
    phoneNumber,
    address,
    passWord,
    cfPassWord,
    avatar,
  } = data;
  const { state, dispatch } = useContext(DataContext);
  const { auth, order } = state;
  useEffect(() => {
    if (auth.user)
      return setData({
        ...data,
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        avatar: auth.user.avatar,
        phoneNumber: auth.user.phoneNumber,
        address: auth.user.address,
      });
  }, [auth.user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist." },
      });

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image size is 1mb." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect." },
      });

    setData({ ...data, avatar: file });
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (passWord) {
      const errMsg = valid(
        firstName,
        lastName,
        auth.user.userName,
        passWord,
        cfPassWord,
        auth.user.email,
        phoneNumber
      );
      if (errMsg)
        return dispatch({ type: "NOFITY", payload: { error: errMsg } });
      updatePassword();
    }

    if (
      firstName !== auth.user.firstName ||
      lastName !== auth.user.lastName ||
      phoneNumber !== auth.user.phoneNumber ||
      avatar != auth.user.avatar
    )
      updateInfo();
  };
  const updatePassword = () => {
    dispatch({ type: "NOFITY", payload: { loading: true } });
    patchData("user/resetpassword", { passWord }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOFITY", payload: { error: res.msg } });
      return dispatch({ type: "NOFITY", payload: { success: res.msg } });
    });
  };

  const updateInfo = async () => {
    dispatch({ type: "NOFITY", payload: { loading: true } });
    let media = "";
    if (avatar) {
      media = await imageUpload([avatar]);
    }
    patchData(
      "user",
      {
        firstName,
        lastName,
        phoneNumber,
        address,
        passWord,
        cfPassWord,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOFITY", payload: { error: res.msg } });
      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOFITY", payload: { success: res.msg } });
    });
  };

  const handleLogout = () => {
    dispatch({ type: "NOFITY", payload: { loading: true } });

    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "ADD_ORDER", payload: {} });
    dispatch({ type: "NOFITY", payload: { success: "Logged Out!" } });
    return router.push("/");
  };

  if (!avatar) return null;
  if (!auth.user) return null;
  if (!order) return null;
  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-profile">
          <div className="nls-container">
            <div className="nls-b-profile">
              <div className="nls-b-prof-left">
                <ul>
                  <li>
                    {Tab === "dashboard" ? (
                      <button
                        type="button"
                        className="active"
                        onClick={() => {
                          setTab("dashboard");
                        }}
                      >
                        Dashboard
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setTab("dashboard");
                        }}
                      >
                        Dashboard
                      </button>
                    )}
                  </li>
                  <li>
                    {Tab === "order" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setTab("order");
                        }}
                        className="active"
                      >
                        Orders
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setTab("order");
                        }}
                      >
                        Orders
                      </button>
                    )}
                  </li>
                  <li>
                    {Tab == "account" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setTab("account");
                        }}
                        className="active"
                      >
                        Account Details
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setTab("account");
                        }}
                      >
                        Account Details
                      </button>
                    )}
                  </li>
                  <li>
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <div className="nls-b-prof-right">
                {Tab == "dashboard" ? (
                  <div className="nls-b-item active">
                    <div className="nls-b-header">
                      <h2>Dashboard</h2>
                    </div>
                    <div className="nls-b-body">
                      <span>
                        Hello,
                        <strong>
                          {auth.user.firstName + " " + auth.user.lastName}
                        </strong>
                      </span>
                      <span>
                        your account dashboard. you can easily check & view your
                        recent orders, manage your shipping and billing
                        addresses and edit your passWord and account details.
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {Tab == "order" ? (
                  <div className="nls-b-item active">
                    <div className="nls-b-header">
                      <h2>Orders</h2>
                    </div>
                    <div className="nls-b-body">
                      <table>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Order code </th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(order).length == 0 ? (
                            <tr className="nls-b-todo">
                              <td colSpan="6">No Data</td>
                            </tr>
                          ) : (
                            order.map((item, index) => (
                              <tr className="nls-b-todo" key={index}>
                                <td>{index}</td>
                                <td>{item._id}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                  {item.delivered == false
                                    ? "Pending"
                                    : "resolved"}
                                </td>
                                <td>${item.total}</td>
                                <td>
                                  <Link href={`/checkout/${item._id}`}>
                                    Views
                                  </Link>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="nls-b-footer"></div>
                  </div>
                ) : (
                  ""
                )}
                {Tab == "account" ? (
                  <div className="nls-b-item active">
                    <div className="nls-b-header">
                      <h2>Account Details</h2>
                    </div>
                    <div className="nls-b-body">
                      <div className="nls-avatar">
                        <img
                          src={
                            typeof avatar == "object"
                              ? window.URL.createObjectURL(avatar)
                              : auth.user.avatar
                          }
                        />
                        <div>
                          <input
                            type="file"
                            name="file"
                            id="file_up"
                            accept="image/*"
                            onChange={changeAvatar}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="nls-b-footer">
                      <form>
                        <div>
                          <div className="nls-form-group nls-input-50">
                            <label>FirstName</label>
                            <input
                              type="text"
                              name="firstName"
                              value={firstName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="nls-form-group nls-input-50">
                            <label>LastName</label>
                            <input
                              type="text"
                              name="lastName"
                              value={lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="nls-form-group">
                          <label>UserName</label>
                          <input
                            type="text"
                            name="userName"
                            value={auth.user.userName}
                            disabled={true}
                            readOnly
                          />
                        </div>
                        <div>
                          <div className="nls-form-group nls-input-50">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              value={auth.user.email}
                              disabled={true}
                              readOnly
                            />
                          </div>
                          <div className="nls-form-group nls-input-50">
                            <label>PhoneNumber</label>
                            <input
                              type="text"
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="nls-form-group">
                          <label>Addresses</label>
                          <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="nls-form-group">
                          <label>New password</label>
                          <input
                            type="password"
                            name="passWord"
                            value={passWord}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="nls-form-group">
                          <label>Confirm New password</label>
                          <input
                            type="password"
                            name="cfPassWord"
                            value={cfPassWord}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="nls-form-group">
                          <button type="button" onClick={handleUpdateProfile}>
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};
export async function getStaticProps() {
  return {
    props: {
      seo: { title: "Nelson - Profile" },
      breakcrumb: {
        title: "Profile",
        href: "/user",
      },
    },
  };
}
export default Profile;
