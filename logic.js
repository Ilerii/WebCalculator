const calculator = document.querySelector('#base')
const calcKey = calculator.querySelector('#keys')
const display = calculator.querySelector('#screen')
const operatorKeys = calcKey.querySelectorAll('[data-type="operator"]')

calcKey.addEventListener('click', event => {
    
    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

    
    if (type === 'number') {
        if (
          displayValue === '0' ||
          previousKeyType === 'operator'
        ) {
          display.textContent = keyValue
        } else {
          display.textContent = displayValue + keyValue
        }
      }
    
      if (type === 'operator') {
        operatorKeys.forEach(el => { el.dataset.state = '' })
        key.dataset.state = 'selected'
    
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
      }
    
      if (type === 'equal') {
        // Perform a calculation
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent = calculate(firstNumber, operator, secondNumber)
      }
      if (type === 'clear') {
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
      }
    
      calculator.dataset.previousKeyType = type
} )


function calculate(firstNum, operator, secondNum){
    firstNumber = parseInt(firstNum)
    secondNumber = parseInt(secondNum)

    if(operator === "plus"){
        return firstNumber + secondNumber
    }
    if(operator === "minus"){
        return firstNumber - secondNumber
    }
    if(operator === "div"){
        return firstNumber / secondNumber
    }
    if(operator === "mult"){
        return firstNumber * secondNumber
    }

}