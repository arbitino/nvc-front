# Импорт/Экспорт вакансий
Простое приложение сделанное с помощью **Feature-Sliced Design + Vue 3**.

Состоит из 3 страниц:
- Массовая загрузке через файл
- Одиночная загрузка через форму
- Выгрузка резюме в csv

Для корректной работы необходим API сервер

Не забудьте создайть файл кофнигурации окружения `.env` на подобие `.env.sample`

## Установка зависимостей

```sh
yarn
```

### Сборка для разработки

```sh
yarn dev
```

## Feature-Sliced Design

**Feature-Sliced Design** (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and structured in the face of ever-changing business requirements.

![how fsd looks like](/public/fsd-scheme.jpg)
_Scheme of Feature-Sliced Design_

Information provided by [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview)