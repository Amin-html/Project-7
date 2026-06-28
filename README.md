# 🏪 Lalafo Clone

Доска объявлений — Проект 7 из 10.
Django REST Framework + React + PostgreSQL + Docker.

## Стек
### Бэкенд
- Django 5.2 + DRF + JWT + PostgreSQL

### Фронтенд  
- React + Vite + React Router + Axios + Context API

## Функционал
- 🏠 Главная с категориями и свежими объявлениями
- 📋 Каталог с фильтрами по категориям и поиском
- 📝 Создание объявлений с фото
- 💬 Чат между покупателем и продавцом
- 👤 Мои объявления
- 🔐 JWT авторизация

## Запуск
```bash
git clone https://github.com/Amin-html/Project-7.git
cd Project-7
docker-compose up --build
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```