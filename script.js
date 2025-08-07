const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      display.value = '';
    } else if (value === '=') {
      try {
        display.value = calculate(display.value);
      } catch {
        display.value = 'Error';
      }
    } else {
      display.value += value;
    }
  });
});

// Simple calculator function (no regex, no eval)
function calculate(expression) {
  let numbers = [];
  let operators = [];
  let currentNumber = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === '+' || char === '-' || char === '*' || char === '/') {
      numbers.push(parseFloat(currentNumber));
      operators.push(char);
      currentNumber = '';
    } else {
      currentNumber += char;
    }
  }

  // Push the last number
  numbers.push(parseFloat(currentNumber));

  // Now calculate left to right (no operator precedence)
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];

    if (operator === '+') {
      result += nextNumber;
    } else if (operator === '-') {
      result -= nextNumber;
    } else if (operator === '*') {
      result *= nextNumber;
    } else if (operator === '/') {
      if (nextNumber === 0) throw new Error('Divide by zero');
      result /= nextNumber;
    }
  }

  return result;
}