// js/snippets/python-snippets.js
const pythonSnippets = [
    {
        title: "List Comprehension Examples",
        description: "Various list comprehension patterns in Python",
        code: `# Basic list comprehension
squares = [x**2 for x in range(10)]

# Conditional list comprehension
evens = [x for x in range(20) if x % 2 == 0]

# Nested list comprehension
matrix = [[j for j in range(3)] for i in range(3)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}`
    },
    {
        title: "Decorator Pattern",
        description: "Function decorator with timing functionality",
        code: `import time
from functools import wraps

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done!"`
    },
    {
        title: "Context Manager",
        description: "Custom context manager for file handling",
        code: `class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# Usage
with FileManager('test.txt', 'w') as f:
    f.write('Hello World!')`
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pythonSnippets;
} else {
    window.pythonSnippets = pythonSnippets;
}