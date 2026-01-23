const stringUtils = require('./stringUtils');

console.log('=== String Utils Demo ===\n');

const testString = 'hello world';

console.log(`Original: "${testString}"`);
console.log(`Capitalized: "${stringUtils.capitalize(testString)}"`);
console.log(`Reversed: "${stringUtils.reverse(testString)}"`);
console.log(`Vowel Count: ${stringUtils.countVowels(testString)}`);


