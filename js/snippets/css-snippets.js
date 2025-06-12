// js/snippets/css-snippets.js
const cssSnippets = [
    {
        title: "Flexbox Centering",
        description: "Center content both horizontally and vertically",
        code: `.center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.center-flex-item {
    /* Content will be perfectly centered */
    background: #f0f0f0;
    padding: 2rem;
    border-radius: 8px;
}`
    },
    {
        title: "CSS Grid Layout",
        description: "Responsive grid system with auto-fit columns",
        code: `.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.grid-item {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`
    },
    {
        title: "Custom Scrollbar",
        description: "Styled scrollbar for webkit browsers",
        code: `.custom-scroll::-webkit-scrollbar {
    width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
}`
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cssSnippets;
} else {
    window.cssSnippets = cssSnippets;
}