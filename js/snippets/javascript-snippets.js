// js/snippets/javascript-snippets.js
const javascriptSnippets = [
    {
        title: "Array Shuffle Function",
        description: "Randomly shuffle array elements using Fisher-Yates algorithm",
        code: `function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}`
    },
    {
        title: "Debounce Function",
        description: "Delay function execution until after specified time",
        code: `function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}`
    },
    {
        title: "Deep Clone Object",
        description: "Create a deep copy of nested objects",
        code: `function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === "object") {
        const cloned = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
}`
    }



];



// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = javascriptSnippets;
} else {
    window.javascriptSnippets = javascriptSnippets;
}