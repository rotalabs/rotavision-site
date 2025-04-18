FROM ruby:3.2-alpine

RUN apk add --no-cache build-base gcc cmake git

# Add Jekyll dependencies
RUN gem install jekyll bundler

# Set working directory
WORKDIR /site

# Copy Gemfile if exists, otherwise we'll create one during initialization
COPY Gemfile* ./

# If Gemfile exists, install dependencies
RUN if [ -f Gemfile ]; then bundle install; fi

# Expose port for Jekyll server
EXPOSE 4000

# Command to run Jekyll server
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--livereload"]