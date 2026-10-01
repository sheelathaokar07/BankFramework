# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sendMoneyTest.spec.ts >> Send Money page object and validations >> SM-053 / SM-054 / SM-055 - malicious input is neutralized instead of executing
- Location: tests\sendMoneyTest.spec.ts:186:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message').or(locator('body'))
Expected: visible
Error: strict mode violation: locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message').or(locator('body')) resolved to 2 elements:
    1) <body>…</body> aka getByText('Skip to contentSecureBank2LogoutMainDashboardAccountsTransferSend MoneyBill')
    2) <div role="alert" aria-live="assertive" id="__next-route-announcer__"></div> aka locator('[id="__next-route-announcer__"]')

Call log:
  - Expect "toBeVisible" locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message').or(locator('body')) with timeout 5000ms
  - waiting for locator('[role="alert"], [data-testid="send-money-error"],.error, [data-testid="validation-message"], .toast-message, .validation-message').or(locator('body'))

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link [aria-hidden] [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
    - text: Skip to content
  - main [aria-hidden] [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link [ref=e6] [cursor=pointer]:
          - /url: /bank/dashboard
          - generic [ref=e12]: SecureBank
        - generic [ref=e13]:
          - button [ref=e14] [cursor=pointer]
          - link [ref=e18] [cursor=pointer]:
            - /url: /bank/notifications
            - generic [aria-hidden] [ref=e22]: "2"
          - button [ref=e23]:
            - generic [ref=e24]: Logout
      - generic [ref=e25]:
        - navigation [ref=e27]:
          - generic [ref=e28]:
            - paragraph [ref=e29]: Main
            - navigation [ref=e30]:
              - link [ref=e31] [cursor=pointer]:
                - /url: /bank/dashboard
                - generic [ref=e37]: Dashboard
              - link [ref=e38] [cursor=pointer]:
                - /url: /bank/accounts
                - generic [ref=e41]: Accounts
              - link [ref=e42] [cursor=pointer]:
                - /url: /bank/transfer
                - generic [ref=e46]: Transfer
              - link [ref=e47] [cursor=pointer]:
                - /url: /bank/send-money
                - generic [ref=e51]: Send Money
              - link [ref=e52] [cursor=pointer]:
                - /url: /bank/bill-pay
                - generic [ref=e56]: Bill Pay
              - link [ref=e57] [cursor=pointer]:
                - /url: /bank/transactions
                - generic [ref=e62]: Transactions
              - link [ref=e63] [cursor=pointer]:
                - /url: /bank/apply-loan
                - generic [ref=e66]: Apply Loan
            - separator [ref=e67]
            - paragraph [ref=e68]: Account
            - navigation [ref=e69]:
              - link [ref=e70] [cursor=pointer]:
                - /url: /bank/notifications
                - generic [ref=e74]: Notifications
                - generic [ref=e75]: "2"
              - link [ref=e76] [cursor=pointer]:
                - /url: /bank/profile
                - generic [ref=e80]: Profile
              - link [ref=e81] [cursor=pointer]:
                - /url: /bank/test-cases
                - generic [ref=e85]: Test Cases
          - separator [ref=e86]
          - generic [ref=e87]:
            - generic [aria-hidden] [ref=e88]: ST
            - generic [ref=e89]: standard_user
        - main [ref=e90]:
          - generic [ref=e91]:
            - generic [ref=e97]:
              - heading [level=1] [ref=e98]: Send Money
              - paragraph [ref=e99]: Pay someone externally
            - generic [ref=e102]:
              - generic [ref=e103]:
                - generic [ref=e104]: From Account
                - combobox [ref=e105]:
                  - generic [ref=e106]: acc-checking-1
                  - img [aria-hidden]: ▼
                - textbox [aria-hidden] [ref=e107]: acc-checking-1
              - generic [ref=e109]:
                - generic [ref=e110]:
                  - generic [ref=e111]: Payee
                  - button [ref=e112]: Add
                - combobox [ref=e114]:
                  - generic [ref=e115]: payee-001
                  - img [aria-hidden]: ▼
                - textbox [aria-hidden] [ref=e116]: payee-001
                - generic [ref=e117]: Chase Bank · ****6789
              - generic [ref=e118]:
                - generic [ref=e119]: Amount
                - generic [ref=e120]:
                  - generic [ref=e121]: $
                  - spinbutton [ref=e122]: "50"
              - generic [ref=e123]:
                - generic [ref=e124]: Note (optional)
                - textbox [ref=e125]:
                  - /placeholder: e.g. Dinner last night
                  - text: <script>alert(1)</script>
              - generic [ref=e126]:
                - button [ref=e127]: Review & Send
                - button [ref=e128] [cursor=pointer]: Cancel
  - alert [ref=e129]
  - button [aria-hidden] [ref=e130] [cursor=pointer]
  - dialog [ref=e136]:
    - heading "Confirm Send Money" [level=2] [ref=e138]
    - generic [ref=e139]:
      - generic [ref=e140]:
        - generic [ref=e141]: From
        - generic [ref=e142]: Everyday Checking
      - generic [ref=e143]:
        - generic [ref=e144]: To
        - generic [ref=e145]: Rahul Sharma
      - generic [ref=e146]:
        - generic [ref=e147]: Amount
        - generic [ref=e148]: $50.00
      - generic [ref=e149]:
        - generic [ref=e150]: Note
        - generic [ref=e151]: <script>alert(1)</script>
    - generic [ref=e152]:
      - button "Cancel" [active] [ref=e153]
      - button "Confirm & Send" [ref=e154]
    - button "Close" [ref=e155]
```

# Test source

```ts
  96  |       await sm.sendButton.click()
  97  | 
  98  |       await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
  99  |       await page.reload()
  100 |       await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  101 |       await sm.sendMoneyToPayee()
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
  195 |       const validation = page.locator(sendMoneyData.validationSelector)
> 196 |       await expect(validation.or(page.locator('body'))).toBeVisible()
      |                                                         ^ Error: expect(locator).toBeVisible() failed
  197 |       await page.reload()
  198 |       await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  199 |       await sm.sendMoneyToPayee()
  200 |     }
  201 |   })
  202 | })
```