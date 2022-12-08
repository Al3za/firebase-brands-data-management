import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [authing, setAuthin] = useState<boolean>(false)


   const SignInWithEmailPassword = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentals) => {
                setAuthin(true)
                const user = userCredentals.user.displayName
                console.log(user,'ciao')
                navigate('/')
            }).catch((error) => {
                const errorCode = error.code
                alert(errorCode)
                setAuthin(false)
       })
    }

    return (
        <div>
            <p> Login Page </p>
            
            <p><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />email</p>
            <p><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />password</p>

            <p><button onClick={() => SignInWithEmailPassword()} disabled={authing} > Log In with Email </button></p>
            dont have an account?
            <button onClick={()=> navigate('/signUp')} > Sign Up </button>



        </div>
    )
}

export default LoginPage

    //https://renzoregio.medium.com/sign-in-with-google-or-github-using-firebase-signinwithpopup-38d0917a76c0
