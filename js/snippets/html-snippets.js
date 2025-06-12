// js/snippets/html-snippets.js
const htmlSnippets = [
    {
        title: "Accessible Form Structure",
        description: "Semantic form with proper accessibility attributes",
        code: `<form class="accessible-form" role="form" aria-labelledby="form-title">
    <h2 id="form-title">Contact Form</h2>
    
    <div class="form-group">
        <label for="name">Full Name *</label>
        <input type="text" id="name" name="name" required 
               aria-describedby="name-error" aria-invalid="false">
        <span id="name-error" class="error-message" role="alert"></span>
    </div>
    
    <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" required
               aria-describedby="email-help email-error">
        <small id="email-help">We'll never share your email</small>
        <span id="email-error" class="error-message" role="alert"></span>
    </div>
    
    <button type="submit" aria-describedby="submit-help">
        Send Message
    </button>
</form>`
    },
    {
        title: "Responsive Image Element",
        description: "Modern responsive image with multiple sources",
        code: `<picture class="responsive-image">
    <source media="(max-width: 768px)" 
            srcset="image-mobile.webp 1x, image-mobile@2x.webp 2x"
            type="image/webp">
    <source media="(max-width: 768px)"
            srcset="image-mobile.jpg 1x, image-mobile@2x.jpg 2x">
    <source srcset="image-desktop.webp 1x, image-desktop@2x.webp 2x"
            type="image/webp">
    <img src="image-desktop.jpg" 
         srcset="image-desktop@2x.jpg 2x"
         alt="Descriptive alt text"
         loading="lazy"
         width="800" 
         height="600">
</picture>`
    },
    {
        title: "HTML5 Semantic Structure",
        description: "Proper semantic HTML structure for better SEO",
        code: `<article class="blog-post" itemscope itemtype="http://schema.org/BlogPosting">
    <header class="post-header">
        <h1 itemprop="headline">Article Title</h1>
        <div class="post-meta">
            <time datetime="2025-01-15" itemprop="datePublished">
                January 15, 2025
            </time>
            <address class="author" itemprop="author" itemscope itemtype="http://schema.org/Person">
                By <span itemprop="name">John Doe</span>
            </address>
        </div>
    </header>
    
    <div class="post-content" itemprop="articleBody">
        <p>Article content goes here...</p>
    </div>
    
    <footer class="post-footer">
        <nav class="post-tags">
            <span>Tags:</span>
            <a href="#" rel="tag">HTML5</a>
            <a href="#" rel="tag">Semantic</a>
        </nav>
    </footer>
</article>`
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = htmlSnippets;
} else {
    window.htmlSnippets = htmlSnippets;
}