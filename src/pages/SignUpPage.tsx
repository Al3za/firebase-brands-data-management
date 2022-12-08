import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [authing, setAuthin] = useState<boolean>(false)

    
    const signUpWithEmailPassword = async () => {
        setAuthin(true)

        createUserWithEmailAndPassword(auth, email, password )
            .then(res => {
                console.log(res.user.uid);
                // remove this log when u deploy this app
                console.log(res.user.displayName)
                navigate('/login')
            }).catch((err) => {
                console.log(err)
                alert(err.code)
                setAuthin(false)
            })
    }

    return (
        <div>
            <h1>Sign Up page</h1>
            <p><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />email</p>
            <p><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />password</p>
            <p><button onClick={() => signUpWithEmailPassword()} disabled={authing} > Sign up with Email </button></p>

        </div>
    )

}

export default SignUpPage