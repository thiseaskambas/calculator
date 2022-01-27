function add(a, b) {
   return a + b
}

function substract(a, b) {
   return a - b
}

function multiply(a, b) {
   return a * b
}

function divide(a, b) {
   return a / b
}

function operate(action, a, b) {
   return action(a, b)
}


const digits = document.querySelectorAll('.digit')
const screen = document.querySelector('#screen')
let firstValue = 0;
let secondValue = 0;
let operation = '';
let firstClickAfterAction = true;

digits.forEach(digit => {
   digit.addEventListener('click', (e) => {
      if (screen.innerText === '0') {
         screen.innerText = ''
      }
      if (!operation) {
         screen.innerText += e.target.innerText;
      } else if (firstClickAfterAction) {
         screen.innerText = e.target.innerText;
         firstClickAfterAction = false
      } else {
         screen.innerText += e.target.innerText;
      }
   })
})

const actions = document.querySelectorAll('.action')
actions.forEach(action => {
   action.addEventListener('click', (e) => {
      if (!firstValue) {
         firstValue = Number(screen.innerText);
         operation = e.target.innerText
      } else {
         calculate(e)
         operation = e.target.innerText
      }
      console.log('operation: ', operation)
      console.log('firstValue: ', firstValue)
      console.log('secondValue: ', secondValue)
   })

})

const opperateBtn = document.querySelector('#operate')
opperateBtn.addEventListener('click', calculate)


function calculate(e) {
   secondValue = Number(screen.innerText);
   switch (operation) {
      case '/':
         screen.innerText = operate(divide, firstValue, secondValue);
         break;
      case '*':
         screen.innerText = operate(multiply, firstValue, secondValue);
         break;
      case '-':
         screen.innerText = operate(substract, firstValue, secondValue);
         break;
      case '+':
         screen.innerText = operate(add, firstValue, secondValue);
         break;
   }
   operation = '';
   firstValue = Number(screen.innerText);
   firstClickAfterAction = true
}

// console.log('operation: ', operation)
// console.log('firstValue: ', firstValue)
// console.log('secondValue: ', secondValue)
// console.log(firstClickAfterAction)