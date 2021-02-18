import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {resetPasswordStart, resetUserState} from '../../redux/User/user.actions';
import {useHistory} from 'react-router-dom';

const mapState = ({user})=>({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})


function PasswordReset() {

    const {resetPasswordSuccess,userErr} = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [state,setState] = useState(
        {
            email:"",
            errors:[]
        });

        useEffect(()=>{
            if(resetPasswordSuccess){
                dispatch(resetUserState());    
                history.push('/entrar');
            }
        
        },[resetPasswordSuccess,dispatch,history])
        
        useEffect(()=>{
            if(Array.isArray(userErr) && userErr.length > 0){
                setState(s=>({
                    ...s,
                    errors:userErr
                }))
            }
        },[userErr])

        const handleChange = e =>{
            const {name,value} = e.target;
            setState({
                ...state,
                [name]:value
            })
        }

        const handleSubmit = e =>{
            e.preventDefault();
            const {email} = state;
            dispatch(resetPasswordStart({email}));
                
          }

    return (
        <div className="formContainer">

         <form className="formLogin" onSubmit={handleSubmit}>
            <input onChange={handleChange} value={state.email} type="email" name="email" placeholder="Correo"/>    
            <button type="submit">Recuperar Contraseña</button>            
         </form>
       
         </div>
    )
}

export default PasswordReset
