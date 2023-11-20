# This file contains concept decisions for GAD automation framework

# Table of Contents

1. [Integration of code style tools in framework](#integration-of-code-style-tools-in-framework)
2. [Use of dotenv in automated tests](#use-of-dotenv-in-automated-tests)
3. [Use of design patterns like POM, AAA, and composition in automated tests](#use-of-design-patterns-like-pom-aaa-and-composition-in-automated-tests)
4. [Use of faker in automated tests](#use-of-faker-in-automated-tests)
5. [Introduction of New Methods Returning Page Objects in Page Objects Code](#introduction-of-new-methods-returning-page-objects)

# Decisions

## Integration of code style tools in framework <a id="integration-of-code-style-tools-in-framework"></a>

**ID**: 001  
**Status**: Decided  
**Date**: 2023/11/13  
**Context**:
We need static code analysis tools for:

- unified code standard in the framework
- better code readability
- easy code formatting actions

**Proposed solution**

- ESLint for linting coding rules for TypeScript files
- Prettier for formatting files
- Husky for running linting scripts

**Pros**: Tools automate formatting and code style maintenance activities

**Cons**: New tools add more complexity to the solution and require maintenance

**Decision**: Use Prettier, ESLint, and Husky to provide high code standard across the framework

**Creator**: Dominik C

## Use of dotenv in automated tests <a id="use-of-dotenv-in-automated-tests"></a>

**ID**: 002  
**Status**: Decided  
**Date**: 2023/11/20  
**Context**: We need a reliable way to manage environment-specific configurations, such as passwords, API keys, database connections, and other sensitive information.

**Proposed solution**: Utilize the 'dotenv' library in our automated tests.

**Pros**:

- Secure configuration management - dotenv allows us to store sensitive information like API keys and passwords in a separate file (e.g., .env) and keeps them out of version control, enhancing security.
- Simplified environment setup - with dotenv, we can easily switch between different environments (e.g., development, staging, production) without modifying test code, leading to more flexibility and ease of use.
- Improved collaboration - developers and testers can have their own .env files with custom configurations, making it easier to collaborate on the same test suite with different setups.
- Enhanced test portability - since dotenv decouples configurations from the code, the same test suite can be used across different environments and machines effortlessly.

**Cons**:

- Extra setup steps - integrating dotenv into our testing framework requires initial setup, including installing the library and ensuring that the .env files are correctly managed.
- Potential for misconfiguration - if .env files are not managed properly or if they contain errors, it may lead to test failures or unexpected behavior during test execution.

**Decision**: Decided

**Creator**: Dominik C

## Use of design patterns like POM, AAA, and composition in automated tests <a id="use-of-design-patterns-like-pom-aaa-and-composition-in-automated-tests"></a>

**ID**: 003  
**Status**: Decided  
**Date**: 2023/11/20  
**Context**: As our automated test suite grows, we face challenges in maintaining test code readability, reusability, and scalability. We are considering adopting design patterns to improve the overall test structure and maintainability.

**Proposed solution**: Implement the Page Object Model (POM) for UI tests, Arrange-Act-Assert (AAA) pattern for tests, and Composition for creating modular and flexible test components.

**Pros**:

- **Page Object Model (POM)**:

  - Enhanced test organization - POM allows us to structure UI test code by creating separate classes for each web page, resulting in a more organized and readable test suite.
  - Improved test maintenance - Changes to the UI can be localized within the page class, reducing the impact on test code and speeding up maintenance efforts.
  - Reusability - POM promotes reusing page methods across different tests, leading to a more efficient test development process.

- **Arrange-Act-Assert (AAA)**:

  - Clear test structure - AAA separates test code into three distinct sections, making it easier to understand the test's setup, action, and verification steps.
  - Better error localization - With AAA, it is simpler to pinpoint the cause of test failures, aiding in quicker issue resolution.
  - Facilitates testing best practices - AAA aligns with the principles of testing, encouraging developers to write more reliable and robust tests.

- **Composition**:
  - Modular test components - Using composition allows us to build test scenarios by assembling smaller, reusable building blocks, enhancing test maintainability.
  - Flexible test design - By composing test components, we can easily create different test combinations and scenarios, promoting test coverage and adaptability.

**Cons**:

- **Page Object Model (POM)**:

  - Initial setup overhead - Implementing POM may require additional effort in creating page classes and refactoring existing test code.
  - Potential overhead for small projects - In smaller projects with limited UI testing, POM may introduce unnecessary complexity.

- **Arrange-Act-Assert (AAA)**:

  - Learning curve - Developers unfamiliar with AAA might require some time to adapt to the new testing pattern.

- **Composition**:
  - Complexity management - While composition promotes modularity, if not properly managed, it can lead to an overly complex test structure.
  - Abstraction balance - Overuse of composition might obscure the underlying test logic, making it harder to understand the test flow.

**Decision**: Decided. We will adopt the Page Object Model (POM) for UI tests, Arrange-Act-Assert (AAA) pattern for tests.

**Creator**: Dominik C
