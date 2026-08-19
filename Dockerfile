FROM php:8.2-apache

# 安装composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 复制代码
COPY . /var/www/html
WORKDIR /var/www/html

# 安装php扩展
RUN apt-get update && apt-get install -y git unzip && rm -rf /var/lib/apt/lists/*

# 安装composer依赖
RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html
EXPOSE 80
