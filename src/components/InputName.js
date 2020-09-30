import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './InputName.css'

function InputName(props) {
    return (
        <div className = 'input__card'>
            <FormControl variant="filled" className='input__type'>
                <InputLabel>Выберете тип вклада:</InputLabel>
                <Select
                    error={props.errorProp}
                    value={props.nameProp}
                    onChange={props.getType}>
                    {
                        props.depositDataProp.deposits.map(codeOfDeposit => {
                            return(
                                <MenuItem key ={codeOfDeposit.code} value={codeOfDeposit.name}>{codeOfDeposit.name}</MenuItem>        
                            )
                        })
                    }
                </Select>
            </FormControl>    
        </div>
    )
}

export default InputName
