let screenText = "";

let numbers = [];
let operators = [];

function action(symbol) {
	screenText += symbol;
	document.getElementById("screen").innerHTML = screenText;
}

function calculate() {
	let lastOperatorIndex = 0;

	for (let index = 0; index < screenText.length; index++) {
		let readingChar = screenText[index];

		if (  readingChar == '/' 
			|| readingChar == 'x' 
			|| readingChar == '+' 
			|| readingChar == '-' 
		) {
			operators.push(readingChar);
			numbers.push(
				screenText.substring(
					lastOperatorIndex == 0? 0 : lastOperatorIndex + 1, 
					index
				)
			);

			lastOperatorIndex = index;
		}
	}

	// si el último caracter es un operador ignorarlo/quitarlo
	if (  screenText[screenText.length - 1] == '/'
		|| screenText[screenText.length - 1] == 'x'
		|| screenText[screenText.length - 1] == '+'
		|| screenText[screenText.length - 1] == '-' ) {
			screenText = screenText.substring(0, screenText.length - 1);
	}
	else {
		numbers.push(screenText.substring(lastOperatorIndex + 1, screenText.length))
	}

	console.log(numbers);
	console.log(operators);

	let result = 0;
	operators.forEach( (op, index) => {
		if (index == 0) {
			result = doCalculation(numbers[index], numbers[index + 1], op);
		}
		else {
			result = doCalculation(result, numbers[index + 1], op );
		}
	});

	screenText = result;
	document.getElementById("screen").innerHTML = screenText;
	numbers = []; 
	operators = [];
}

function clearScreen() {
	screenText = "";
	document.getElementById("screen").innerHTML = screenText;
	numbers = [];
	operators = [];
}

function doCalculation(value1, value2, operator) {
	let result = 0;
	switch (operator) {
		case '/':
			result = Number(value1) / Number(value2);
			break;
		case 'x':
			result = Number(value1) * Number(value2);
			break;
		case '+':
			result = Number(value1) + Number(value2);
			break;
		case '-':
			result = Number(value1) - Number(value2);
			break;
		default:
			break;
	}

	return result;
}