/**
 * Function to get the max value of a key from array of objects
 * @param arr - Array of objects
 * @param key - object key (numeric)
 * @returns {number}
 */
function maxVal(arr, key) {
    return Math.max.apply(Math,arr.map(function(o){return o[key];}))
}