import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import './style.scss'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'
import {auth} from '../../firebase/utils'

const EmailPassword = (props) => {

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])


    const handleSubmit = async event =>{
        event.preventDefault()

        try {
            const config = {
                url : 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail( email, config )
                .then(() => {
                    props.history.push('./login')
                })
                .catch(() => {
                    const err = ['User doesnot exist']
                    setErrors(err)
                })

        } catch (error) {
            console.log(error)
        }
        
    }

        return (
            <AuthWrapper headline="Email Password">
                <div className="formWrap">
                    
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormInput 
                        type="email" 
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => {setEmail(e.target.value)}}
                        />
                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>

        )
    }

export default withRouter(EmailPassword);