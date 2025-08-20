import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import client from "../../Client/Client";
import toast from "react-hot-toast";

const Sidebar = ({ open, toggleSidebar, setAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleLogout = async () => {
    try {
      const res = await client.post(
        "/admins/logout",

        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("tokenExpiration");
        setAdmin(null);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        toast.error("Token is invalid.Login again");
      } else {
        toast.error("Try again");
      }
    }
  };
  return (
    <Fragment>
      <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "active" : "collapsed"}`}
              to="/"
            >
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

        
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/service") ? "active" : "collapsed"
              }`}
              to="/service"
            >
            <i class="bi bi-box-seam"></i>
              <span>Service</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/business") ? "active" : "collapsed"
              }`}
              to="/business"
            >
         <i class="bi bi-layout-text-window"></i>
              <span>Business</span>
            </Link>
          </li>


  

          <li className="nav-heading">Manage</li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/service") ? "active" : "collapsed"
              }`}
              to="/manage/service"
            >
             <i class="bi bi-box-seam"></i>
              <span>Manage Service</span>
            </Link>
          </li>

          

            <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/business") ? "active" : "collapsed"
              }`}
              to="/manage/business"
            >
            <i class="bi bi-layout-text-window"></i>
              <span>Manage Business</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/user-contact") ? "active" : "collapsed"
              }`}
              to="/manage/user-contact"
            >
              <i class="bi bi-person-circle"></i>
              <span>User Contact</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/contact") ? "active" : "collapsed"
              }`}
              to="/manage/contact"
            >
              <i class="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <Button
          variant="contained"
          color="error"
          style={{
            marginTop: "20px",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span
            style={{
              marginLeft: "5px",
            }}
          >
            Logout
          </span>
        </Button>
      </aside>
      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </Fragment>
  );
};

export default Sidebar;
