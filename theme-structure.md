# RotaVision Jekyll Theme Structure


## Theme Structure
```
rotavision-theme/
├── _includes/              # Reusable components
│   ├── header.html         # Site header with navigation
│   ├── footer.html         # Site footer
│   ├── gradient-hero.html  # Dynamic gradient hero section
│   ├── floating-card.html  # Floating UI element component
│   ├── service-card.html   # Card for displaying services
│   ├── case-study.html     # Case study display component
│   └── contact-form.html   # Contact form component
│
├── _layouts/               # Page templates
│   ├── default.html        # Base layout with header and footer
│   ├── home.html           # Homepage layout
│   ├── page.html           # Standard page layout
│   ├── post.html           # Blog post layout
│   └── case-study.html     # Case study layout
│
├── _sass/                  # Sass stylesheets
│   ├── rotavision/         # Theme styles
│   │   ├── _variables.scss # Theme variables
│   │   ├── _base.scss      # Base styles
│   │   ├── _typography.scss # Typography styles
│   │   ├── _animations.scss # Animations and transitions
│   │   ├── _gradients.scss # Gradient definitions
│   │   ├── _layout.scss    # Layout styles
│   │   └── _components.scss # Component styles
│   └── rotavision.scss     # Main Sass file
│
├── assets/                 # Static assets
│   ├── css/                # Compiled CSS
│   │   └── main.scss       # Main stylesheet
│   ├── js/                 # JavaScript files
│   │   ├── main.js         # Main JavaScript file
│   │   ├── gradient.js     # Gradient animation
│   │   └── animations.js   # UI animations
│   ├── images/             # Images
│   │   ├── logo.svg        # RotaVision logo
│   │   └── icons/          # Custom icons
│   └── fonts/              # Custom fonts
│
├── _config.yml             # Jekyll configuration
├── index.md                # Homepage content
├── about.md                # About page
├── services.md             # Services page
├── case-studies.md         # Case studies page
└── contact.md              # Contact page
```

## Implementation Plan

1. **First, I'll create the core theme files**: 
   - Basic layouts and includes
   - Main stylesheet structure
   - JavaScript for gradient and animation effects

2. **Then, I'll implement the unique design elements**:
   - Dynamic gradient backgrounds
   - Floating UI elements
   - Custom animations
   - Asymmetrical layouts

3. **Finally, I'll create sample content pages** to showcase the theme:
   - Homepage with gradient hero section
   - Services page with floating cards
   - Case studies with interactive elements
   - About and contact pages

