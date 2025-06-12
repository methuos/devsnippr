class StatsCounter {
    constructor() {
        this.snippetsCount = 0;
        this.languageSet = new Set();
        this.snippetsByLanguage = new Map();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.updateSnippetsCount());
        }
    }

    updateSnippetsCount() {
        // Only update the snippets count (first stat)
        const snippetCountElement = document.querySelector('.hero-stats .stat:nth-child(1) .stat-number');
        
        if (snippetCountElement) {
            snippetCountElement.textContent = this.snippetsCount.toString();
            console.log(`Updated snippets count to: ${this.snippetsCount}`);
        } else {
            console.warn('Could not find snippet count element');
        }
    }

    trackLoadedSnippets(language, snippets) {
        if (!language || !Array.isArray(snippets)) {
            return;
        }
        
        language = language.toLowerCase();
        const count = snippets.length;
        
        // Update the count for this language
        this.snippetsByLanguage.set(language, count);
        
        // Calculate total snippets from all languages
        this.snippetsCount = Array.from(this.snippetsByLanguage.values())
            .reduce((sum, count) => sum + count, 0);
        
        // Add language to set if it has snippets
        if (snippets.length > 0) {
            this.languageSet.add(language);
        }
        
        console.log(`Loaded ${count} ${language} snippets. Total: ${this.snippetsCount}`);
        
        // Update the display
        this.updateSnippetsCount();
    }

    // For search filtering - update visible count temporarily
    updateFilteredCount(visibleCount) {
        const snippetCountElement = document.querySelector('.hero-stats .stat:nth-child(1) .stat-number');
        if (snippetCountElement) {
            snippetCountElement.textContent = visibleCount.toString();
        }
    }

    // Reset to actual total count (after search is cleared)
    resetToActualCount() {
        this.updateSnippetsCount();
    }

    // For manual testing
    testCounter() {
        console.log('Testing counter...');
        this.trackLoadedSnippets('javascript', new Array(5).fill({})); // 5 fake snippets
        this.trackLoadedSnippets('python', new Array(3).fill({})); // 3 fake snippets
    }
}

// Create global instance
window.statsCounter = new StatsCounter();

// For debugging
window.testStatsCounter = () => window.statsCounter.testCounter();