import React from 'react'
import './Header.css'
import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {signOutUserStart} from '../../redux/User/user.actions';
import AdminBar from './AdminBar/AdminBar'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import {selectCartItemsCount} from '../../redux/Cart/cart.selector'

const mapState = (state) => ({    
     currentUser:state.user.currentUser,
     totalNumCartItems:selectCartItemsCount(state)
})

function Header() {
    const dispatch = useDispatch();
    const {currentUser,totalNumCartItems} = useSelector(mapState);

    const signOut = () =>{
        dispatch(signOutUserStart());
    }


    return (
        <div className="headerContainer">
            <AdminBar/>
            <div className="header">
            <div className="navBar">

             <div className="logo__navBar">
               <span>PcMARKET</span>
             </div>

            <div className="actions__navBar">
               <ul>
               <li>
                 <AddShoppingCartRoundedIcon/>
                 <NavLink to='/cart'>
                 {totalNumCartItems}
                 </NavLink>
             </li>
              <li>
                  <HomeRoundedIcon/>
                  <NavLink  exact to="/" activeClassName="active">
                    Inicio
                  </NavLink>
              </li>
             <li>
                 <SearchRoundedIcon/>
                 <NavLink to="/buscar" activeClassName="active">
                    Buscar
                 </NavLink>
             </li>
             
             { 
                currentUser && (
                    <li>   
                    <AccountCircleIcon/>               
                    <NavLink to="/dashboard" activeClassName="active">
                       Mi Cuenta
                    </NavLink>
                </li>
                )
                
             }
            <li>
                {
                    currentUser
                    ?
                    <> 
                    <ExitToAppRoundedIcon/>                  
                    <span onClick={()=>signOut()}>
                       Salir
                    </span>
                    </>
                    :
                    <>
                    <VpnKeyRoundedIcon/>
                    <NavLink to="/entrar" activeClassName="active">
                       Entrar
                    </NavLink>
                    </>
                }
                
            </li>                    
            </ul>
             </div>

        </div>

        </div>
        </div>
    )
}

export default Header
