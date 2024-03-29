## Yellowmine

1. создать .env файл с переменными из .env.example:
    ```dotenv
    REDMINE_URL= #url редмайна #в нашем случае https://subtrace.atollis.com
    YM_PORT= #порт, который будет слушать контейнер
    ```
2. docker-compose up -d

Само приложение слушает 3000-ый порт - при запуске вне докера.
