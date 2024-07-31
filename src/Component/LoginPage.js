import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../Public/images/Sign.avif";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          // expiresInMins: 60, // optional
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem("isLoggedIn", false);
          if (data.token) {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            toast.success("Login successfully");
            navigate("/template");
          } else {
            toast.error(data.message);
          }
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("username and password required");
    }
  };

  return (
    <div
      className=" container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "600px" }}
      id="login"
    >
      <div>
        <form action="post" className=" p-4">
          <h4 className="text-center">Sign In</h4>
          <hr />
          <div>
            <label className="form-label">Username</label>
            <div>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Password</label>
            <div>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-warning w-100" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </form>
      </div>
      <div>
        <img src={image} alt="" width="500px" height="550px" />
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};
export default LoginPage;
