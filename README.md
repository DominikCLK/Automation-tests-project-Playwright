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
