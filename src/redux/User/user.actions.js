import userTypes from './user.types'
import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils'

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload:user
})


// since it a asynd funciton inside the function which dispatches it we have to use redux-thunk middleware
export const SignInUser = ({email, password}) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        })
    } catch (error) {
        // console.log(error);
    }

}


export const SignUpUser = ({email, password, confirmedPassword, displayName}) => async dispatch => {
    if(password !== confirmedPassword){
        const err = ['Passwords Don\'t match']
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        })
        return;
    }
    try {

        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        
        await handleUserProfile(user, {displayName})

        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })

    } catch (error) {
        // console.log(error)
    }
}

export const resetPassword= ({email}) => async dispatch => {
        const config = {
            url : 'http://localhost:3000/login'
        }            

        try {
        await auth.sendPasswordResetEmail( email, config )
            .then(() => {
                // props.history.push('./login')
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                const err = ['User doesnot exist']
                dispatch({
                    type : userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
                // setErrors(err)
            })

        } catch (error) {
            console.log(error)
        }
} 

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)        
        .then(() => {
            dispatch({
                type: userTypes.SIGN_IN_SUCCESS,
                payload: true
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS,
}) 