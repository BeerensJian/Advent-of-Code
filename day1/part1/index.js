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
        finalNumbers.push(getFirstAndLastInt(str));
    })

    // count all the numbers together
    const sumOfNumbers = finalNumbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)
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
    console.log(numbers[numbers.length - 1])
    return parseInt(numbers[0] + numbers[numbers.length - 1]);
}