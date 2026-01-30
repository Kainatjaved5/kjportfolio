// Portfolio Projects Data
const portfolioProjects = [
    {
        title: "AI Agent Coding",
        description: "Intelligent AI agent with advanced coding capabilities, natural language processing, and automated code generation.",
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    },
    {
        title: "E-Commerce Platform",
        description: "Modern online shopping experience with responsive design and smooth checkout process.",
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    },
    {
        title: "Portfolio Website",
        description: "Personal portfolio showcasing web development projects with dark theme and animations.",
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    },
    {
        title: "Task Management App",
        description: "Interactive task management application with drag-and-drop functionality.",
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const portfolioGrid = document.getElementById('portfolio-grid');

// Add Project Form Functions
function showAddProjectForm() {
    const modal = document.getElementById('add-project-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideAddProjectForm() {
    const modal = document.getElementById('add-project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Reset form
    document.getElementById('add-project-form').reset();
}

function handleAddProject(event) {
    event.preventDefault();
    
    // Get form data
    const title = document.getElementById('project-title').value;
    const liveUrl = document.getElementById('project-url').value;
    const description = document.getElementById('project-description').value;
    const category = document.getElementById('project-category').value;
    const technologies = document.getElementById('project-technologies').value
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech);
    const thumbnail = document.getElementById('project-thumbnail').value;
    const featured = document.getElementById('project-featured').checked;
    
    // Add project using portfolio system
    if (window.portfolioSystem) {
        const project = window.portfolioSystem.addProjectByUrl({
            title,
            liveUrl,
            description,
            category,
            technologies,
            thumbnail,
            featured,
            github: 'https://github.com/Kainatjaved5/kjportfolio'
        });
        
        // Show success message
        showNotification(`Project "${title}" added successfully!`, 'success');
        
        // Close form
        hideAddProjectForm();
        
        // Scroll to projects section
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    } else {
        showNotification('Portfolio system not loaded. Please refresh the page.', 'error');
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                ${type === 'success' ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />' :
                  type === 'error' ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />' :
                  '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />'}
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load saved profile image on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu first
    initializeMobileMenu();
    
    // Then initialize other components
    initializePortfolio();
    initializeNavbar();
    initializeScrollAnimations();
});

// Fallback initialization
window.addEventListener('load', function() {
    // Re-initialize mobile menu if it didn't work the first time
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu && !mobileMenuBtn.hasAttribute('data-initialized')) {
        console.log('Fallback mobile menu initialization');
        initializeMobileMenu();
        mobileMenuBtn.setAttribute('data-initialized', 'true');
    }
});

// Portfolio Initialization
function initializePortfolio() {
    if (portfolioGrid) {
        portfolioProjects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            portfolioGrid.appendChild(projectCard);
        });
    }
}

// Create Project Card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'portfolio-card bg-gray-800 p-6 rounded-lg scroll-animate';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <h3 class="text-xl font-semibold text-white mb-3">${project.title}</h3>
        <p class="text-gray-400 mb-4">${project.description}</p>
        <div class="flex space-x-4">
            <a href="${project.liveLink}" target="_blank" class="inline-flex items-center text-electric-blue hover:text-blue-400 transition-colors duration-200">
                <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
            </a>
            <a href="${project.githubLink}" target="_blank" class="inline-flex items-center text-electric-blue hover:text-blue-400 transition-colors duration-200">
                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
        </div>
    `;
    
    return card;
}

// Navbar Scroll Behavior
function initializeNavbar() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    // Re-get elements to ensure they're available
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('Mobile menu elements:', { mobileMenuBtn, mobileMenu });
    
    if (mobileMenuBtn && mobileMenu) {
        // Remove any existing listeners to prevent duplicates
        mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true));
        const newBtn = document.getElementById('mobile-menu-btn');
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            
            // Toggle hidden class
            mobileMenu.classList.toggle('hidden');
            
            // Force visibility if not hidden
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.display = 'flex';
                mobileMenu.style.visibility = 'visible';
                mobileMenu.style.opacity = '1';
                mobileMenu.style.position = 'absolute';
                mobileMenu.style.top = '100%';
                mobileMenu.style.left = '0';
                mobileMenu.style.right = '0';
                mobileMenu.style.backgroundColor = '#111827';
                mobileMenu.style.zIndex = '50';
                console.log('Mobile menu forced visible');
            } else {
                mobileMenu.style.display = 'none';
                console.log('Mobile menu hidden');
            }
            
            console.log('Mobile menu classes after toggle:', mobileMenu.className);
        });
        
        // Mark as initialized
        newBtn.setAttribute('data-initialized', 'true');
        
        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        console.log('Mobile nav links found:', mobileNavLinks.length);
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!newBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
            }
        });
    } else {
        console.error('Mobile menu elements not found');
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all scroll-animate elements
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Typing Effect for Hero Section (Optional Enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form Validation (if contact form is added)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Valid email is required');
    }
    
    if (!formData.message || formData.message.trim() === '') {
        errors.push('Message is required');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Loading State Management
function showLoading(element) {
    element.disabled = true;
    element.innerHTML = '<span class="loading"></span> Loading...';
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!');
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance Optimization - Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized Scroll Handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-related operations
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
