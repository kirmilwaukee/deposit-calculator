import React from 'react'
import './ClientWorkspace.css'
import TextField from '@material-ui/core/TextField';


function OutputName(props) {
    return (
        <div className = 'output__card'> 
            <form  noValidate autoComplete="off">
                <TextField className='output__number'
                            label={props.labelProp}
                            defaultValue = {0}
                            InputProps= {{
                                readOnly: true,
                                value: props.calculateProp
                            }}
                            variant="filled"
                />                    
            </form>
        </div> 
    )
}

export default OutputName


