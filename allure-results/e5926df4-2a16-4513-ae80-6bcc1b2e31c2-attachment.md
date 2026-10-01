# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sendMoneyTest.spec.ts >> Send Money page object and validations >> SM-012 / SM-013 - blank recipient and blank amount block the transfer
- Location: tests\sendMoneyTest.spec.ts:50:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message')
Expected: visible
Error: strict mode violation: locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message') resolved to 2 elements:
    1) <div role="alert" data-testid="send-money-error" class="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">Please enter a valid amount.</div> aka getByTestId('send-money-error')
    2) <div role="alert" aria-live="assertive" id="__next-route-announcer__"></div> aka locator('[id="__next-route-announcer__"]')

Call log:
  - Expect "toBeVisible" locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message') with timeout 5000ms
  - waiting for locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "SecureBank" [ref=e6] [cursor=pointer]:
          - /url: /bank/dashboard
        - generic [ref=e13]:
          - button "Switch to dark mode" [ref=e14] [cursor=pointer]
          - link "Notifications — 2 unread" [ref=e18] [cursor=pointer]:
            - /url: /bank/notifications
            - generic [aria-hidden] [ref=e22]: "2"
          - button "Logout" [ref=e23]
      - generic [ref=e25]:
        - navigation "Main navigation" [ref=e27]:
          - generic [ref=e28]:
            - paragraph [ref=e29]: Main
            - navigation [ref=e30]:
              - link "Dashboard" [ref=e31] [cursor=pointer]:
                - /url: /bank/dashboard
              - link "Accounts" [ref=e38] [cursor=pointer]:
                - /url: /bank/accounts
              - link "Transfer" [ref=e42] [cursor=pointer]:
                - /url: /bank/transfer
              - link "Send Money" [ref=e47] [cursor=pointer]:
                - /url: /bank/send-money
              - link "Bill Pay" [ref=e52] [cursor=pointer]:
                - /url: /bank/bill-pay
              - link "Transactions" [ref=e57] [cursor=pointer]:
                - /url: /bank/transactions
              - link "Apply Loan" [ref=e63] [cursor=pointer]:
                - /url: /bank/apply-loan
            - separator [ref=e67]
            - paragraph [ref=e68]: Account
            - navigation [ref=e69]:
              - link "Notifications 2 unread notifications" [ref=e70] [cursor=pointer]:
                - /url: /bank/notifications
                - generic [ref=e74]: Notifications
                - generic "2 unread notifications" [ref=e75]: "2"
              - link "Profile" [ref=e76] [cursor=pointer]:
                - /url: /bank/profile
              - link "Test Cases" [ref=e81] [cursor=pointer]:
                - /url: /bank/test-cases
          - separator [ref=e86]
          - generic [ref=e87]:
            - generic [aria-hidden] [ref=e88]: ST
            - generic [ref=e89]: standard_user
        - main [ref=e90]:
          - generic [ref=e91]:
            - generic [ref=e97]:
              - heading "Send Money" [level=1] [ref=e98]
              - paragraph [ref=e99]: Pay someone externally
            - generic [ref=e101]:
              - alert [ref=e102]: Please enter a valid amount.
              - generic [ref=e103]:
                - generic [ref=e104]:
                  - generic [ref=e105]: From Account
                  - combobox "From Account" [ref=e106]:
                    - generic [ref=e107]: acc-checking-1
                    - img [aria-hidden]: ▼
                  - textbox [aria-hidden] [ref=e108]: acc-checking-1
                - generic [ref=e110]:
                  - generic [ref=e111]:
                    - generic [ref=e112]: Payee
                    - button "Add" [ref=e113]
                  - combobox "Payee" [ref=e115]:
                    - generic [ref=e116]: payee-001
                    - img [aria-hidden]: ▼
                  - textbox [aria-hidden] [ref=e117]: payee-001
                  - generic [ref=e118]: Chase Bank · ****6789
                - generic [ref=e119]:
                  - generic [ref=e120]: Amount
                  - generic [ref=e121]:
                    - generic [ref=e122]: $
                    - spinbutton "Amount" [ref=e123]
                - generic [ref=e124]:
                  - generic [ref=e125]: Note (optional)
                  - textbox "Note (optional)" [ref=e126]:
                    - /placeholder: e.g. Dinner last night
                    - text: expenses
                - generic [ref=e127]:
                  - button "Review & Send" [active] [ref=e128]
                  - button "Cancel" [ref=e129] [cursor=pointer]
  - alert [ref=e130]
  - button "Send feedback or report an issue" [ref=e131] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import { BankLogin } from '../Pages/loginBank'
  3   | import { sendMoney } from '../Pages/sendMoney'
  4   | import loginBankData from '../testData/loginBank.json'
  5   | import sendMoneyData from '../testData/sendMoney.json'
  6   | 
  7   | let lp: BankLogin
  8   | let sm: sendMoney
  9   | 
  10  | async function loginAndOpenSendMoney(page: any) {
  11  |   lp = new BankLogin(page)
  12  |   sm = new sendMoney(page)
  13  | 
  14  |   await lp.launchbrowser(loginBankData.url)
  15  |   await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  16  |   await sm.sendMoneyToPayee()
  17  |   return { lp, sm }
  18  | }
  19  | 
  20  | test.describe('Send Money page object and validations', () => {
  21  |   test.beforeEach(async ({ page }) => {
  22  |     await loginAndOpenSendMoney(page)
  23  |   })
  24  | 
  25  |   test('SM-001 / SM-002 / SM-003 / SM-004 - page is accessible and core controls are visible', async ({ page }) => {
  26  |     await expect(sm.SendMoneyTitle).toBeVisible()
  27  |     await expect(sm.page.locator('h1, h2')).toContainText(/send money/i)
  28  |     await expect(sm.fromAccount).toBeVisible()
  29  |     await expect(sm.payee).toBeVisible()
  30  |     await expect(sm.amount).toBeVisible()
  31  |     await expect(sm.note).toBeVisible()
  32  |     await expect(sm.sendButton).toBeVisible()
  33  |   })
  34  | 
  35  |   test('SM-005 / SM-006 / SM-007 / SM-008 - valid recipient and amount allow successful transfer', async ({ page }) => {
  36  |     await sm.fromAccount.click()
  37  |     await sm.everydayChecking.click()
  38  |     await sm.payee.click()
  39  |     await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
  40  |     await sm.amount.fill(sendMoneyData.correctMoney)
  41  |     await sm.note.fill(sendMoneyData.note)
  42  |     await sm.sendButton.click()
  43  |     await expect(sm.confirmDialog).toBeVisible()
  44  |     await sm.confirmDialog.click()
  45  | 
  46  |     await expect(sm.successMessage).toBeVisible()
  47  |     await expect(sm.page.locator(`text=/${sendMoneyData.transactionPattern}/i`)).toBeVisible()
  48  |   })
  49  | 
  50  |   test('SM-012 / SM-013 - blank recipient and blank amount block the transfer', async ({ page }) => {
  51  |     await sm.fromAccount.click()
  52  |     await sm.everydayChecking.click()
  53  |     await sm.payee.click()
  54  |     await sm.selectPayee.nth(0).click()
  55  |     await sm.amount.fill('')
  56  |     await sm.note.fill(sendMoneyData.note)
  57  |     await sm.sendButton.click()
  58  | 
  59  |    // await expect(page.locator(sendMoneyDta.validationSelector)).toBeVisible()
  60  |       await expect(sm.moneyError).toBeVisible()
  61  | 
  62  |     await sm.amount.fill(sendMoneyData.correctMoney)
  63  |     await sm.note.fill(sendMoneyData.note)
  64  |     await sm.payee.click()
  65  |     await sm.selectPayee.nth(0).click()
  66  |     await sm.amount.fill('')
  67  |     await sm.sendButton.click()
  68  | 
> 69  |     await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
  70  |   })
  71  | 
  72  |   test('SM-014 / SM-015 / SM-016 / SM-017 / SM-018 / SM-019 / SM-020 / SM-022 / SM-024 / SM-025 / SM-028 / SM-029 - invalid recipient, invalid amount, and boundary validations are rejected', async ({ page }) => {
  73  |     const invalidCases = [
  74  |       { recipient: sendMoneyData.invalidRecipientCases[0], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.invalidRecipient },
  75  |       { recipient: sendMoneyData.invalidRecipientCases[1], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.alphaAccount },
  76  |       { recipient: sendMoneyData.invalidRecipientCases[2], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.specialAccount },
  77  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[0], note: sendMoneyData.notes.alphaAmount },
  78  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[1], note: sendMoneyData.notes.specialAmount },
  79  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[2], note: sendMoneyData.notes.negativeAmount },
  80  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[3], note: sendMoneyData.notes.zeroAmount },
  81  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[4], note: sendMoneyData.notes.tooManyDecimals },
  82  |       { recipient: sendMoneyData.spaceCases[0], amount: '100', note: sendMoneyData.notes.spacesAccount },
  83  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.spaceCases[1], note: sendMoneyData.notes.spacesAmount },
  84  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[5], note: sendMoneyData.notes.tooHigh },
  85  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[6], note: sendMoneyData.notes.veryLargeNumber }
  86  |     ]
  87  | 
  88  |     for (const testData of invalidCases) {
  89  |       await sm.fromAccount.click()
  90  |       await sm.everydayChecking.click()
  91  |       await sm.payee.click()
  92  |       await sm.selectPayee.nth(0).click()
  93  |       await sm.amount.fill(testData.amount)
  94  |       await sm.note.fill(testData.note)
  95  |       await sm.sendButton.click()
  96  | 
  97  |       await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
  98  |       await page.reload()
  99  |       await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  100 |       await sm.sendMoneyToPayee()
  101 |     }
  102 |   })
  103 | 
  104 |   test('SM-021 / SM-023 / SM-026 / SM-027 / SM-057 / SM-058 / SM-059 / SM-060 - valid minimum, exact-balance, decimals, and repeated transfers follow business rules', async ({ page }) => {
  105 |     await sm.fromAccount.click()
  106 |     await sm.everydayChecking.click()
  107 |     await sm.payee.click()
  108 |     await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
  109 |     await sm.amount.fill(sendMoneyData.minimumAmount)
  110 |     await sm.note.fill(sendMoneyData.notes.minimumAmountNote)
  111 |     await sm.sendButton.click()
  112 |     await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  113 | 
  114 |     await page.reload()
  115 |     await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  116 |     await sm.sendMoneyToPayee()
  117 | 
  118 |     await sm.fromAccount.click()
  119 |     await sm.everydayChecking.click()
  120 |     await sm.payee.click()
  121 |     await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
  122 |     await sm.amount.fill(sendMoneyData.decimalAmount)
  123 |     await sm.note.fill(sendMoneyData.notes.decimalTransferNote)
  124 |     await sm.sendButton.click()
  125 |     await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  126 |   })
  127 | 
  128 |   test('SM-036 / SM-037 / SM-046 / SM-047 - success and failed transactions show correct state and balance behavior', async ({ page }) => {
  129 |     await sm.fromAccount.click()
  130 |     await sm.everydayChecking.click()
  131 |     await sm.payee.click()
  132 |     await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
  133 |     await sm.amount.fill(sendMoneyData.correctMoney)
  134 |     await sm.note.fill(sendMoneyData.note)
  135 |     await sm.sendButton.click()
  136 |     await sm.confirmDialog.click()
  137 |     await expect(sm.successMessage).toBeVisible()
  138 | 
  139 |     await sm.sendMoneyToPayee()
  140 |     await sm.fromAccount.click()
  141 |     await sm.everydayChecking.click()
  142 |     await sm.payee.click()
  143 |     await sm.selectPayee.nth(0).click()
  144 |     await sm.amount.fill(sendMoneyData.higherMoney)
  145 |     await sm.note.fill(sendMoneyData.notes.higherAmountFailure)
  146 |     await sm.sendButton.click()
  147 |     await expect(sm.errorForHigherAmt.or(page.locator(sendMoneyData.validationSelector))).toBeVisible()
  148 |   })
  149 | 
  150 |   test('SM-038 / SM-039 / SM-040 / SM-045 - duplicate transaction protections and retries', async ({ page }) => {
  151 |     await sm.fromAccount.click()
  152 |     await sm.everydayChecking.click()
  153 |     await sm.payee.click()
  154 |     await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
  155 |     await sm.amount.fill(sendMoneyData.duplicateAmount)
  156 |     await sm.note.fill(sendMoneyData.duplicateCheckNote)
  157 |     await sm.sendButton.click()
  158 | 
  159 |     await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  160 | 
  161 |     await sm.confirmDialog.click()
  162 |     await expect(sm.successMessage).toBeVisible()
  163 | 
  164 |     await sm.sendMoneyToPayee()
  165 |     await sm.fromAccount.click()
  166 |     await sm.everydayChecking.click()
  167 |     await sm.payee.click()
  168 |     await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
  169 |     await sm.amount.fill(sendMoneyData.duplicateAmount)
```