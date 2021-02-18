import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {signUpUserStart} from '../../redux/User/user.actions'
import './LoginComponents.css'


const mapState = ({user}) => ({
    currentUser:user.currentUser,
    userErr:user.userErr
})

function SignUp() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {currentUser,userErr} = useSelector(mapState);
    const [state, setState] = useState(
        {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
            errors:[]
        }
    )

    useEffect(()=>{
        if(currentUser){
            setState({
                displayName:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            history.push('/');
            
        }

    },[currentUser,dispatch,history])

    useEffect(()=>{
        if(Array.isArray(userErr) && userErr.length > 0){
            setState(s=>({
                ...s,
                errors:userErr
            }))
        }

    },[userErr])

    const handleChange = (e)=> {
        const {name,value} = e.target;
        setState({
            ...state,
            [name]:value
        }) 

    }

    const handleFormSubmit = e =>{
        e.preventDefault();

        const {displayName,email,password,confirmPassword} = state;

        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }))  
    }


    return (
        <div className="formContainer">
             <form className="formLogin" onSubmit={handleFormSubmit}>
                 <input value={state.displayName} onChange={handleChange} type="text" name="name" placeholder="Nombre"/>
                 <input value={state.email} onChange={handleChange} type="email" name="email" placeholder="Correo"/>
                 <input value={state.password} onChange={handleChange} type="password" name="password" placeholder="Contraseña"/>
                 <input value={state.confirmPassword} onChange={handleChange} type="password" name="password" placeholder="Confirmar Contraseña"/>
                 <button type="submit">Registrar</button>                                
             </form>            
        </div>
    )
}

export default SignUp
