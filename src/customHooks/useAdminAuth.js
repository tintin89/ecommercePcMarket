import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {checkUserIsAdmin} from '../Utils';

const mapState = ({user}) => ({
    currentUser:user.currentUser
});

const useAdminAuth = props => {
    const history = useHistory();
    const {currentUser} = useSelector(mapState);

    useEffect(()=>{
        if(!checkUserIsAdmin(currentUser)){
            history.push('/entrar');
        }

    },[currentUser,history])

    return currentUser;

}

export default useAdminAuth;