import React from 'react'
import './style.scss'

function FormInput({handleChange, label, ...otherProps}) {
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}
            <input className="form-input" onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default FormInput
