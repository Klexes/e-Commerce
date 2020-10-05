import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { withRouter} from 'react-router-dom'
import './style.scss'
import { SignUpUser, resetAllAuthForms } from '../../redux/User/user.actions'
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button'

import AuthWrapper from '../AuthWrapper';

const mapState = ({user}) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError,
})

const SignUp = (props) => {
    const { signUpError, signUpSuccess} = useSelector(mapState)
    const dispatch = useDispatch()
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(signUpSuccess) {
            reset()
            dispatch(resetAllAuthForms())
            props.history.push('/')
        }
    },[signUpSuccess])

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError)
        }
    },[signUpError])

    const reset = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmedPassword('')
        setErrors([])
    }


    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(SignUpUser({
            displayName,
            email,
            password,
            confirmedPassword
        }))        

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