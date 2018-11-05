Frontend

Backend

1. disable World Wide Web Provider Windows Service
2. composer create-project laravel/laravel="5.2.*" --prefer-dist backend
3. Change .env file to support sqlite and local db connections
4. php artisan make:migration create_todos_table --create=todos
5. php artisan migrate
