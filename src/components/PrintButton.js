import React from 'react'
import './ClientWorkspace.css'
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';


function PrintButton(props) {
    return (
        <div className='output__card'>
            <Button className='output__button'
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={props.printDivs}
            >
                Сохранить в PDF
            </Button> 
        </div>
    )
}

export default PrintButton
