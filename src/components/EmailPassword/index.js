import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './style.scss'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'
import {auth} from '../../firebase/utils'

const intialState = {
    email:'',
    errors: []
}


class EmailPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...intialState
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event =>{
        event.preventDefault()

        try {
            const {email} = this.state
            const config = {
                url : 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail( email, config )
                .then(() => {
                    this.props.history.push('./login')
                })
                .catch(() => {
                    const err = ['User doesnot exist']
                    this.setState({
                        errors: err
                    })
                })

        } catch (error) {
            console.log(error)
        }
        
    }

    render() {

        const {email, errors} = this.state

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

                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                        type="email" 
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                        />
                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>

        )
    }
}

export default withRouter(EmailPassword);