import React from 'react'
import {NavLink} from 'react-router-dom'
import './AdminBar.css'
import {useSelector} from 'react-redux'
import {checkUserIsAdmin} from '../../../Utils/'

const mapState = ({user}) => ({
  currentUser:user.currentUser
})

function AdminBar() {
  const {currentUser} = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);
    
    if(!isAdmin) return null;

    return (
        <div className="adminBar">
           <NavLink to="/admin">
             Administrar    
           </NavLink>             
        </div>
    )
}

export default AdminBar
