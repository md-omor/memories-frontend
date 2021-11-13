import decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/", {
      replace: true,
    });
    setuser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      // if (decodedToken.exp * 1000 < new Date().getItem()) {
      //   return logOut();
      // }
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
    setuser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div class="navbar mb-10 shadow-lg text-neutral-content rounded-box">
      <div class="flex-1 px-2 mx-2 lg:flex ml-24">
        <Link to="/">
          <span class="text-lg font-bold">MD OMOR</span>
        </Link>
      </div>

      {user ? (
        <div className="flex mr-24">
          <div class="avatar mx-4">
            {user.result.imageUrl ? (
              <div class="rounded-full w-10 h-10 m-1">
                <img src={user.result.imageUrl} alt={user.result.name} />
              </div>
            ) : (
              <div class="rounded-full w-10 h-10 m-1">
                <h1>{user.result.name}</h1>
              </div>
            )}
          </div>
          <h4 className="text-lg mx-4 font-semibold from-neutral-focus">
            {user.result.name}
          </h4>
          <button
            className="btn  btn-primary btn-active hover:bg-primary  ml-4"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex mr-24">
          <Link to="/auth">
            <div className="btn btn-primary btn-active hover:bg-primary ml-4 focus:outline-none focus:ring-2 ">
              Sign in
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
