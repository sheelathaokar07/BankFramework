# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sendMoneyTest.spec.ts >> Send Money page object and validations >> SM-014 / SM-015 / SM-016 / SM-017 / SM-018 / SM-019 / SM-020 / SM-022 / SM-024 / SM-025 / SM-028 / SM-029 - invalid recipient, invalid amount, and boundary validations are rejected
- Location: tests\sendMoneyTest.spec.ts:73:7

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('#send-amount')
    - locator resolved to <input value="" min="0.01" step="0.01" type="number" name="amount" id="send-amount" data-slot="input" placeholder="0.00" data-testid="send-amount-input" class="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled…/>
    - fill("abc")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

# Page snapshot

```yaml
- generic [ref=f3e1]:
  - link "Skip to content" [ref=f3e2] [cursor=pointer]:
    - /url: "#main-content"
  - main [ref=f3e3]:
    - generic [ref=f3e4]:
      - generic [ref=f3e5]:
        - link "SecureBank" [ref=f3e6] [cursor=pointer]:
          - /url: /bank/dashboard
        - generic [ref=f3e13]:
          - button "Switch to dark mode" [ref=f3e14] [cursor=pointer]
          - link "Notifications — 2 unread" [ref=f3e18] [cursor=pointer]:
            - /url: /bank/notifications
            - generic [aria-hidden] [ref=f3e22]: "2"
          - button "Logout" [ref=f3e23]
      - generic [ref=f3e25]:
        - navigation "Main navigation" [ref=f3e27]:
          - generic [ref=f3e28]:
            - paragraph [ref=f3e29]: Main
            - navigation [ref=f3e30]:
              - link "Dashboard" [ref=f3e31] [cursor=pointer]:
                - /url: /bank/dashboard
              - link "Accounts" [ref=f3e38] [cursor=pointer]:
                - /url: /bank/accounts
              - link "Transfer" [ref=f3e42] [cursor=pointer]:
                - /url: /bank/transfer
              - link "Send Money" [ref=f3e47] [cursor=pointer]:
                - /url: /bank/send-money
              - link "Bill Pay" [ref=f3e52] [cursor=pointer]:
                - /url: /bank/bill-pay
              - link "Transactions" [ref=f3e57] [cursor=pointer]:
                - /url: /bank/transactions
              - link "Apply Loan" [ref=f3e63] [cursor=pointer]:
                - /url: /bank/apply-loan
            - separator [ref=f3e67]
            - paragraph [ref=f3e68]: Account
            - navigation [ref=f3e69]:
              - link "Notifications 2 unread notifications" [ref=f3e70] [cursor=pointer]:
                - /url: /bank/notifications
                - generic [ref=f3e74]: Notifications
                - generic "2 unread notifications" [ref=f3e75]: "2"
              - link "Profile" [ref=f3e76] [cursor=pointer]:
                - /url: /bank/profile
              - link "Test Cases" [ref=f3e81] [cursor=pointer]:
                - /url: /bank/test-cases
          - separator [ref=f3e86]
          - generic [ref=f3e87]:
            - generic [aria-hidden] [ref=f3e88]: ST
            - generic [ref=f3e89]: standard_user
        - main [ref=f3e90]:
          - generic [ref=f3e91]:
            - generic [ref=f3e97]:
              - heading "Send Money" [level=1] [ref=f3e98]
              - paragraph [ref=f3e99]: Pay someone externally
            - generic [ref=f3e102]:
              - generic [ref=f3e103]:
                - generic [ref=f3e104]: From Account
                - combobox "From Account" [ref=f3e105]:
                  - generic [ref=f3e106]: acc-checking-1
                  - img [aria-hidden]: ▼
                - textbox [aria-hidden] [ref=f3e107]: acc-checking-1
              - generic [ref=f3e109]:
                - generic [ref=f3e110]:
                  - generic [ref=f3e111]: Payee
                  - button "Add" [ref=f3e112]
                - combobox "Payee" [active] [ref=f3e114]:
                  - generic [ref=f3e115]: payee-001
                  - img [aria-hidden]: ▼
                - textbox [aria-hidden] [ref=f3e116]: payee-001
                - generic [ref=f3e117]: Chase Bank · ****6789
              - generic [ref=f3e118]:
                - generic [ref=f3e119]: Amount
                - generic [ref=f3e120]:
                  - generic [ref=f3e121]: $
                  - spinbutton "Amount" [ref=f3e122]
              - generic [ref=f3e123]:
                - generic [ref=f3e124]: Note (optional)
                - textbox "Note (optional)" [ref=f3e125]:
                  - /placeholder: e.g. Dinner last night
              - generic [ref=f3e126]:
                - button "Review & Send" [ref=f3e127]
                - button "Cancel" [ref=f3e128] [cursor=pointer]
  - alert [ref=f3e129]
  - button "Send feedback or report an issue" [ref=f3e130] [cursor=pointer]
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
  69  |     //await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
  70  |     await expect(sm.moneyError).toBeVisible()
  71  |   })
  72  | 
  73  |   test('SM-014 / SM-015 / SM-016 / SM-017 / SM-018 / SM-019 / SM-020 / SM-022 / SM-024 / SM-025 / SM-028 / SM-029 - invalid recipient, invalid amount, and boundary validations are rejected', async ({ page }) => {
  74  |     const invalidCases = [
  75  |       { recipient: sendMoneyData.invalidRecipientCases[0], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.invalidRecipient },
  76  |       { recipient: sendMoneyData.invalidRecipientCases[1], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.alphaAccount },
  77  |       { recipient: sendMoneyData.invalidRecipientCases[2], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.specialAccount },
  78  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[0], note: sendMoneyData.notes.alphaAmount },
  79  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[1], note: sendMoneyData.notes.specialAmount },
  80  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[2], note: sendMoneyData.notes.negativeAmount },
  81  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[3], note: sendMoneyData.notes.zeroAmount },
  82  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[4], note: sendMoneyData.notes.tooManyDecimals },
  83  |       { recipient: sendMoneyData.spaceCases[0], amount: '100', note: sendMoneyData.notes.spacesAccount },
  84  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.spaceCases[1], note: sendMoneyData.notes.spacesAmount },
  85  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[5], note: sendMoneyData.notes.tooHigh },
  86  |       { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[6], note: sendMoneyData.notes.veryLargeNumber }
  87  |     ]
  88  | 
  89  |     for (const testData of invalidCases) {
  90  |       await sm.fromAccount.click()
  91  |       await sm.everydayChecking.click()
  92  |       await sm.payee.click()
  93  |       await sm.selectPayee.nth(0).click()
> 94  |       await sm.amount.fill(testData.amount)
      |                       ^ Error: locator.fill: Error: Cannot type text into input[type=number]
  95  |       await sm.note.fill(testData.note)
  96  |       await sm.sendButton.click()
  97  | 
  98  |       await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
  99  |       await page.reload()
  100 |      // await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  101 |      // await sm.sendMoneyToPayee()
  102 |     }
  103 |   })
  104 | 
  105 |   test('SM-021 / SM-023 / SM-026 / SM-027 / SM-057 / SM-058 / SM-059 / SM-060 - valid minimum, exact-balance, decimals, and repeated transfers follow business rules', async ({ page }) => {
  106 |     await sm.fromAccount.click()
  107 |     await sm.everydayChecking.click()
  108 |     await sm.payee.click()
  109 |     await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
  110 |     await sm.amount.fill(sendMoneyData.minimumAmount)
  111 |     await sm.note.fill(sendMoneyData.notes.minimumAmountNote)
  112 |     await sm.sendButton.click()
  113 |     //await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  114 | 
  115 |     await page.reload()
  116 |    // await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  117 |    //
  118 |    //  await sm.sendMoneyToPayee()
  119 | 
  120 |     await sm.fromAccount.click()
  121 |     await sm.everydayChecking.click()
  122 |     await sm.payee.click()
  123 |     await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
  124 |     await sm.amount.fill(sendMoneyData.decimalAmount)
  125 |     await sm.note.fill(sendMoneyData.notes.decimalTransferNote)
  126 |     await sm.sendButton.click()
  127 | //await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  128 |   })
  129 | 
  130 |   test('SM-036 / SM-037 / SM-046 / SM-047 - success and failed transactions show correct state and balance behavior', async ({ page }) => {
  131 |     await sm.fromAccount.click()
  132 |     await sm.everydayChecking.click()
  133 |     await sm.payee.click()
  134 |     await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
  135 |     await sm.amount.fill(sendMoneyData.correctMoney)
  136 |     await sm.note.fill(sendMoneyData.note)
  137 |     await sm.sendButton.click()
  138 |     await sm.confirmDialog.click()
  139 |     await expect(sm.successMessage).toBeVisible()
  140 | 
  141 |     await sm.sendMoneyToPayee()
  142 |     await sm.fromAccount.click()
  143 |     await sm.everydayChecking.click()
  144 |     await sm.payee.click()
  145 |     await sm.selectPayee.nth(0).click()
  146 |     await sm.amount.fill(sendMoneyData.higherMoney)
  147 |     await sm.note.fill(sendMoneyData.notes.higherAmountFailure)
  148 |     await sm.sendButton.click()
  149 |     await expect(sm.errorForHigherAmt.or(page.locator(sendMoneyData.validationSelector))).toBeVisible()
  150 |   })
  151 | 
  152 |   test('SM-038 / SM-039 / SM-040 / SM-045 - duplicate transaction protections and retries', async ({ page }) => {
  153 |     await sm.fromAccount.click()
  154 |     await sm.everydayChecking.click()
  155 |     await sm.payee.click()
  156 |     await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
  157 |     await sm.amount.fill(sendMoneyData.duplicateAmount)
  158 |     await sm.note.fill(sendMoneyData.duplicateCheckNote)
  159 |     await sm.sendButton.click()
  160 | 
  161 |     //await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  162 | 
  163 |     await sm.confirmDialog.click()
  164 |     await expect(sm.successMessage).toBeVisible()
  165 | 
  166 |     await sm.sendMoneyToPayee()
  167 |     await sm.fromAccount.click()
  168 |     await sm.everydayChecking.click()
  169 |     await sm.payee.click()
  170 |     await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
  171 |     await sm.amount.fill(sendMoneyData.duplicateAmount)
  172 |     await sm.note.fill(sendMoneyData.duplicateCheckNote)
  173 |     await sm.sendButton.click()
  174 |    // await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  175 |   })
  176 | 
  177 |   test('SM-049 / SM-050 / SM-051 - unauthorized access and session timeout are handled safely', async ({ browser }) => {
  178 |     const context = await browser.newContext()
  179 |     const unauthenticatedPage = await context.newPage()
  180 |     await unauthenticatedPage.goto(loginBankData.url)
  181 |     await unauthenticatedPage.goto(loginBankData.url.replace('/login', '/send'))
  182 |     await expect(unauthenticatedPage.getByRole('button', { name: /sign in/i })).toBeVisible()
  183 |     await context.close()
  184 |   })
  185 | 
  186 |   test('SM-053 / SM-054 / SM-055 - malicious input is neutralized instead of executing', async ({ page }) => {
  187 |     for (const payload of sendMoneyData.securityPayloads) {
  188 |       await sm.fromAccount.click()
  189 |       await sm.everydayChecking.click()
  190 |       await sm.payee.click()
  191 |       await sm.selectPayee.nth(0).click()
  192 |       await sm.amount.fill('50')
  193 |       await sm.note.fill(payload)
  194 |       await sm.sendButton.click()
```