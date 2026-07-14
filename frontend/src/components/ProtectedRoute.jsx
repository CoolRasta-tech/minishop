import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute({adminOnly = false}){
    const {user, loading} = useAuth();

    if(loading) {
        return <Spinner />
    }

    if(!user){
        return <Navigate to='/login' replace />
    }

    if(adminOnly && user.role !== 'admin'){
        return <Navigate to='/' replace />
    }

    return <Outlet />
}