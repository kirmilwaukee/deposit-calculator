import React, {useState}  from 'react'
import './ClientWorkspace.css'
import Button from '@material-ui/core/Button';
import data from '../data/depcalc.json';
import InputName from './InputName'
import InputNumber from './InputNumber'
import OutputName from './OutputName'
import PrintButton from './PrintButton'
import { jsPDF } from "jspdf";

function ClientWorkspace() {
    
    const [name, setName] = useState('');
    const [sum, setSum] = useState('');
    const [date,setDate] = useState('');
    const [typeError, setTypeError] = useState('')
    const [sumError, setSumError] = useState('')
    const [dateError, setDateError] = useState('')
    const [rate, setRate] = useState(0)
    const [income, setIncome] = useState(0)
    const [isReadyToPrint, setIsReadyToPrint] = useState(false)
    
    const getTypeOfDeposit = (event) => {
        setName(event.target.value);
    } 

    const isEmptyType = (name) => {
        return (name === '') ? true : false;
    }    
    
    const getSumFromInput = (event) => {
        setSum(event.target.value);
    }

    const isEmptySum = (sum) => {
        return (sum === '') ? true : false;
    }
    
    const getDateFromInput = (event) => {
        setDate(event.target.value);
    }

    const isEmptyDate = (date) => {
        return (date === '') ? true : false;
    }

    const isAllEmpty = isEmptyType(name) && isEmptySum(sum) && isEmptyDate(date)

    const calculateRate = () => {
        let result = 0;
        if (isAllEmpty) {
            if (isEmptyType(name)) {
                setTypeError('error')
            } else {
                setTypeError('')
            }
            if (isEmptySum(sum)) {
                setSumError('error')
            } else {
                setSumError('')
            }
            if (isEmptyDate(date)) {
                setDateError('error')
            } else {
                setDateError('')
            }
        } else {
            if (!isEmptyType(name)) {
                setTypeError('')
            } 
            if (!isEmptySum(sum)) {
                setSumError('')
            } 
            if (!isEmptyDate(date)) {
                setDateError('')
            }
            if (parseInt(date) >= data.deposits.find(currentName => currentName.name === name).param[0].period_from) {
                for (let i = 0; i < data.deposits.find(currentName => currentName.name === name).param.length; i++) {
                    if (parseInt(date) >= data.deposits.find(currentName => currentName.name === name).param[i].period_from &&
                    parseInt(sum) >= data.deposits.find(currentName => currentName.name === name).param[i].summs_and_rate[0].summ_from ) 
                    {
                        for (let j = 0; j < data.deposits.find(currentName => currentName.name === name).param[i].summs_and_rate.length; j++) {
                            if (parseInt(sum) >= data.deposits.find(currentName => currentName.name === name).param[i].summs_and_rate[j].summ_from) {
                                result = parseInt(sum) * data.deposits.find(currentName => currentName.name === name).param[i].summs_and_rate[j].rate / 100;
                                setSumError('');
                                setRate(data.deposits.find(currentName => currentName.name === name).param[i].summs_and_rate[j].rate)
                                setIncome(Math.round(result))
                                setIsReadyToPrint(true)
                            } 
                        }
                    } else if (parseInt(sum) < data.deposits.find(currentName => currentName.name === name).param[i].summs_and_rate[0].summ_from){
                        setSumError('error')
                    }
                }
            } else {
                setDateError('error')
            }
        }
        return result
    }

    const getDataInPDF = () => {
        if (isReadyToPrint) {
            const doc = new jsPDF();
        doc.text(` Your rate: ${rate} Your income: ${income}`, 10, 10);
        doc.save("Итог калькуляции.pdf");
        setIsReadyToPrint(false)
        }
    }
      
    return (
        <div className = 'client__workspace'>
            <div className = 'input__workspace'>
                <InputName depositDataProp = {data} nameProp={name} getType={getTypeOfDeposit} errorProp={typeError}/>          
                <InputNumber labelProp = {'Сумма вклада:'} valueProp={sum} getValue={getSumFromInput} errorProp={sumError}/>
                <InputNumber labelProp = {'Срок вклада:'} valueProp={date} getValue={getDateFromInput} errorProp={dateError}/>
            </div>
            <div className = 'proccessing__space'>
                <Button variant = 'outlined'
                onClick={calculateRate}>
                    Рассчитать процентную ставку
                </Button>
            </div>            
            <div className = 'output__workspace'>
                <OutputName id = 'printfirst' labelProp = {'Процентная ставка:'} calculateProp = {rate}/>
                <OutputName id = 'printsecond' labelProp = {'Доход в рублях:'} calculateProp = {income}/>
                <PrintButton printDivs = {getDataInPDF}/>
            </div>
        </div>
    )
}

export default ClientWorkspace
