import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/Context";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Header() {
  const { user, setUser } = useContext(AuthContext);
  const auth = getAuth();
  const nav = useNavigate();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          onClick={() => {
            nav("/");
          }}
        >
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="ml-2 language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="ml-2 loginPage">
          <span>
            {user ? (
              <span>{user.name.toUpperCase()}</span>
            ) : (
              <span
                onClick={() => {
                  nav("/login");
                }}
              >
                Login
              </span>
            )}
          </span>
          <hr />
        </div>
        {user && (
          <span
            className="ml-2"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  setUser("");
                  nav("/login");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Logout
          </span>
        )}
        <div
          onClick={() => {
            nav("/create");
          }}
          className="ml-2 sellMenu"
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
