#Sauce Labs is the all-in-one platform for web and mobile application testing and error monitoring.
#In 'playwright_ui_saucedemo' project were created ui automation test cases for saucedemo.com application.
#All test cases located in next file: tests/saucedemo.spec.ts
#Also was created page-objects directory, which contains two subdirectories: pages and atoms.
#In testing were considered three pages: login page = SwagLagsLoginPage.ts, main page = InventoryPage.ts, and our cart = CartPage.ts
#For best practice, and free space economy was created two atoms: Buttons.ts and Input.ts .

#Command to install playwright:
npx playwright install
npm init

#To install and use code formatter:
npm install prettier
npx prettier . --check
npx prettier . --write

#How to run test cases in debug mode: (from Terminal(Local))
npx playwright test --debug --workers=1 --project=chromium
npx playwright test --debug --workers=1

#How to launch test case without debug mode:
npx playwright test --headed --workers=1 --project=chromium

#How to run one test case: test.only ... + command in Terminal without debug mode, fast mode:
npx playwright test -g "BG1-5" --workers=1 --project=chromium
npx playwright test -g "BG1-7" --workers=1

#How to run test cases in different browsers:
npx playwright test --headed --workers=1 --project=chromium
npx playwright test --workers=1 --project=firefox
npx playwright test --workers=1 --project=webkit

#How to run all test cases:
npx playwright test
npx playwright test tests/saucedemo.spec.ts

#To open last HTML report run:
npx playwright show-report
