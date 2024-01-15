---
title: Simplified WordPress Development with Docker Compose
---

While not a WordPress developer, I nonetheless find myself occasionally putting together one-off themes and plugins. As a result, it's rarely necessary for me to maintain a full WordPress development environment, but I also want to avoid starting from scratch whenever such a project crosses my desk.

In this post, we'll look at using Docker Compose to create a quick way to start building on WordPress plugins and themes that's both developer- and source control–friendly. Read on to find out more!

## Getting Started

Before starting, you'll need [Docker installed](https://www.docker.com/get-started/) locally. Once installed, the official [MySQL][image-mysql] and [WordPress Docker images][image-wp] provide an excellent foundation for what we need. We'll start with a standard Docker Compose configuration; the only points of note are that we're using a volume for the WordPress database (so we don't lose any data if we need to recreate the containers), and that we establish a dependency for the WordPress image on the MySQL one (via the `depends_on` property).

**NOTE**: _Please be aware this is_ absolutely not _a production-safe configuration: Its purpose is solely for local development._

```yml
version: '3.9'

services:
  wordpress:
    image: wordpress:latest
    depends_on:
      - db
    restart: always
    ports:
      # NOTE: WordPress will be accessible via port 8000, as defined here.
      - '8000:80'
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DEBUG: 1

  db:
    image: mysql:5.7
    restart: always
    ports:
      - '3306:3306'
    volumes:
      - dbdata:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

volumes:
  dbdata:
```

Once we have the Compose configuration in place, we can get WordPress started:

```bash
$ docker compose pull
$ docker compose up
```

It will take a moment for the images to be pulled and spin up, but once that's done, visit `http://localhost:8000` (port 8000 was configured in our Compose configuration file) and go through the WordPress setup. Once that's complete, we now have a full WordPress instance up and running!

## Adding Our Code

Now that we have a running WordPress instance, let's modify our Compose config to link up our own code. I won't prescribe a specific folder structure, but this approach has worked well for me: Everything's grouped in a `src` folder, within which each theme and plugin has its own folder:

```
- /project
  - /src
    - /example-plugin
      - index.php
  - docker-compose.yml
```

We'll use [Compose's `volumes` collection](https://docs.docker.com/storage/volumes/#use-a-volume-with-docker-compose) to do the mapping. Note that we're not mapping the entire `plugins` folder: Since most WordPress instances use at least some other plugins, it behooves us to map only the plugins we're working on. This also helps keep the source code clean and focused to just our own code.

```yaml
version: '3.9'

services:
  wordpress:
    # Other fields removed for brevity
    volumes:
      - ./src/example-plugin:/var/www/html/wp-content/plugins/example
```

[Creating a WordPress plugin](https://developer.wordpress.org/plugins/intro/) is beyond the scope of this post, but let's use the following trivial plugin for testing: The plugin's only "function" is to render a message on each page...just enough for us to verify everything's working.

```php
<?php

/**
 * Plugin Name: Example Plugin
 */

add_action('wp_footer', 'add_footer');
function add_footer() {
    echo '<p>Hello, world!</p>';
}
```

Compose won't be aware of our new volume mapping until the service is stopped and restarted (a normal `restart` command isn't sufficient):

```bash
$ docker compose stop
$ docker compose up
```

Once the containers are running again, take a peek at your instance's plugins page at `http://localhost:8000/wp-admin/plugins.php`. If all went well, you should see our new plugin in the list! Just click "Activate" and verify everything works by visiting any page of your WordPress instance and scrolling to the bottom.

## Next Steps

Though we've just demonstrated plugin development in this post, the same procedure applies for themes, as well: Just map your theme to `/var/www/html/wp-content/themes/<theme>`. Don't forget to activate it!

If you'd like a jumping-off point, [the code for this post is available on GitHub](https://github.com/timgthomas/blog-wordpress-docker-compose). Happy coding with WordPress!

[image-wp]: https://hub.docker.com/_/wordpress/
[image-mysql]: https://hub.docker.com/_/mysql/
