function add(a, b) {
   return Math.round(((a + b) + Number.EPSILON) * 100000) / 100000
}

function substract(a, b) {
   return Math.round(((a - b) + Number.EPSILON) * 100000) / 100000
}

function multiply(a, b) {
   return Math.round(((a * b) + Number.EPSILON) * 100000) / 100000
}

function divide(a, b) {
   console.log(`a: ${a}, b: ${b}`)
   return Math.round(((a / b) + Number.EPSILON) * 100000) / 100000

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
let operationRan = false;

digits.forEach(digit => {
   digit.addEventListener('click', (e) => {
      if (screen.innerText === '0') {
         screen.innerText = ''
      }
      if (operationRan) {
         reset()
         screen.innerText = ''
      }
      if (!operation) {
         screen.innerText += e.target.innerText;
         firstValue = Number(screen.innerText)
      } else if (operation && !firstClickAfterAction) {
         screen.innerText = e.target.innerText
         secondValue = Number(screen.innerText);
         firstClickAfterAction = true
      } else {
         screen.innerText += e.target.innerText;
         secondValue = Number(screen.innerText);
      }


   })
})

const actions = document.querySelectorAll('.action')
actions.forEach(action => {
   action.addEventListener('click', (e) => {
      if (!firstClickAfterAction) {
         operation = e.target.innerText
         secondValue = Number(screen.innerText);
      } else if (firstClickAfterAction) {
         calculate(e)
         operation = e.target.innerText
      }

   })
})

const opperateBtn = document.querySelector('#operate')
opperateBtn.addEventListener('click', calculate)


function calculate(e) {
   if (operation) {

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
      firstClickAfterAction = false;
      operationRan = true;
      firstValue = Number(screen.innerText);
      secondValue = Number(screen.innerText);


   }
}

// console.log('operation: ', operation)
// console.log('firstValue: ', firstValue)
// console.log('secondValue: ', secondValue)
// console.log(firstClickAfterAction)
// console.log(operationRan)

const clear = document.querySelector('#clear')

clear.addEventListener('click', reset)

function reset() {
   firstValue = 0;
   secondValue = 0;
   operation = '';
   screen.innerText = '0';
   firstClickAfterAction = false;
   operationRan = false;

}