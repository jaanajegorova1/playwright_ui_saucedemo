#How to run tests from Terminal(Local): npx playwright test --debug --workers=1 --project=chromium
npx playwright test --workers=1
npx playwright test --workers=1 --project=chromium
npx playwright test --debug --workers=1 --project=chromium
npx playwright test --headed --workers=1 --project=chromium
npx playwright test
npx playwright test --workers=1 --project=firefox
npx playwright test --workers=1 --project=webkit


#How to run one test case:
npx playwright test -g"BG1-5" --workers=1 --project=chromium

#To open last HTML report run:
npx playwright show-report
