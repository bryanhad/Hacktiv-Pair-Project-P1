module.exports = function splitCamelCase(string) {
    const newString =  (string.replace(/([a-z0-9])([A-Z])/g, '$1 $2'))

    const capitalizedSplittedString = newString.charAt(0).toUpperCase() + newString.slice(1);
    return capitalizedSplittedString
}