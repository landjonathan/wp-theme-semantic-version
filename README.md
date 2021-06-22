# WP theme semantic versioning

A small utility that bumps WordPress theme versions using [semantic versioning](https://semver.org/).
Useful for cache-busting production sites.

## Usage

### Terminal
In the theme's folder, run
```bash
npx wp-theme-semver-bump
```

### In a script (e.g. gulp)
```js
const bump = require('wp-theme-semver-bump')
// ...
bump()
```

## Arguments

### Release type
```bash
npx wp-theme-semver-bump minor
```
or
```js
bump('minor')
```

## Custom file location
```bash
npx wp-theme-semver-bump patch relative/path/to/style.css
```
or
```js
bump('patch', './relative/path/to/style.css')
```

## Why?
The main use case is cache busting in production. No more "Try emptying the cache or opening in an incognito tab"!

The theme version can be appended to enqueued assets:
```php
// functions.php or wherever you enqueue assets

// get the Version value from the theme's root style.css
$theme_version = wp_get_theme()->get('Version'); 

// append the version no. to the asset's src / href, e.g. 'theme/css/style.min.css?ver=0.1.0'
wp_enqueue_style('style', get_stylesheet_directory_uri() . '/css/style.min.css', [], $theme_version);
```