# RotaVision Jekyll Theme

A clean, unique, and modern Jekyll theme designed specifically for AI solution companies and consultancies. The RotaVision theme features sophisticated gradient animations, floating UI elements, and asymmetrical layouts to create a premium, cutting-edge feel.

## Features

- **Unique Gradient Evolution** design concept with smooth, animated gradients
- **Floating UI Elements** that add subtle movement and depth
- **Asymmetrical Layouts** for modern, distinctive page designs
- **Custom Animations** that respond to user interaction
- **Responsive Design** that works beautifully on all devices
- **Optimized Performance** with lazy loading and deferred styles
- **Customizable Components** for services, case studies, and more

## Getting Started

### Prerequisites

- Ruby version 2.5.0 or higher
- RubyGems
- GCC and Make
- Jekyll and Bundler gems

### Installation

#### Using Docker (Recommended)

1. Make sure you have Docker installed on your system
2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/rotavision-theme.git
   cd rotavision-theme
   ```
3. Start the Docker container:
   ```bash
   docker-compose up
   ```
4. Your site will be available at http://localhost:4000

#### Manual Installation

1. Install Jekyll and Bundler:
   ```bash
   gem install jekyll bundler
   ```
2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/rotavision-theme.git
   cd rotavision-theme
   ```
3. Install dependencies:
   ```bash
   bundle install
   ```
4. Build the site and start the local server:
   ```bash
   bundle exec jekyll serve
   ```
5. Your site will be available at http://localhost:4000

## Theme Structure

```
rotavision-theme/
├── _includes/              # Reusable components
├── _layouts/               # Page templates
├── _sass/                  # Sass stylesheets
├── assets/                 # Static assets
│   ├── css/                # Compiled CSS
│   ├── js/                 # JavaScript files
│   ├── images/             # Images
│   └── fonts/              # Custom fonts
├── _config.yml             # Jekyll configuration
└── index.md                # Homepage content
```

## Customization

### Configuration

Edit the `_config.yml` file to customize site-wide settings:

```yaml
# Site settings
title: Your Company Name
email: info@yourcompany.com
description: >-
  Your company description goes here.
baseurl: "" 
url: "https://yourcompany.com"
logo: "/assets/images/logo.svg"

# Navigation links
header_links:
  - title: Home
    url: /
  - title: Services
    url: /services
  # Add more links as needed

# Social media
social_links:
  twitter: yourcompany
  linkedin: yourcompany
  github: yourcompany

# Contact information
contact:
  address: "Your company address"
  phone: "+1 (555) 123-4567"
  email: "info@yourcompany.com"
```

### Creating Pages

Create new pages by adding Markdown files in the root directory:

```markdown
---
layout: page
title: About Us
permalink: /about/
---

Content for your about page goes here.
```

### Creating Services

Create service pages by adding Markdown files in the `_services` directory:

```markdown
---
layout: service
title: Your Service Name
subtitle: Brief description of your service
description: Detailed description of the service for SEO and summaries.
category: Service Category
icon: /assets/images/icons/your-icon.svg
hero_image: /assets/images/services/service-hero.jpg

features:
  - Feature One
  - Feature Two
  - Feature Three

testimonial:
  quote: "Testimonial quote goes here."
  author: "Client Name"
  company: "Company Name"

cta_button:
  text: Call to Action Text
  url: /contact
---

Service content in Markdown format goes here.
```

### Creating Case Studies

Create case studies by adding Markdown files in the `_case_studies` directory:

```markdown
---
layout: case-study
title: Case Study Title
category: Category
industry: Industry Name
client_name: Client Name
summary: Brief summary of the case study
featured_image: /assets/images/case-studies/image.jpg

challenge: |
  Description of the challenge faced by the client.

approach: |
  How you approached solving the challenge.

solution: |
  The solution you implemented.

results:
  - value: "37%"
    label: "Improvement in X"
  - value: "28%"
    label: "Reduction in Y"

testimonial:
  quote: "Client testimonial goes here."
  author: "Client Name"
  position: "Client Position"
  company: "Company Name"

gallery:
  - url: /assets/images/case-studies/image1.jpg
    caption: Image caption
  - url: /assets/images/case-studies/image2.jpg
    caption: Image caption
---

Detailed case study content in Markdown format.
```

## Customizing Theme Colors

You can customize the theme colors by editing the `_sass/rotavision/_variables.scss` file. The main color variables are:

```scss
// Primary colors
$primary-500: #3a63f4;  // Primary brand color

// Secondary colors
$secondary-500: #8a3cf4;  // Secondary brand color

// Accent colors
$accent-500: #ff7c3a;  // Accent brand color
```

## Customizing Gradients

The gradient animations can be customized in `assets/js/gradient.js` by changing the color variables:

```javascript
this.gradientColors = [
  getComputedStyle(this.canvas).getPropertyValue('--gradient-color-1'),
  getComputedStyle(this.canvas).getPropertyValue('--gradient-color-2'),
  getComputedStyle(this.canvas).getPropertyValue('--gradient-color-3'),
  getComputedStyle(this.canvas).getPropertyValue('--gradient-color-4')
];
```

## Components

### Floating Elements

Add a floating effect to any element by adding the `floating-element` class:

```html
<div class="floating-element">
  Your content here
</div>
```

You can control the floating behavior with these modifier classes:

- `float-horizontal`: Floats horizontally instead of vertically
- `float-diagonal`: Combines horizontal and vertical floating
- `float-rotate`: Adds a subtle rotation during floating
- `float-on-hover`: Only floats when hovered
- `no-float`: Disables floating animation but keeps hover effects

### Gradient Hero Section

Use the gradient hero section on your homepage:

```html
{% include gradient-hero.html 
  title="Your Hero Title" 
  subtitle="Your hero subtitle or description" 
  buttons=page.hero_buttons 
%}
```

### Service Cards

Display your services with attractive cards:

```html
{% include service-card.html service=service %}
```

### Case Study Cards

Display case studies with interactive cards:

```html
{% include case-study.html case_study=case_study %}
```

## Browser Support

The RotaVision theme supports the following browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

The theme includes several performance optimizations:

1. **Lazy Loading**: Images are loaded only when they enter the viewport
2. **Deferred Styles**: Non-critical styles are loaded after the page renders
3. **Animation Pausing**: Animations pause when not visible in the viewport
4. **Reduced Motion**: Respects user preferences for reduced motion

## License

This theme is available as open source under the terms of the [MIT License](LICENSE).

## Support

For questions or support, please email [support@yourcompany.com](mailto:support@yourcompany.com).