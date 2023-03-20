import React from 'react';
import AdminNavbar from "./AdminNavbar";
import {Outlet} from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <AdminNavbar/>
        <div style={{width: '80%'}}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Admin;