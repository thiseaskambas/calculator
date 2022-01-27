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
let firstClickAfterAction = false;

digits.forEach(digit => {
   digit.addEventListener('click', (e) => {
      if (screen.innerText === '0') {
         screen.innerText = ''
      }
      if (!operation) {
         screen.innerText += e.target.innerText;
      } else if (!firstClickAfterAction) {
         screen.innerText = e.target.innerText;
         firstClickAfterAction = true
      } else {
         screen.innerText += e.target.innerText;
      }
      console.log('operation: ', operation)
      console.log('firstValue: ', firstValue)
      console.log('secondValue: ', secondValue)
      console.log(firstClickAfterAction)
   })
})

const actions = document.querySelectorAll('.action')
actions.forEach(action => {
   action.addEventListener('click', (e) => {
      if (!firstClickAfterAction) {
         operation = e.target.innerText
         firstValue = Number(screen.innerText);
      } else if (firstClickAfterAction) {
         calculate(e)
         operation = e.target.innerText
      }
      console.log('operation: ', operation)
      console.log('firstValue: ', firstValue)
      console.log('secondValue: ', secondValue)
      console.log(firstClickAfterAction)
   })
})

const opperateBtn = document.querySelector('#operate')
opperateBtn.addEventListener('click', calculate)


function calculate(e) {
   if (firstValue)
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
   firstClickAfterAction = false

}

// console.log('operation: ', operation)
// console.log('firstValue: ', firstValue)
// console.log('secondValue: ', secondValue)
// console.log(firstClickAfterAction)