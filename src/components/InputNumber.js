import React from 'react'
import './InputNumber.css'
import TextField from '@material-ui/core/TextField';

function InputNumber(props) {
    return (
        <div className = 'input__card'> 
            <form  noValidate autoComplete="off">
                <TextField className='input__number'
                    error={props.errorProp}
                    label={props.labelProp}
                    type="number"
                    value={props.valueProp}
                    onChange={props.getValue}
                    variant="filled"
                />                    
            </form>
        </div> 
    )
}

export default InputNumber
