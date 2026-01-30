/**
 * Professional Portfolio Projects System
 * Scalable, secure, and responsive project management
 */

class PortfolioSystem {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.currentSort = 'recent';
        this.searchQuery = '';
        this.isLoading = false;
        
        this.config = {
            projectsPath: 'projects/',
            supportedFormats: ['.html', '.htm'],
            itemsPerPage: 12,
            animationDuration: 300
        };
        
        this.init();
    }

    async init() {
        try {
            await this.loadProjects();
            this.setupEventListeners();
            this.renderProjects();
            this.initializeAnimations();
        } catch (error) {
            console.error('Portfolio system initialization failed:', error);
            this.showError('Failed to load portfolio projects');
        }
    }

    /**
     * Dynamically load projects from folder structure
     */
    async loadProjects() {
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            // Load project configurations
            const projectConfigs = await this.fetchProjectConfigs();
            
            // Process each project
            for (const config of projectConfigs) {
                const project = await this.processProject(config);
                if (project) {
                    this.projects.push(project);
                }
            }
            
            // Sort projects
            this.sortProjects();
            
            // Initialize filtered projects
            this.filteredProjects = [...this.projects];
            
        } catch (error) {
            console.error('Error loading projects:', error);
            throw error;
        } finally {
            this.isLoading = false;
            this.hideLoadingState();
        }
    }

    /**
     * Fetch project configurations from JSON files
     */
    async fetchProjectConfigs() {
        // Your actual GitHub projects with website previews
        const defaultProjects = [
            {
                id: 'business-website',
                title: 'Business Website',
                description: 'Professional business website with modern design, responsive layout, contact forms, and SEO optimization for corporate clients.',
                category: 'web',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO'],
                liveUrl: 'https://kainatjaved5.github.io/business/',
                thumbnail: 'business we.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/business',
                date: new Date('2024-01-28'),
                status: 'completed'
            },
            {
                id: 'analytical-dashboard',
                title: 'Analytical Dashboard',
                description: 'Advanced analytics dashboard with real-time data visualization, interactive charts, and comprehensive reporting features for business intelligence.',
                category: 'web',
                technologies: ['React', 'D3.js', 'Chart.js', 'WebSocket', 'Node.js'],
                liveUrl: 'https://kainatjaved5.github.io/Analytical-Dashboard/',
                thumbnail: 'analytical dash.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/Analytical-Dashboard',
                date: new Date('2024-01-25'),
                status: 'completed'
            },
            {
                id: 'task-management',
                title: 'Task Management System',
                description: 'Comprehensive task management platform with drag-and-drop functionality, team collaboration, deadline tracking, and progress monitoring.',
                category: 'web',
                technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
                liveUrl: 'https://kainatjaved5.github.io/Task-Management/',
                thumbnail: 'task_management.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/Task-Management',
                date: new Date('2024-01-22'),
                status: 'completed'
            },
            {
                id: 'e-commers',
                title: 'E-Commerce Platform',
                description: 'Modern e-commerce solution with product catalog, shopping cart, payment processing, user authentication, and admin dashboard.',
                category: 'web',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
                liveUrl: 'https://kainatjaved5.github.io/E-Commers/',
                thumbnail: 'E-commers.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/E-Commers',
                date: new Date('2024-01-20'),
                status: 'completed'
            },
            {
                id: 'self-defence',
                title: 'Self Defence Academy',
                description: 'Martial arts academy website with class schedules, instructor profiles, training programs, and online registration system.',
                category: 'web',
                technologies: ['React', 'Firebase', 'Material-UI', 'Calendar'],
                liveUrl: 'https://kainatjaved5.github.io/selef-defance/',
                thumbnail: 'selef defance.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/selef-defance',
                date: new Date('2024-01-15'),
                status: 'completed'
            },
            {
                id: 'social-media',
                title: 'Social Media Platform',
                description: 'Full-featured social media application with user profiles, posts, comments, likes, real-time messaging, and notifications.',
                category: 'web',
                technologies: ['MERN Stack', 'Socket.io', 'Cloudinary', 'JWT'],
                liveUrl: 'https://kainatjaved5.github.io/social-media/',
                thumbnail: 'social.png',
                featured: false,
                github: 'https://github.com/Kainatjaved5/social-media',
                date: new Date('2024-01-12'),
                status: 'completed'
            },
            {
                id: 'portfolio-showcase',
                title: 'Portfolio Showcase',
                description: 'Creative portfolio website with project galleries, skill showcases, testimonials, and contact forms for freelancers.',
                category: 'design',
                technologies: ['React', 'Framer Motion', 'TailwindCSS', 'EmailJS'],
                liveUrl: 'https://kainatjaved5.github.io/portfolio/',
                thumbnail: 'kj portfolio.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/portfolio',
                date: new Date('2024-01-10'),
                status: 'completed'
            },
            {
                id: 'kjportfolio-main',
                title: 'Kainat Javed Portfolio',
                description: 'Professional portfolio website with modern design, project showcases, responsive layout, and smooth animations.',
                category: 'web',
                technologies: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS', 'GitHub Pages'],
                liveUrl: 'https://kainatjaved5.github.io/kjportfolio/',
                thumbnail: 'kj portfolio.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/kjportfolio',
                date: new Date('2024-01-30'),
                status: 'completed'
            },
            {
                id: 'kainat-javed-artist',
                title: 'Kainat Javed Artist Portfolio',
                description: 'Creative artist portfolio showcasing artwork, exhibitions, and artistic journey with elegant design and immersive gallery experience.',
                category: 'design',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Gallery'],
                liveUrl: 'https://kainatjaved5.github.io/kainat-javed-artist/',
                thumbnail: 'sdtqui.png',
                featured: true,
                github: 'https://github.com/Kainatjaved5/kainat-javed-artist',
                date: new Date('2024-01-31'),
                status: 'completed'
            }
        ];

        // Try to load additional projects from localStorage
        const storedProjects = localStorage.getItem('portfolioProjects');
        if (storedProjects) {
            try {
                const additionalProjects = JSON.parse(storedProjects);
                return [...defaultProjects, ...additionalProjects];
            } catch (e) {
                console.warn('Failed to parse stored projects:', e);
            }
        }

        return defaultProjects;
    }

    /**
     * Process individual project data
     */
    async processProject(config) {
        try {
            // Validate required fields
            if (!config.id || !config.title || !config.liveUrl) {
                console.warn('Invalid project configuration:', config);
                return null;
            }

            // Process thumbnail
            const thumbnail = await this.processThumbnail(config.thumbnail, config.id);

            return {
                ...config,
                thumbnail,
                date: new Date(config.date),
                technologies: config.technologies || [],
                featured: config.featured || false,
                status: config.status || 'completed'
            };
        } catch (error) {
            console.error('Error processing project:', config.id, error);
            return null;
        }
    }

    /**
     * Process project thumbnail with website preview
     */
    async processThumbnail(thumbnailUrl, projectId) {
        // If custom thumbnail is provided, use it
        if (thumbnailUrl && thumbnailUrl.trim() !== '') {
            return thumbnailUrl;
        }

        // Generate website preview using screenshot service
        const project = this.projects.find(p => p.id === projectId);
        if (project && project.liveUrl) {
            // Use multiple screenshot services for reliability
            const screenshotServices = [
                `https://api.screenshotone.com/take?url=${encodeURIComponent(project.liveUrl)}&width=400&height=300&format=jpg&device=desktop&scale_factor=1&full_page=false`,
                `https://htmlcsstoimage.com/demo_run/screenshot?url=${encodeURIComponent(project.liveUrl)}&width=400&height=300`,
                `https://screenshot.abstractapi.com/v1/?api_key=free&url=${encodeURIComponent(project.liveUrl)}&width=400&height=300`,
                // Fallback to a generic website preview service
                `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(project.liveUrl)}&screenshot=true`
            ];

            // Return the first service URL (will be tried in order if it fails)
            return screenshotServices[0];
        }

        // Final fallback to placeholder
        return `https://picsum.photos/400/300?random=${projectId}`;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterAndRenderProjects();
            });
        }

        // Category filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.category);
                this.filterAndRenderProjects();
            });
        });

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.filterAndRenderProjects();
            });
        }

        // Modal close handlers
        this.setupModalHandlers();
    }

    /**
     * Set active filter
     */
    setActiveFilter(category) {
        this.currentFilter = category;
        
        // Update UI
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-red-500', 'text-white');
            btn.classList.add('bg-gray-800', 'text-gray-300');
        });
        
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-800', 'text-gray-300');
            activeBtn.classList.add('active', 'bg-red-500', 'text-white');
        }
    }

    /**
     * Filter and render projects
     */
    filterAndRenderProjects() {
        // Apply filters
        this.filteredProjects = this.projects.filter(project => {
            // Category filter
            if (this.currentFilter !== 'all' && project.category !== this.currentFilter) {
                return false;
            }

            // Search filter
            if (this.searchQuery) {
                const searchTerm = this.searchQuery.toLowerCase();
                return (
                    project.title.toLowerCase().includes(searchTerm) ||
                    project.description.toLowerCase().includes(searchTerm) ||
                    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
                );
            }

            return true;
        });

        // Sort projects
        this.sortProjects();

        // Render
        this.renderProjects();
    }

    /**
     * Sort projects
     */
    sortProjects() {
        switch (this.currentSort) {
            case 'recent':
                this.filteredProjects.sort((a, b) => b.date - a.date);
                break;
            case 'name':
                this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'category':
                this.filteredProjects.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'featured':
                this.filteredProjects.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.date - a.date;
                });
                break;
        }
    }

    /**
     * Render projects grid
     */
    renderProjects() {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        if (this.filteredProjects.length === 0) {
            container.innerHTML = this.getEmptyState();
            return;
        }

        const projectsHTML = this.filteredProjects.map((project, index) => 
            this.createProjectCard(project, index)
        ).join('');

        container.innerHTML = projectsHTML;

        // Animate cards
        this.animateProjectCards();
    }

    /**
     * Create project card HTML
     */
    createProjectCard(project, index) {
        const technologies = project.technologies.slice(0, 4).map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        const featuredBadge = project.featured ? 
            '<div class="featured-badge">⭐ Featured</div>' : '';

        return `
            <div class="project-card" data-project-id="${project.id}" style="animation-delay: ${index * 0.1}s">
                <div class="project-image-container">
                    <img src="${project.thumbnail}" alt="${project.title}" class="project-image" loading="lazy"
                         onerror="this.src='https://picsum.photos/400/300?random=${project.id}'">
                    <div class="project-overlay">
                        <button class="preview-btn" onclick="portfolioSystem.openPreview('${project.id}')">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Preview
                        </button>
                        <button class="live-btn" onclick="portfolioSystem.openLiveProject('${project.id}')">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live
                        </button>
                    </div>
                </div>
                <div class="project-content">
                    ${featuredBadge}
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${technologies}
                    </div>
                    <div class="project-meta">
                        <span class="project-category">${this.formatCategory(project.category)}</span>
                        <span class="project-date">${this.formatDate(project.date)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Open project preview
     */
    openPreview(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.showPreviewModal(project);
    }

    /**
     * Open live project
     */
    openLiveProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }

    /**
     * Show preview modal
     */
    showPreviewModal(project) {
        const modal = document.getElementById('preview-modal');
        if (!modal) return;

        const modalContent = `
            <div class="preview-header">
                <h3>${project.title}</h3>
                <button class="close-btn" onclick="portfolioSystem.closePreview()">×</button>
            </div>
            <div class="preview-body">
                <iframe 
                    src="${project.liveUrl}" 
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    class="preview-iframe"
                    title="${project.title} Preview">
                </iframe>
            </div>
            <div class="preview-footer">
                <button class="refresh-btn" onclick="portfolioSystem.refreshPreview()">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
                <button class="open-btn" onclick="portfolioSystem.openLiveProject('${project.id}')">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                </button>
            </div>
        `;

        modal.innerHTML = modalContent;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close preview modal
     */
    closePreview() {
        const modal = document.getElementById('preview-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    /**
     * Refresh preview iframe
     */
    refreshPreview() {
        const iframe = document.querySelector('.preview-iframe');
        if (iframe) {
            const src = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = src;
            }, 100);
        }
    }

    /**
     * Setup modal handlers
     */
    setupModalHandlers() {
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePreview();
            }
        });

        // Close on background click
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('preview-modal');
            if (modal && e.target === modal) {
                this.closePreview();
            }
        });
    }

    /**
     * Animate project cards
     */
    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }

    /**
     * Initialize animations
     */
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        const container = document.getElementById('projects-grid');
        if (container) {
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Loading projects...</p>
                </div>
            `;
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        // Loading state is replaced when projects are rendered
    }

    /**
     * Get empty state HTML
     */
    getEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3>No projects found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
    }

    /**
     * Show error message
     */
    showError(message) {
        const container = document.getElementById('projects-grid');
        if (container) {
            container.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">
                        <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3>Error</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    /**
     * Format category name
     */
    formatCategory(category) {
        const categories = {
            'web': 'Web Development',
            'mobile': 'Mobile Apps',
            'design': 'UI/UX Design',
            'backend': 'Backend',
            'other': 'Other'
        };
        return categories[category] || category;
    }

    /**
     * Format date
     */
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Add new project via URL - Easy method to add projects
     */
    addProjectByUrl(projectData) {
        const project = {
            id: this.generateProjectId(projectData.title),
            title: projectData.title,
            description: projectData.description,
            category: projectData.category || 'web',
            technologies: projectData.technologies || [],
            liveUrl: projectData.liveUrl,
            thumbnail: projectData.thumbnail || `https://picsum.photos/400/300?random=${Date.now()}`,
            featured: projectData.featured || false,
            github: projectData.github || 'https://github.com/Kainatjaved5/kjportfolio',
            date: new Date(),
            status: 'completed'
        };

        this.projects.push(project);
        this.filterAndRenderProjects();
        
        // Save to localStorage
        this.saveProjects();
        
        console.log('Project added:', project);
        return project;
    }

    /**
     * Quick add project - Simplified method
     */
    quickAddProject(title, liveUrl, description = '', category = 'web', technologies = []) {
        return this.addProjectByUrl({
            title,
            liveUrl,
            description,
            category,
            technologies
        });
    }

    /**
     * Add new project
     */
    addProject(projectData) {
        return this.addProjectByUrl(projectData);
    }

    /**
     * Generate unique project ID
     */
    generateProjectId(title) {
        return title.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') + '-' + Date.now();
    }

    /**
     * Save projects to localStorage
     */
    saveProjects() {
        const userProjects = this.projects.filter(p => !['ai-assistant', 'ecommerce-platform', 'mobile-app', 'ui-dashboard'].includes(p.id));
        localStorage.setItem('portfolioProjects', JSON.stringify(userProjects));
    }
}

// Initialize portfolio system
let portfolioSystem;
document.addEventListener('DOMContentLoaded', () => {
    portfolioSystem = new PortfolioSystem();
});
