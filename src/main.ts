import './style.css'


let currentInput = '0';
let lastInput = '0';
let operation = '';
let shouldResetInput = false;


document.addEventListener('DOMContentLoaded', () => {

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <h1>Calculadora</h1>
      <h2>Proximamente...</h2>
      <div class="calculadora">
        <div class="display">
          <input type="text" class="display-input" value="0" disabled />
        </div>
        <div class="teclado">
          <button class="delete span-two">DEL</button>
          <button class="reset">C</button>
          <button class="operation" data-action="+">+</button>
          <button class="number" data-value="7">7</button>
          <button class="number" data-value="8">8</button>
          <button class="number" data-value="9">9</button>
          <button class="operation" data-action="-">-</button>
          <button class="number" data-value="4">4</button>
          <button class="number" data-value="5">5</button>
          <button class="number" data-value="6">6</button>
          <button class="operation" data-action="*">*</button>
          <button class="number" data-value="1">1</button>
          <button class="number" data-value="2">2</button>
          <button class="number" data-value="3">3</button>
          <button class="operation" data-action="/">/</button>        
          <button class="equals span-two">=</button>
          <button class="number" data-value="0">0</button>
          <button class="decimal">.</button>
        </div>
      </div>
    </div>
  `;
  
  const elements = document.getElementsByClassName('number');
  if(elements){  
    Array.from(elements).forEach((element) => {
      element.addEventListener('click', (event) => {     
        const value = (event.target as HTMLElement).dataset.value   
        
        if(shouldResetInput){
          currentInput = value || '0';
          shouldResetInput = false;
        } else {
          if(currentInput==='0' && value==='0') return;                
          if(currentInput==='0') currentInput='';
          currentInput += value;
        }
        
        (document.querySelector('.display-input') as HTMLInputElement)!.value = currentInput;
        
      });    
    });
  }
  const resetButton = document.querySelector('.reset');
  if(resetButton){
    resetButton.addEventListener('click', () => {
      currentInput = '0';
      lastInput = '0';
      operation = '';
      shouldResetInput = false;
      (document.querySelector('.display-input') as HTMLInputElement)!.value = currentInput;
    });
  }

  const deleteButton = document.querySelector('.delete');
  if(deleteButton){
    deleteButton.addEventListener('click', () => {
      if(currentInput.length === 1){
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      (document.querySelector('.display-input') as HTMLInputElement)!.value = currentInput;
    });
  }

  const decimalButton = document.querySelector('.decimal');
  if(decimalButton){
    decimalButton.addEventListener('click', () => {
      if(shouldResetInput){
        currentInput = '0.';
        shouldResetInput = false;
      } else {
        if(!currentInput.includes('.')){
          currentInput += '.';
        }
      }
      (document.querySelector('.display-input') as HTMLInputElement)!.value = currentInput;
    });
  }


  const calculate = (): number => {
    const num1 = parseFloat(lastInput);
    const num2 = parseFloat(currentInput);
    
    switch(operation){
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : 0;
      default:
        return num2;
    }
  };

  
  const operationButtons = document.getElementsByClassName('operation');
  if(operationButtons){
    Array.from(operationButtons).forEach((button) => {
      button.addEventListener('click', (event) => {
        const action = (event.target as HTMLElement).dataset.action;
        
        if(operation && !shouldResetInput){
          // Si ya hay una operación pendiente y se ha introducido el segundo operando,
          // calcular el resultado antes de establecer la nueva operación
          const result = calculate();
          currentInput = result.toString();
          (document.querySelector('.display-input') as HTMLInputElement)!.value = currentInput;
        }
        
        lastInput = currentInput;
        operation = action || '';
        shouldResetInput = true;
      });
    });
  }

  
  const equalsButton = document.querySelector('.equals');
  if(equalsButton){
    equalsButton.addEventListener('click', () => {
      if(operation){
        const result = calculate();
        currentInput = result.toString();
        (document.querySelector('.display-input') as HTMLInputElement)!.value = currentInput;
        lastInput = '0';
        operation = '';
        shouldResetInput = true;
      }
    });
  }
  
});

