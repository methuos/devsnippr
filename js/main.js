// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking navigation links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
});

// Navigation active state
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Code Snippets Filter Functionality
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize code snippets object
    const codeSnippets = {};
    
    // Configuration for snippet files
    const snippetFiles = {
        javascript: 'js/snippets/javascript-snippets.js',
        python: 'js/snippets/python-snippets.js',
        css: 'js/snippets/css-snippets.js',
        html: 'js/snippets/html-snippets.js'
    };

    // Initialize stats counter by loading all snippets
    try {
        // Load each language's snippets and update stats
        for (const language of Object.keys(snippetFiles)) {
            const snippets = await loadSnippets(language);
            if (window.statsCounter) {
                window.statsCounter.trackLoadedSnippets(language, snippets);
            }
        }
    } catch (error) {
        console.error('Error loading initial snippets:', error);
    }

    // Get filter buttons and create snippets container
    const filterButtons = document.querySelectorAll('.tab-btn');
    const snippetsSection = document.getElementById('snippets');
    
    // Create snippets grid container (initially hidden)
    const snippetsGrid = document.createElement('div');
    snippetsGrid.className = 'snippets-grid';
    snippetsGrid.style.display = 'none';
    
    // Insert the grid after the filter tabs
    const filterTabs = document.querySelector('.filter-tabs');
    filterTabs.parentNode.insertBefore(snippetsGrid, filterTabs.nextSibling);

    // Function to dynamically load snippet files
    async function loadSnippets(language) {
        if (codeSnippets[language]) {
            return codeSnippets[language]; // Already loaded
        }

        try {
            // Create script element and load the snippet file
            const script = document.createElement('script');
            script.src = snippetFiles[language];
            
            // Return a promise that resolves when the script loads
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    // Access the global variable created by the loaded script
                    const snippetData = window[`${language}Snippets`];
                    if (snippetData) {
                        codeSnippets[language] = snippetData;
                        resolve(snippetData);
                    } else {
                        reject(new Error(`Failed to load ${language} snippets`));
                    }
                };
                script.onerror = () => reject(new Error(`Failed to load ${language} snippets file`));
                document.head.appendChild(script);
            });
        } catch (error) {
            console.error(`Error loading ${language} snippets:`, error);
            return [];
        }
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show loading state
            snippetsGrid.innerHTML = '<div class="loading">Loading snippets...</div>';
            snippetsGrid.style.display = 'block';
            
            try {
                // Load snippets for the selected language
                const snippets = await loadSnippets(filter);
                if (window.statsCounter) {
                    window.statsCounter.trackLoadedSnippets(filter, snippets);
                }
                displaySnippets(snippets, filter);
            } catch (error) {
                console.error('Error loading snippets:', error);
                snippetsGrid.innerHTML = `<div class="error">Failed to load ${filter} snippets. Please try again.</div>`;
            }
        });
    });

    function displaySnippets(snippets, language) {
        // Clear existing content
        snippetsGrid.innerHTML = '';
        
        if (snippets.length === 0) {
            snippetsGrid.innerHTML = '<p class="no-snippets">No snippets available for this language yet.</p>';
        } else {
            // Create snippet cards
            snippets.forEach((snippet, index) => {
                const snippetCard = createSnippetCard(snippet, language, index);
                snippetsGrid.appendChild(snippetCard);
            });
        }
        
        // Show the grid with animation
        snippetsGrid.style.display = 'grid';
        snippetsGrid.style.opacity = '0';
        
        // Trigger animation
        requestAnimationFrame(() => {
            snippetsGrid.style.transition = 'opacity 0.3s ease-in-out';
            snippetsGrid.style.opacity = '1';
        });
    }

    function createSnippetCard(snippet, language, index) {
        const card = document.createElement('div');
        card.className = 'snippet-card';
        
        card.innerHTML = `
            <div class="snippet-header">
                <div class="snippet-info">
                    <h3 class="snippet-title">${snippet.title}</h3>
                    <p class="snippet-description">${snippet.description}</p>
                </div>
                <div class="snippet-actions">
                    <span class="language-tag ${language}">${language.toUpperCase()}</span>
                    <button class="copy-btn" data-snippet-index="${index}" data-language="${language}" 
                            title="Copy to clipboard" aria-label="Copy code to clipboard">
                        📋
                    </button>
                </div>
            </div>
            <div class="snippet-code">
                <pre><code class="language-${language}">${escapeHtml(snippet.code)}</code></pre>
            </div>
        `;
        
        // Add copy functionality
        const copyBtn = card.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => copyToClipboard(snippet.code, copyBtn));
        
        return card;
    }

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            // Show success feedback
            const originalText = button.textContent;
            button.textContent = '✅';
            button.style.color = 'var(--accent-color)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.textContent = '✅';
            setTimeout(() => {
                button.textContent = '📋';
            }, 2000);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});


// Search and filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('snippet-search');
    const filterButtons = document.querySelectorAll('.tab-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Add your search logic here
            filterSnippets(searchTerm);
        });
    }

    // Add active state to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            // Add your filter logic here
        });
    });
});

function filterSnippets(searchTerm) {
    const snippetsGrid = document.querySelector('.snippets-grid');
    if (!snippetsGrid) return;

    const snippetCards = snippetsGrid.querySelectorAll('.snippet-card');
    let visibleCount = 0;
    const visibleLanguages = new Set();

    snippetCards.forEach(card => {
        const title = card.querySelector('.snippet-title').textContent.toLowerCase();
        const description = card.querySelector('.snippet-description').textContent.toLowerCase();
        const language = card.querySelector('.language-tag').textContent.toLowerCase();
        
        const isMatch = searchTerm === '' || 
                       title.includes(searchTerm) || 
                       description.includes(searchTerm) ||
                       language.includes(searchTerm);
        
        card.style.display = isMatch ? 'block' : 'none';
        if (isMatch) {
            visibleCount++;
            visibleLanguages.add(language.toLowerCase());
        }
    });

    // Update stats to reflect filtered view
    if (window.statsCounter) {
        window.statsCounter.snippetsCount = visibleCount;
        window.statsCounter.languageSet = visibleLanguages;
        window.statsCounter.updateCounts();
    }
}