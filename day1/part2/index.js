import { readFile } from 'node:fs';

//read values from file
let strings = [];
readFile('./strings.txt', 'utf-8', (err, data) => {
    // error converting file
    if (err) {
        console.error(err)
        return
    }
    // convert the string into an array of strings
    strings = data.split('\r\n');

    // push the numbers into final array
    let finalNumbers = [];
    strings.forEach(str => {
        const convertedStr = ConvertTextNumbersToNumbersInString(str)
        finalNumbers.push(getFirstAndLastInt(convertedStr));
    })


    // count all the numbers together
    const sumOfNumbers = finalNumbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)

    console.log(sumOfNumbers)
})

const numberStrings = Object.freeze({
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5,
    'six' : 6,
    'seven' : 7,
    'eight' : 8,
    'nine' : 9
})

// returns the first and last number appended together and converted to integer
function getFirstAndLastInt(str) {
    const stringArr = str.split('');
    let numbers = [];
    stringArr.forEach(element => {
        if (!isNaN(parseInt(element))) {
            numbers.push(element);
        }
    });
    return parseInt(numbers[0] + numbers[numbers.length - 1]);
}

// replace occurences of string numbers with actual numbers, also keep into account that that numbers may be connected like 'eightwo'
function ConvertTextNumbersToNumbersInString(str) {
    let indexesOfStringNumbers = [];
    let updatedString = str;
    
    for(const [key, value] of Object.entries(numberStrings)) {

        while (updatedString.indexOf(key) != -1) {
            const startIndex = updatedString.indexOf(key);
            const endIndex = updatedString.indexOf(key) + key.length - 1;
            const firstPart = updatedString.slice(0, startIndex + 1);
            const lastPart = updatedString.slice(endIndex);
            updatedString = firstPart + value + lastPart;
        }
    }
    
    return updatedString;
}



