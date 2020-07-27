import React, { Component } from 'react'
import './style.scss'
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button'
import {auth, handleUserProfile} from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper';

const intialState = {
    displayName: '',
    email: '',
    password:'',
    confirmedPassword:'',
    errors:[]
}
export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            ...intialState
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
        this.handleChange = this.handleChange.bind(this)
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmedPassword, errors} = this.state
        
        if(password !== confirmedPassword){
            const err = ['Passwords Don\'t match']
            this.setState({
                errors: err
            })
            return;
        }
        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            
            await handleUserProfile(user, {displayName})

            this.setState({
                ...intialState
            })

        } catch (error) {
            // console.log(error)
        }
    }
    
    render(){
        const {displayName, email, password, confirmedPassword, errors} = this.state
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
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput 
                        type="text" 
                        name="displayName" 
                        value={displayName} 
                        placeholder="Full Name" 
                        onChange={this.handleChange}
                        />
                        <FormInput 
                        type="email" 
                        name="email" 
                        value={email} 
                        placeholder="Email" 
                        onChange={this.handleChange}
                        />
                        <FormInput 
                        type="password" 
                        name="password" 
                        value={password} 
                        placeholder="Password" 
                        onChange={this.handleChange}
                        />
                        <FormInput 
                        type="password" 
                        name="confirmedPassword" 
                        value={confirmedPassword} 
                        placeholder="Confirm Password" 
                        onChange={this.handleChange}
                        />
                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                    </div>
            </AuthWrapper>
        )
    }
}