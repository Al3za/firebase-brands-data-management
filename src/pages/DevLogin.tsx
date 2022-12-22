import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../App';



const LoginPage = () => {

    const DevAuth = getAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [authing, setAuthin] = useState<boolean>(false)


   const SignInWithEmailPassword = () => {
        signInWithEmailAndPassword(DevAuth, email, password)
            .then(async(userCredentals) => {
                setAuthin(true)
                const DevUser = userCredentals.user.uid
                const docDir= `DevData/${DevUser}`
                const docRef = doc(db, docDir);
                await setDoc(docRef,{DevUser:DevUser})
                navigate('/test')
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
            



        </div>
    )
}

export default LoginPage

    //https://renzoregio.medium.com/sign-in-with-google-or-github-using-firebase-signinwithpopup-38d0917a76c0
