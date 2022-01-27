const digits = document.querySelectorAll('.digit');
const screen = document.querySelector('#screen');
const actions = document.querySelectorAll('.action');
const clear = document.querySelector('#clear');
const comma = document.querySelector('#comma');
const plusMinus = document.querySelector('#plusMinus');
const erase = document.querySelector('#erase');
const percent = document.querySelector('#percent');
const opperateBtn = document.querySelector('#operate');

let firstValue = 0;
let secondValue = 0;
let operation = '';
let firstClickAfterAction = false;
let operationRan = false;


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
   return Math.round(((a / b) + Number.EPSILON) * 100000) / 100000

}

function operate(action, a, b) {
   return action(a, b)
}



digits.forEach(digit => {
   digit.addEventListener('click', (e) => {
      if (screen.innerText === '0') {
         screen.innerText = ''
      }
      if (operationRan) {
         screen.innerText = ''
         operationRan = false;
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

      console.log('firstValue :', firstValue)
      console.log('secondValue :', secondValue)
      console.log('operation :', operation)
      console.log('operationRan :', operationRan)
      console.log('firstClickAfterAction :', firstClickAfterAction)
   })

})


actions.forEach(action => {
   action.addEventListener('click', (e) => {
      if (!firstClickAfterAction) {
         operation = e.target.innerText
         secondValue = Number(screen.innerText);
         comma.disabled = false
      } else if (firstClickAfterAction) {
         calculate(e)
         operation = e.target.innerText
      }

      console.log('firstValue :', firstValue)
      console.log('secondValue :', secondValue)
      console.log('operation :', operation)
      console.log('operationRan :', operationRan)
      console.log('firstClickAfterAction :', firstClickAfterAction)
   })

})


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
      comma.disabled = false;

      console.log('firstValue :', firstValue)
      console.log('secondValue :', secondValue)
      console.log('operation :', operation)
      console.log('operationRan :', operationRan)
      console.log('firstClickAfterAction :', firstClickAfterAction)
   }
}







clear.addEventListener('click', reset)

function reset() {
   firstValue = 0;
   secondValue = 0;
   operation = '';
   screen.innerText = '0';
   firstClickAfterAction = false;
   operationRan = false;
   comma.disabled = false;

   console.log('firstValue :', firstValue)
   console.log('secondValue :', secondValue)
   console.log('operation :', operation)
   console.log('operationRan :', operationRan)
   console.log('firstClickAfterAction :', firstClickAfterAction)
}



comma.addEventListener('click', (e) => {
   screen.innerText += '.'
   comma.disabled = true
})



plusMinus.addEventListener('click', () => {
   screen.innerText = Number(screen.innerText) * (-1)
   if (!firstClickAfterAction)
      firstValue *= -1
   else
      secondValue *= -1

})




erase.addEventListener('click', () => {
   if (screen.innerText.length === 1) {
      screen.innerText = 0
   } else {
      screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1);
   }

   if (!firstClickAfterAction) {
      firstValue = Number(screen.innerText);
   } else {
      secondValue = Number(screen.innerText);
   }
})



percent.addEventListener('click', () => {
   operation = "/"
   firstValue = Number(screen.innerText);
   secondValue = 100
   calculate()

})












// console.log('firstValue :', firstValue)
// console.log('secondValue :', secondValue)
// console.log('operation :', operation)
// console.log('operationRan :', operationRan)
// console.log('firstClickAfterAction :', firstClickAfterAction)