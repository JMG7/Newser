# AllFunds

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run `ng serve` for a front dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start-dev` for running the dev back server. The API URL is `http://localhost:3000/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.





## USER API

To create a USER use POST `http://localhost:3000/api/user/signup` and send JSON values {"userName": "Value", "name": "Value", "password": "Value"}

To login user use POST `http://localhost:3000/api/user/login` and send JSON values {"userName": "Value", "password": "Value"}

## NEWS API

To create a NEWS use POST `http://localhost:3000/api/news` and send JSON values {"title": "Value", "description": "Value", "content": "Value"}

To get NEWS use GET `http://localhost:3000/api/news?archived=true` (archived param is optional).

To archived a NEWS use PUT `http://localhost:3000/api/news/:id`

To delete a NEWS use DELETE `http://localhost:3000/api/news/:id`. The NEWS has to be archived to be deleted.
