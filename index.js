const nums = document.querySelectorAll(".number");
const disp = document.querySelector("#bigOp");
const clear = document.querySelector("#clear");
const prev = document.querySelector("#prevOp");
const equals = document.querySelector("#equals");
const percent = document.querySelector("#percent");
const operations = document.querySelectorAll(".operation"); 
let complete = false;
const svg = `<svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4395 5.93945C20.0253 5.35373 20.9749 5.35369 21.5606 5.93945C22.1463 6.52522 22.1463 7.47478 21.5606 8.06055L18.6212 11L21.5606 13.9395L21.6642 14.0537C22.1442 14.6428 22.1096 15.5115 21.5606 16.0605C21.0116 16.6095 20.143 16.6441 19.5538 16.1641L19.4395 16.0605L16.5001 13.1211L13.5606 16.0605C12.9749 16.6463 12.0253 16.6463 11.4395 16.0605C10.8538 15.4748 10.8538 14.5252 11.4395 13.9395L14.379 11L11.4395 8.06055L11.336 7.94629C10.8559 7.35714 10.8905 6.48848 11.4395 5.93945C11.9886 5.39049 12.8573 5.35584 13.4464 5.83594L13.5606 5.93945L16.5001 8.87891L19.4395 5.93945Z" fill="#FDF7F7"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0001 0C26.3807 6.87173e-05 27.5001 1.11933 27.5001 2.5V20C27.5001 21.3807 26.3807 22.4999 25.0001 22.5H11.4298C10.8302 22.5 10.2528 22.2851 9.80185 21.8984L9.61728 21.7217L1.08408 12.7402C0.150305 11.7573 0.17034 10.2087 1.129 9.25L9.64658 0.732422L9.83017 0.566406C10.275 0.201994 10.8341 3.50001e-05 11.4142 0H25.0001ZM11.9142 2C11.5662 2.00003 11.2308 2.12126 10.964 2.33984L10.8536 2.43945L3.33408 9.95898C2.76011 10.533 2.7465 11.4597 3.3038 12.0498L10.8409 20.0303L10.9522 20.1367C11.2231 20.3699 11.57 20.4999 11.9308 20.5H24.0001C24.8285 20.4999 25.5001 19.8284 25.5001 19V3.5C25.5001 2.67161 24.8285 2.00006 24.0001 2H11.9142Z" fill="#FDF7F7"/>
</svg>

`

operations.forEach(operation => {
    const ops = ["+","-","×","÷"];
    operation.addEventListener("click", event => {
    if (disp.textContent.slice(-1) != event.target.textContent && event.target.textContent != "=") {
        if (ops.some( op => disp.textContent.slice(-1) == op)) {
            if (event.target.textContent == "-" && disp.textContent.slice(-1) == "+") {
                disp.textContent = disp.textContent.slice(0, -1) + "-";
            }else{
                disp.textContent = disp.textContent.slice(0, -1) + event.target.textContent; 
            }
        }else{
            disp.textContent += event.target.textContent;
        }   
        complete = false;
        prev.textContent = "";
    }    
})
})
percent.addEventListener("click", event => {
    if (!(disp.textContent.slice(-1) == event.target.textContent)) {
        disp.textContent += event.target.textContent;
    }    
})


equals.addEventListener("click", event =>{
    prev.textContent = disp.textContent
    clear.innerHTML = "AC"
    complete = true;
    evaluate()
})

clear.addEventListener("click", event =>{
    if (disp.textContent == "0" || disp.textContent.length == 1 || (disp.textContent.length == 2 && disp.textContent.includes("0."))) {
        clear.innerHTML = "AC"
    }
    if (clear.innerHTML == "AC") {
        disp.textContent = "0";
        prev.textContent = ""; 
    } else {
        disp.textContent = disp.textContent.slice(0, -1);
    }
    console.log(clear.innerHTML == "AC")
    
})

nums.forEach(element => {
 element.addEventListener("click",event => {
    if (event.target.textContent != 0) {
        clear.innerHTML = svg;
    }
    if (disp.textContent == "0" && event.target.textContent != ".") {
        disp.textContent = event.target.textContent;
    }else if(!(disp.textContent.includes(".") && event.target.textContent == ".")){
        disp.textContent += event.target.textContent;
    }
    if (complete && event.target.textContent != ".") {
        disp.textContent = event.target.textContent;
        complete = false;
    }
    prev.textContent = "";
})   
});


const add = function(array){
    let answer = 0;
    for (const num of array) {
        answer += num;
    }
    return answer
}

const subtract = function(array){
    let answer = 0;
    for (const num of array) {
        answer -= num;
    }
    return answer
}


const divide = function(array){
    if (array.length != 0) {
        let answer = array[0];
        for (let i = 1; i < array.length; i++) {
            answer /= array[i];  
        }
        return answer
    }
}
    



const multiply = function(array){
    let answer = 1;
    for (const num of array) {
        answer *= num;
    }
    return answer
}


const numbers = [2, 4, 6];

console.log(divide(numbers))

const evaluate = function () {
    let text = disp.textContent;
    let postfix = [];
    let stack = [];
    const ops =["+","-","÷","×"];
    let int = "";
    let negInt = "-";

    for (let i = 0; i < text.length; i++) {
        const token = text[i];

        if (!isNaN(parseInt(token))) {
            while (i < text.length && (text[i] === "." ||!isNaN(parseInt(text[i]) )) ) {
                int += text[i];
                i++
                console.log(int)
            }
            i--;
            postfix.push(int);
            int = "";
            console.log(int)
        }else if (token == "-" && (i == 0 || ops.some( op => text[i - 1] == op))) {
            i++;
            while (i < text.length && !isNaN(parseInt(text[i])) ) {
                negInt += text[i];
                i++
                console.log(int)
            }
            postfix.push(negInt);
            negInt = "-";
        
        }else{
            stack.push(token)
        }
    }
    console.log(postfix);
    console.log(stack);
    
    
}

