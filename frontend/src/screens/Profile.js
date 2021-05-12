import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, updateMe } from "../store/auth/actions";
import { Link } from "react-router-dom";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const { token } = useSelector((state) => state.login);
  const { success } = useSelector((state) => state.profile);
  const { userInfo, loading, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      if (!userInfo) {
        dispatch(getMe());
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
        setGender(userInfo.gender);
      }
    } else {
      history.push("/login");
    }
  }, [userInfo, dispatch, history, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMe({ name, email, phone, gender }));
  };

  return (
    <div className="profile_section my-3">
      <div className="container flex">
        <div class="user_profile">
          {userInfo && (
            <div class="form">
              {loading && <h2>Loading...</h2>}
              {success && (
                <h2>
                  <i style={{ color: "green" }} class="fas fa-check"></i>{" "}
                  Updated successfully
                </h2>
              )}
              {error && <h2>{error}</h2>}
              <img src={userInfo.avatar} alt={userInfo.name} />
              <form onSubmit={onSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    value={phone}
                    placeholder="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div
                  class="form-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <select name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <button className="btn">
                  <i class="fas fa-edit"></i> Update
                </button>
              </form>
            </div>
          )}
        </div>
        <div class="user_order">
          <table>
            <tr>
              <th>
                <i class="fas fa-id"></i> Id
              </th>
              <th>
                <i class="fas fa-clock"></i> Date
              </th>
              <th>
                <i class="fas fa-dollar"></i> Total
              </th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Vew</th>
            </tr>
            <tr>
              <td>1</td>
              <td>2020-12-13</td>
              <td>204.2</td>
              <td>
                <i style={{ color: "green" }} class="fas fa-check"></i>
              </td>
              <td>
                <i style={{ color: "green" }} class="fas fa-check"></i>
              </td>
              <td>
                <Link to="" class="btn btn-sm">
                  <i class="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>2021-1-13</td>
              <td>70</td>
              <td>
                <i style={{ color: "green" }} class="fas fa-check"></i>
              </td>
              <td>
                <i style={{ color: "red" }} class="fas fa-times"></i>
              </td>
              <td>
                <Link to="" class="btn btn-sm">
                  <i class="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
