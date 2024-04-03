function prefixMr(strings, ...expressions) {
    return strings.reduce((result, string, i) => {
        let expr = expressions[i] ? `Mr. ${expressions[i]}` : '';
        return result + string + expr;
    }, '');
}

const name = "John";
console.log(prefixMr`Hello, ${name}!`); // Output: "Hello, Mr. John!"
