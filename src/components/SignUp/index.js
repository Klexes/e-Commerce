import React, { useState } from 'react'
import { withRouter} from 'react-router-dom'
import './style.scss'
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button'
import {auth, handleUserProfile} from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper';

const SignUp = (props) => {

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState([])

    const reset = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmedPassword('')
        setErrors([])
    }


    const handleFormSubmit = async event => {
        event.preventDefault();        
        if(password !== confirmedPassword){
            const err = ['Passwords Don\'t match']
            setErrors(err)
            return;
        }
        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            
            await handleUserProfile(user, {displayName})

            reset()
            props.history.push('/')

        } catch (error) {
            // console.log(error)
        }
    }
    
    return(
        
        <AuthWrapper headline="REGISTRATION">                    

                <div className="formWrap">
                    
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                        return(
                            <li key={index}>
                                {err}
                            </li>
                        )
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput 
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    placeholder="Full Name" 
                    handleChange={e => setDisplayName(e.target.value)}
                    />
                    <FormInput 
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="Email" 
                    handleChange={e => setEmail(e.target.value)}
                    />
                    <FormInput 
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="Password" 
                    handleChange={e => setPassword(e.target.value)}
                    />
                    <FormInput 
                    type="password" 
                    name="confirmedPassword" 
                    value={confirmedPassword} 
                    placeholder="Confirm Password" 
                    handleChange={e => setConfirmedPassword(e.target.value)}
                    />
                    <Button type="submit">
                        Register
                    </Button>
                </form>
                </div>
        </AuthWrapper>
        )
    }

export default withRouter(SignUp);