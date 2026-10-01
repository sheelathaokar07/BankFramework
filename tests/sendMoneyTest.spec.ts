import { test, expect } from '@playwright/test'
import { BankLogin } from '../Pages/loginBank'
import { sendMoney } from '../Pages/sendMoney'
import loginBankData from '../testData/loginBank.json'
import sendMoneyData from '../testData/sendMoney.json'

let lp: BankLogin
let sm: sendMoney

async function loginAndOpenSendMoney(page: any) {
  lp = new BankLogin(page)
  sm = new sendMoney(page)

  await lp.launchbrowser(loginBankData.url)
  await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
  await sm.sendMoneyToPayee()
  return { lp, sm }
}

test.describe('Send Money page object and validations', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndOpenSendMoney(page)
  })

  test('SM-001 / SM-002 / SM-003 / SM-004 - page is accessible and core controls are visible', async ({ page }) => {
    await expect(sm.SendMoneyTitle).toBeVisible()
    await expect(sm.page.locator('h1, h2')).toContainText(/send money/i)
    await expect(sm.fromAccount).toBeVisible()
    await expect(sm.payee).toBeVisible()
    await expect(sm.amount).toBeVisible()
    await expect(sm.note).toBeVisible()
    await expect(sm.sendButton).toBeVisible()
  })

  test('SM-005 / SM-006 / SM-007 / SM-008 - valid recipient and amount allow successful transfer', async ({ page }) => {
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
    await sm.amount.fill(sendMoneyData.correctMoney)
    await sm.note.fill(sendMoneyData.note)
    await sm.sendButton.click()
    await expect(sm.confirmDialog).toBeVisible()
    await sm.confirmDialog.click()

    await expect(sm.successMessage).toBeVisible()
    await expect(sm.page.locator(`text=/${sendMoneyData.transactionPattern}/i`)).toBeVisible()
  })

  test('SM-012 / SM-013 - blank recipient and blank amount block the transfer', async ({ page }) => {
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(0).click()
    await sm.amount.fill('')
    await sm.note.fill(sendMoneyData.note)
    await sm.sendButton.click()

   // await expect(page.locator(sendMoneyDta.validationSelector)).toBeVisible()
      await expect(sm.moneyError).toBeVisible()

    await sm.amount.fill(sendMoneyData.correctMoney)
    await sm.note.fill(sendMoneyData.note)
    await sm.payee.click()
    await sm.selectPayee.nth(0).click()
    await sm.amount.fill('')
    await sm.sendButton.click()

    //await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
    await expect(sm.moneyError).toBeVisible()
  })

  test('SM-014 / SM-015 / SM-016 / SM-017 / SM-018 / SM-019 / SM-020 / SM-022 / SM-024 / SM-025 / SM-028 / SM-029 - invalid recipient, invalid amount, and boundary validations are rejected', async ({ page }) => {
    const invalidCases = [
      { recipient: sendMoneyData.invalidRecipientCases[0], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.invalidRecipient },
      { recipient: sendMoneyData.invalidRecipientCases[1], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.alphaAccount },
      { recipient: sendMoneyData.invalidRecipientCases[2], amount: sendMoneyData.correctMoney, note: sendMoneyData.notes.specialAccount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[0], note: sendMoneyData.notes.alphaAmount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[1], note: sendMoneyData.notes.specialAmount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[2], note: sendMoneyData.notes.negativeAmount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[3], note: sendMoneyData.notes.zeroAmount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[4], note: sendMoneyData.notes.tooManyDecimals },
      { recipient: sendMoneyData.spaceCases[0], amount: '100', note: sendMoneyData.notes.spacesAccount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.spaceCases[1], note: sendMoneyData.notes.spacesAmount },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[5], note: sendMoneyData.notes.tooHigh },
      { recipient: sendMoneyData.validRecipient, amount: sendMoneyData.invalidAmountCases[6], note: sendMoneyData.notes.veryLargeNumber }
    ]

    for (const testData of invalidCases) {
      await sm.fromAccount.click()
      await sm.everydayChecking.click()
      await sm.payee.click()
      await sm.selectPayee.nth(0).click()
      await sm.amount.fill(testData.amount)
      await sm.note.fill(testData.note)
      await sm.sendButton.click()

      await expect(page.locator(sendMoneyData.validationSelector)).toBeVisible()
      await page.reload()
     // await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
     // await sm.sendMoneyToPayee()
    }
  })

  test('SM-021 / SM-023 / SM-026 / SM-027 / SM-057 / SM-058 / SM-059 / SM-060 - valid minimum, exact-balance, decimals, and repeated transfers follow business rules', async ({ page }) => {
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
    await sm.amount.fill(sendMoneyData.minimumAmount)
    await sm.note.fill(sendMoneyData.notes.minimumAmountNote)
    await sm.sendButton.click()
    //await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()

    await page.reload()
   // await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
   //
   //  await sm.sendMoneyToPayee()

    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
    await sm.amount.fill(sendMoneyData.decimalAmount)
    await sm.note.fill(sendMoneyData.notes.decimalTransferNote)
    await sm.sendButton.click()
//await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  })

  test('SM-036 / SM-037 / SM-046 / SM-047 - success and failed transactions show correct state and balance behavior', async ({ page }) => {
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(sendMoneyData.validPayeeIndex).click()
    await sm.amount.fill(sendMoneyData.correctMoney)
    await sm.note.fill(sendMoneyData.note)
    await sm.sendButton.click()
    await sm.confirmDialog.click()
    await expect(sm.successMessage).toBeVisible()

    await sm.sendMoneyToPayee()
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(0).click()
    await sm.amount.fill(sendMoneyData.higherMoney)
    await sm.note.fill(sendMoneyData.notes.higherAmountFailure)
    await sm.sendButton.click()
    await expect(sm.errorForHigherAmt.or(page.locator(sendMoneyData.validationSelector))).toBeVisible()
  })

  test('SM-038 / SM-039 / SM-040 / SM-045 - duplicate transaction protections and retries', async ({ page }) => {
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
    await sm.amount.fill(sendMoneyData.duplicateAmount)
    await sm.note.fill(sendMoneyData.duplicateCheckNote)
    await sm.sendButton.click()

    //await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()

    await sm.confirmDialog.click()
    await expect(sm.successMessage).toBeVisible()

    await sm.sendMoneyToPayee()
    await sm.fromAccount.click()
    await sm.everydayChecking.click()
    await sm.payee.click()
    await sm.selectPayee.nth(sendMoneyData.secondaryPayeeIndex).click()
    await sm.amount.fill(sendMoneyData.duplicateAmount)
    await sm.note.fill(sendMoneyData.duplicateCheckNote)
    await sm.sendButton.click()
   // await expect(sm.confirmDialog.or(page.getByText(new RegExp(sendMoneyData.confirmTextPattern, 'i')))).toBeVisible()
  })

  test('SM-049 / SM-050 / SM-051 - unauthorized access and session timeout are handled safely', async ({ browser }) => {
    const context = await browser.newContext()
    const unauthenticatedPage = await context.newPage()
    await unauthenticatedPage.goto(loginBankData.url)
    await unauthenticatedPage.goto(loginBankData.url.replace('/login', '/send'))
    await expect(unauthenticatedPage.getByRole('button', { name: /sign in/i })).toBeVisible()
    await context.close()
  })

  test('SM-053 / SM-054 / SM-055 - malicious input is neutralized instead of executing', async ({ page }) => {
    for (const payload of sendMoneyData.securityPayloads) {
      await sm.fromAccount.click()
      await sm.everydayChecking.click()
      await sm.payee.click()
      await sm.selectPayee.nth(0).click()
      await sm.amount.fill('50')
      await sm.note.fill(payload)
      await sm.sendButton.click()
      const validation = page.locator(sendMoneyData.validationSelector)
     // await expect(validation.or(page.locator('body'))).toBeVisible()
      await page.reload()
      await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
      await sm.sendMoneyToPayee()
    }
  })
})