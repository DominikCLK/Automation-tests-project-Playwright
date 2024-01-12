# Tests for GAD application

## GAD Application

Repository: https://github.com/jaktestowac/gad-gui-api-demo

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky install`
- prepare local env file : `cp .env-template .env`
- copy app main URL as value `BASE_URL` variable in `.env` file

## Deploy on Local
Requirements:

- node.js installed in system

Steps:

1. Open project root directory in cmd/terminal
2. Run ``` npm i```
3. Run ``` npm run start ```
Application will be available at ``` http://localhost:3000```

![2024-01-12_18h03_04](https://github.com/DominikCLK/Automation-tests-project-Playwright/assets/75272795/535ca31b-352e-4979-b8c4-234deb5a4bc2)

## Use

Run all tests:

```
npx playwright test

Run all tests with tags:

```

npx playwright test --grep /tag/

```

For more usage cases look in `package.json` scripts section.
```


