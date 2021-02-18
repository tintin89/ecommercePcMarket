import React,{useState,useEffect} from 'react'
import './LoginComponents.css'
import {NavLink,useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {emailSignInStart,googleSignInStart} from '../../redux/User/user.actions'



const mapState = ({user}) =>({
    currentUser:user.currentUser
})

function SignIn() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);
    const [state, setState] = useState({
        email:"",
        password:""
    })

    useEffect(()=>{
        if(currentUser){
            setState({
                email:"",
                password:""
            });
            history.push('/');            
               }

    },[currentUser,dispatch,history])

    const handleSubmit = e =>{
        e.preventDefault();
        const {email,password} = state;
        dispatch(emailSignInStart({email,password}));
    }

    const handleOnchange = e =>{
        e.preventDefault();
        const {name,value} = e.target;
        setState({
            ...state,
            [name]:value
        })
    }

    const handleGoogleSignIn = () =>{
        dispatch(googleSignInStart());
    }


    return (
         <div className="formContainer">
             <form className="formLogin" onSubmit={handleSubmit}>
                 <input value={state.email} onChange={handleOnchange} type="email" name="email" placeholder="Correo"/>
                 <input value={state.password} onChange={handleOnchange} type="password" name="password" placeholder="Contraseña"/>
                 <button type="submit">Entrar</button>
                 <button type="button" onClick={handleGoogleSignIn}>Entrar con Google</button>
                 <NavLink to="/registro">Registrarse</NavLink>
                 <NavLink to="/recuperar">Recuperar Contraseña</NavLink>
             </form>
            
        </div>
    )
}

export default SignIn
