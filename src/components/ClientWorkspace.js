import React, { useState , useEffect, useRef }  from 'react'
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
    const typeRender = useRef(false)
    const sumRender = useRef(false)
    const dateRender = useRef(false)
    const [buttonClick, setButtonClick] = useState(false)
    
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

    useEffect(() => {
        if (typeRender.current) {
            if (isEmptyType(name)) {
                setTypeError('error')
            } else {
                setTypeError('')
            }
        } else {
            typeRender.current = true;
        }   
    }, [name, buttonClick])

    useEffect(() => {
        if (sumRender.current) {
            if (isEmptySum(sum)) {
                setSumError('error')
            } else {
                setSumError('')
            }
        } else {
            sumRender.current = true;
        }   
    }, [sum, buttonClick])

    useEffect(() => {
        if (dateRender.current) {
            if (isEmptyDate(date)) {
                setDateError('error')
            } else {
                setDateError('')
            }
        } else {
            dateRender.current = true;
        }   
    }, [date, buttonClick])

    const isClicked = () => {
        setButtonClick(true)
    }

    const calculateRate = () => {
        let result = 0;
        isClicked();
        if (!isAllEmpty) {
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
                <InputName ref = {typeRender} depositDataProp = {data} nameProp={name} getType={getTypeOfDeposit} errorProp={typeError}/>          
                <InputNumber ref = {sumRender} labelProp = {'Сумма вклада:'} valueProp={sum} getValue={getSumFromInput} errorProp={sumError}/>
                <InputNumber ref = {dateRender} labelProp = {'Срок вклада:'} valueProp={date} getValue={getDateFromInput} errorProp={dateError}/>
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
