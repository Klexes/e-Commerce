import React, { Component } from 'react'
import './style.scss'
import {Link} from 'react-router-dom'
import Button from '../Forms/Button'
import { signInWithGoogle, auth } from '../../firebase/utils'
import FormInput from '../Forms/FormInput'
import AuthWrapper from '../AuthWrapper'

const initialState = {
    email: '',
    password:'',
}



class SignIn extends Component {

    constructor(props){
        super(props)
        this.state = {
            ...initialState
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                ...initialState
            })
        } catch (error) {
            // console.log(error);
        }
    }

    render(){

        const {email, password} = this.state
        return (
            <AuthWrapper headline="LOGIN">
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
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
                    
                    <Button type="submit">
                        Login
                    </Button>

                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign In With Google
                                </Button>
                            </div>
                        </div>
                        <div className="links">
                            <Link to="/recovery">
                                    Reset Password
                            </Link>
                        </div>
                    </form>
                    </div>
            </AuthWrapper>
        )
    }
}

export default SignIn
