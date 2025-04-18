# RotaVision Theme Installation Guide

This guide provides detailed instructions for installing and setting up the RotaVision Jekyll theme for your website.

## Docker Installation (Recommended)

Using Docker is the recommended method as it ensures a consistent environment regardless of your operating system.

### Prerequisites

- [Docker](https://www.docker.com/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rotavision-theme.git
   cd rotavision-theme
   ```

2. **Start the Docker container**

   ```bash
   docker-compose up
   ```

3. **Access your site**
   
   Your site will be available at [http://localhost:4000](http://localhost:4000)

4. **Making changes**
   
   Any changes you make to the files will automatically trigger a rebuild, and you'll see the changes reflected in your browser.

5. **Stopping the container**
   
   When you're done working, press `Ctrl+C` in the terminal, or run:
   
   ```bash
   docker-compose down
   ```

## Traditional Installation

If you prefer not to use Docker, you can install the theme directly.

### Prerequisites

- Ruby version 2.5.0 or higher
   - Check with `ruby -v`
   - Install from [Ruby website](https://www.ruby-lang.org/en/documentation/installation/)
- RubyGems
   - Check with `gem -v`
   - Usually comes with Ruby
- GCC and Make
   - Check with `gcc -v` and `make -v`
   - Install using your system's package manager
- Jekyll and Bundler gems
   - Install with `gem install jekyll bundler`

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rotavision-theme.git
   cd rotavision-theme
   ```

2. **Install dependencies**

   ```bash
   bundle install
   ```

3. **Build the site and start the local server**

   ```bash
   bundle exec jekyll serve
   ```

4. **Access your site**
   
   Your site will be available at [http://localhost:4000](http://localhost:4000)

5. **Making changes**
   
   Many changes will automatically trigger a rebuild. For some changes, you may need to restart the server.

## Deployment

### GitHub Pages

1. Update the `baseurl` in your `_config.yml`:
   
   ```yaml
   baseurl: "/repository-name" # the subpath of your site
   ```

2. Push to your GitHub repository:
   
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/repository-name.git
   git push -u origin main
   ```

3. Enable GitHub Pages in your repository settings.

### Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Create a new site from Git and select your repository
3. Use the following build settings:
   - Build command: `jekyll build`
   - Publish directory: `_site`
4. Deploy the site

### Custom Server

1. Build the site:
   
   ```bash
   bundle exec jekyll build
   ```

2. The static files will be in the `_site` directory. Upload these files to your web server.

## After Installation

Once you have the theme installed and running, you should:

1. Update `_config.yml` with your site's information
2. Replace the logo in `assets/images/logo.svg`
3. Customize the color scheme in `_sass/rotavision/_variables.scss`
4. Create your services in the `_services` directory
5. Create your case studies in the `_case_studies` directory
6. Update the content of the homepage in `index.md`

## Troubleshooting

### Common Issues with Docker

- **Port conflict**: If port 4000 is already in use, modify the `docker-compose.yml` file to use a different port.
- **Permission issues**: Use `sudo` before docker commands if you encounter permission errors.

### Common Issues with Traditional Installation

- **Ruby version mismatch**: Use a version manager like [RVM](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv) to install the correct Ruby version.
- **Gem dependency conflicts**: Try using `bundle update` to resolve dependency issues.
- **Jekyll build errors**: Check the error message for specific file references and fix the syntax or content issues.

## Getting Help

If you encounter any issues not covered here, please:

1. Check the [Jekyll documentation](https://jekyllrb.com/docs/)
2. Search for the error message online
3. Contact us at support@yourcompany.com for theme-specific issues

## Updates

To update the theme:

1. Pull the latest changes:
   
   ```bash
   git pull origin main
   ```

2. Update dependencies:
   
   ```bash
   bundle update
   ```

3. Restart your server to apply the changes