const screen = document.querySelector(".screen-text")
const numButtons = document.querySelectorAll(".num")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
const ac = document.querySelector(".ac")

screen.style.textAlign = "center";    //css

let display1stValue = "";
let display2ndValue = "";
let firstValue = "";
let operatorValue = "";
let secondValue = "";
let totalValue = "";
let firstValueDisabler = true;     //boolean Flags
let isClicked = false;             //boolean Flags



function getFirstValue() {                   //to get firstValue 
    numButtons.forEach(num=>{
        num.addEventListener("click", function(){
            if (firstValueDisabler) {
                firstValue += num.textContent;
                display1stValue += num.textContent;
                //console.log("first: ", firstValue)
                screen.value = display1stValue;
            }
        })
    })
}

function getOperator(){                       //to get operators
    operators.forEach(operate => {
        operate.addEventListener("click", function(){
            operatorValue = operate.textContent;
            clear();
            firstValueDisabler = false;         //to stop storing firstvalue after operator has been choosed.
            getSecondValue();
            if (!isClicked) {
                isClicked = true;               //first operator click turns isClicked --> true;
              } else {                                 //which helps in second operator click to perform the else condition.
                secondValue = "";
                screen.value = "";
                display2ndValue = "";
                firstValue = totalValue;
              }
        })
    })
}

let secondValueEventListener = function(e) {         //function to get second Value
   if (!firstValueDisabler) {
     secondValue += e.target.textContent;
     display2ndValue += e.target.textContent;
     console.log("second: ", secondValue);
     screen.value = display2ndValue;
   }
   
}

function getSecondValue() {                                            //function to remove the eventlistener added during getFirstValue() 
    numButtons.forEach(num2 => {                                       // so can add again another eventlistener
        num2.removeEventListener("click", secondValueEventListener);
        num2.addEventListener("click", secondValueEventListener);
    });
}

function equalTo(){                                                  //performs calculation after clicking "="
    equal.addEventListener("click", function(){
        calculation(parseFloat(firstValue),operatorValue,parseFloat(secondValue));
    })
}


function clear(){
    screen.value = "";
}


 
    ac.addEventListener("click", function(){         //allClear eventlistener to clear all values and display
        screen.value = "";                                    //on clicking "AC"
        display1stValue = "";
        display2ndValue = "";
        firstValue = "";
        operatorValue = "";
        secondValue = "";
        firstValueDisabler = true;
        isClicked = false;
    })
   



getFirstValue()
getOperator()
equalTo()


function calculation(firstValue,operatorValue,secondValue){
    if (operatorValue == "+"){
        screen.value = add(firstValue, secondValue)
        totalValue = screen.value;
    }else if (operatorValue == "-"){
        screen.value = subtract(firstValue, secondValue)
        totalValue = screen.value;
    }else if(operatorValue == "x"){
       screen.value = multiply(firstValue,secondValue);
       totalValue = screen.value;
    }else if(operatorValue == "/"){
        screen.value = divide(firstValue, secondValue)
        totalValue = screen.value;
    }
}



function add(num1, num2){
    return parseFloat(num1, 10) + parseFloat(num2, 10)
}

function subtract(num1, num2){
    return parseFloat(num1, 10) - parseFloat(num2, 10)
}

function multiply(num1, num2){
    return parseFloat(num1, 10) * parseFloat(num2, 10)
}

function divide(num1, num2){
    return parseFloat(num1, 10) / parseFloat(num2, 10)
}


//NOTE: 
//cannot do multiple arithmetic problems at once 
//Hence have to use equal sign every time before perfoming another operation.