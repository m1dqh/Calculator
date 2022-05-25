"use strict";
const calcNumbers = document.querySelector('.calculator__buttons');
const calcOutputScreen = document.querySelector('.calculator__output');
const calcCurrentOperand = calcOutputScreen.querySelector('.current-operand');
const calcAllClear = calcNumbers.querySelector('.all-clear-btn');
const calcAllOperands = calcNumbers.querySelectorAll('.operand-btn');

function clearOutput(display) {
    display.textContent = '0';
}

function deleteNum(num) {
    let removeLastNumber = num.slice(0, -1);
    calcCurrentOperand.textContent = `${removeLastNumber}` || 0;
}

function appendNumbersToOutput(num) {
    if (calcCurrentOperand.textContent[0].includes('0')) {
        calcCurrentOperand.textContent = '';
    } else if (calcCurrentOperand.textContent.includes('.') && num === '.') {
        return;
    }
    calcCurrentOperand.textContent += `${num}`;
}

function compute(a, operand, b) {
    switch (operand) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '÷':
            return a / b;
            break;
        default:
            console.log('not an operator');
    }
}

function resetOperand() {
    calcAllOperands.forEach(operand => {
        operand.classList.remove('selected-operator');
    })
}

function resetDatasets(display) {
    delete display.dataset.newValue;
    delete display.dataset.oldValue;
    delete display.dataset.mathOperator;
}

let result = 0;

calcNumbers.addEventListener('click', e => {
    let display = calcCurrentOperand;
    let displayText = calcCurrentOperand.textContent;
    display.dataset.newValue = displayText;

    // Check if users click between grid gap
    if (e.target === e.currentTarget) return;

    // Check if users click a Number Button
    if (e.target.classList.contains('number-btn')) {
        if (result !== 0) {
            result = 0;
            clearOutput(display);
        }
        appendNumbersToOutput(e.target.textContent);
    }

    // Check if user click "AC" Button
    if (e.target.classList.contains('all-clear-btn')) {
        clearOutput(display);
        resetDatasets(display);
        resetOperand();
    }

    // Check if user click "DEL" Button
    if (e.target.classList.contains('delete-btn')) {
        deleteNum(displayText);
    }

    // Check if user click an Operand Button
    if (e.target.classList.contains('operand-btn')) {
        if (displayText !== '0') {
            display.dataset.oldValue = displayText;
        }
        display.dataset.mathOperator = e.target.textContent;
        resetOperand();
        e.target.classList.add('selected-operator')
        clearOutput(display);
    }

    // Check if user click "Equal(=)" Button
    if (e.target.classList.contains('equals-btn')) {
        const oldValue = display.dataset.oldValue;
        const mathOperator = display.dataset.mathOperator;
        const newValue = display.dataset.newValue;
        resetOperand();
        result = compute(parseFloat(oldValue), mathOperator, parseFloat(newValue));
        display.textContent = result.toLocaleString('en-EN');
    }
});
