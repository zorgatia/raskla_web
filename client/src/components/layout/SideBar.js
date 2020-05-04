import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Fragment>
      <div className="nk-sidebar" style={{ top: "0px" }}>
        <div className="nk-nav-scroll">
          <ul className="metismenu" id="menu">
            <div className="brand-logo">
              <Link to="/dashboard">
                <img
                  src="logo.png"
                  alt=""
                  style={{ maxWidth: "220px", marginTop: "-2px" }}
                />
              </Link>
            </div>
            <li className="nav-label">Main</li>
            <li>
              <Link to="/dashboard">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/map">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Map</span>
              </Link>
            </li>
            <li>
              <Link to="/vendings">
                <i className=" mdi mdi-view-dashboard" />{" "}
                <span className="nav-text">Vending Machine</span>
              </Link>
            </li>
           

            
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
