# Fedex Signup Assignment

- [Fedex Signup Assignment](#fedex-signup-assignment)
- [Introduction](#introduction)
- [Installation](#installation)
  - [Local installation](#local-installation)
- [API](#api)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Useful Commands](#useful-commands)
- [Environment](#environment)
  - [Development server](#development-server)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
- [Supported Browsers](#supported-browsers)
- [Possible improvements](#possible-improvements)

# Introduction

This project is a simple single page web application to register the user.

This app consists of following features

1. The form should allow users to enter first name, last name, email, password and confirm password.
2. All Fields are required

Field validations are as follows

| Field            | Is required? | Any other rules?                                                             |
| ---------------- | ------------ | ---------------------------------------------------------------------------- |
| First Name       | yes          | should contain only characters                                               |
| First Name       | yes          | should contain only characters                                               |
| Email            | yes          | should match general email pattern                                           |
| Password         | yes          | should not contain First Name or Last Name, Should have minimum 8 characters |
| Confirm password | yes          | should match password                                                        |


# Installation

## Local installation

- Clone this repo using `git clone https://github.com/bharathmuppa/weather-base.git`
- Run `npm ci` for a clean install.
- Run `npm start` to start application in your local machine .
- Open chrome and navigate to `http://localhost:4200`

# API

This project makes use of

1. Fedex API (Weather Data)

   - Use simple API provided by `https://demo-api.now.sh/users`


# Project Structure

- This project structure is well suitable for enterprise level applications to small scale applications.
- Configured with latest eslint rules
- Prettier is in place to format the files on Save and on Request
- Equipped with code snippets to help developers to ease the process of documentation
- Project uses material for UX (opiniated)

# Deployment

Before deployment, Husky scripts check for linting, unit test and e2e test anomalies. Not meeting the check wont let you to push the code to repo.
After the successful check, code will be pushed to the corresponding branch in github and automatic scripts are in place to deploy it to netlify.

check live app after deployment [here](https://fedex-signup.netlify.app/authorization/signup)

# Documentation

Latest Documents will be available [here](https://fedex-signup-docs.netlify.app/)

# Useful Commands

Run `ng g c my-component` to generate a new component.
Run `ng g module my-component` to generate a new component.
Run `ng g service my-component` to generate a new component.
Run `npm run generate:Docs` to generate docs.
Run `npm run update` to update to latest version.


# Environment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
checkout coverage by opening  `coverage/fedex-assignment/index.html` in your favorite browser.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Supported Browsers

1. Chrome
2. Edge

# Possible improvements

1. Strong typings for reactive forms. [open issue in Angular repo](https://github.com/angular/angular/issues/13721) __🙇‍♂️__
2. Improve unit test on Negative flow. ✍
3. More error conditions would be possible if server responds with proper validations.
4. Form control name is used instead of form control to avoid strict type issues.
5. Return to register page from success page.
