import React from 'react';
import {NavLink} from "react-router-dom";

const AdminNavbar = () => {
    return (
        <div>
            <ul style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100px',
                marginTop: '10px',
                backgroundColor: 'aqua'
            }}>
                <NavLink to='/admin'>Users</NavLink>
                <NavLink to='/admin/all-carousel-image'>Add Images</NavLink>
                <NavLink to='/admin/add-brands'>Add Brand</NavLink>
                <NavLink to='/admin/add-items'>Add Items</NavLink>
                <NavLink to='/admin/all-items'>All Items</NavLink>
            </ul>
        </div>
    );
};

export default AdminNavbar;