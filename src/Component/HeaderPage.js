import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderPage = () => {
  const navigate = useNavigate();
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  useEffect(() => {
    if (isLoggedIn || userInfo?.token) {
      navigate("/template");
    } else {
      navigate("/login");
    }
  }, []);
  const btnLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
    sessionStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };
  return (
    <div>
      <header
        className="d-flex justify-content-between bg-dark-subtle p-2"
        style={{ fontFamily: "fira code" }}
      >
        <div className="mt-2">
          <h5 className="bi bi-cart4 ms-2"> &nbsp;Shopper.com </h5>
        </div>
        <div className="mt-2">
          {isLoggedIn || userInfo?.token ? (
            <>
              <span data-bs-toggle="modal" data-bs-target="#person">
                <img
                  src={userInfo?.image}
                  alt="person"
                  height="20"
                  width="20"
                />{" "}
                {userInfo?.username}
              </span>
              <button
                className="btn btn-outline-primary ms-2"
                onClick={btnLogOut}
              >
                {"Log out"}
              </button>
            </>
          ) : (
            <>
              <span className="bi bi-search me-3"></span>
              <span className="bi bi-heart me-3"></span>
              <span className="bi bi-cart4"></span>
            </>
          )}
        </div>
      </header>
      <section>
        <div className="modal fade" id="person">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Personal Details</h4>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <img
                    src={userInfo?.image}
                    alt="person"
                    height="50"
                    width="50"
                  />
                  <hr />
                </div>
                <dl>
                  <dt>First Name</dt>
                  <dd>{userInfo?.firstName}</dd>
                  <dt>Last Name</dt>
                  <dd>{userInfo?.lastName}</dd>
                  <dt>Email:</dt>
                  <dd>{userInfo?.email}</dd>
                  <dt>Gender</dt>
                  <dd>{userInfo?.gender}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeaderPage;
