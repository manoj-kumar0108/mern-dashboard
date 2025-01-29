import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import {FaUser,FaRegListAlt, FaHome } from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import { useAuth } from "../../store/auth";

function AdminLayout() {
   const { user, isLoading } = useAuth();
  console.log("adminlayout", user);
  
if(isLoading){
  return <h1>....Loading</h1>
}



if(!user.isAdmin){
  return <Navigate  to="/" />;
}



  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ui>
              <li>
                <NavLink to="/admin/users"> <FaUser/> Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts"> <FaMessage />Contacts</NavLink>
              </li>
              <li><NavLink to="/service"> <FaRegListAlt/>Services</NavLink></li>
              <li><NavLink to="/"><FaHome />Home</NavLink></li>
            </ui>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default AdminLayout;
