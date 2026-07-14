import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function Register(){
    const[username,setUsername]=useState('');
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] =useState('');
    const[loading, setLoading] = useState(false);

    const {register} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            await register(username,email,password);
            navigate('/');
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className = "auth-page">
            <form onSubmit ={handleSubmit} className ="auth-form">
                <h2>Registrati</h2>

                {error && <p className="error">{error}</p>}

                <input
                type="text"
                placeholder="UserName"
                value ={username}
                onChange ={(e)=> setUsername(e.target.value)}
                required />

                <input
                type="email"
                placeholder="Email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                required />

                <input
                type="password"
                placeholder="Password"
                value = {password}
                onChange ={(e)=> setPassword(e.target.value)}
                required />

                <button type="submit" disabled={loading}>
                    {loading ? 'Registrazione in corso...': 'Registrati'}
                </button>

                <p className="auth-switch">
                    Hai già un account? <Link to ="/login">Accedi</Link>
                </p>
            </form>
        </div>
    );
}