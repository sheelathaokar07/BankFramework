
import {test,expect} from '@playwright/test'
import {BankLogin} from '../Pages/loginBank'
import loginBankData from '../testData/loginBank.json'

let lp:BankLogin
test.beforeEach(async({page})=>{
     lp=new BankLogin(page)
   await lp.launchbrowser(loginBankData.url)
})
test('login with valid data @smoke', async ({page})=>{
   await lp.loginApplication(loginBankData.username,loginBankData.vpassword)
   await expect(lp.homepageIdentifier).toBeVisible()

})

test('login with invalid username', async ({page}) => {
   await lp.loginApplication(loginBankData.username + '_bad', loginBankData.vpassword)
   const err = await lp.getErrorMessageText()
   await expect(err).toContain(loginBankData.errorMessage)
})

test('login with invalid password', async ({page}) => {
   await lp.loginApplication(loginBankData.username, loginBankData.vpassword + '_bad')
   const err = await lp.getErrorMessageText()
   await expect(err).toContain(loginBankData.errorMessage)
})

test('invalid username and invalid password', async ({page}) => {
   await lp.loginApplication('bad_user', 'bad_pass')
   const err = await lp.getErrorMessageText()
   await expect(err).toContain(loginBankData.errorMessage)
})

test('username blank validation', async ({page}) => {
   await lp.clearCredentials()
   await lp.fillPassword(loginBankData.vpassword)
   await lp.clickSignIn()
   const unameVal = await lp.getUsernameValidationText()
   expect(unameVal?.trim().length ?? 0).toBeGreaterThan(0)
})

test('password blank validation', async ({page}) => {
   await lp.clearCredentials()
   await lp.fillUsername(loginBankData.username)
   await lp.clickSignIn()
   const pwdVal = await lp.getPasswordValidationText()
   expect(pwdVal?.trim().length ?? 0).toBeGreaterThan(0)
})

test('both fields blank validation', async ({page}) => {
   await lp.clearCredentials()
   await lp.clickSignIn()
   // Expect at least one of the validation messages or an error message
   const unameVal = await lp.getUsernameValidationText()
   const err = await lp.getErrorMessageText()
   expect((unameVal && unameVal.trim().length > 0) || (err && err.includes(loginBankData.errorMessage))).toBeTruthy()
})

test('invalid email/username format validation', async ({page}) => {
   await lp.clearCredentials()
   await lp.fillUsername('not-an-email')
   await lp.fillPassword('somepass')
   await lp.clickSignIn()
   const unameVal = await lp.getUsernameValidationText()
   // Either client-side validation or server-side error should appear
   expect((unameVal && unameVal.trim().length > 0) || (await lp.getErrorMessageText())).toBeTruthy()
})

test('password masking check', async ({page}) => {
   await lp.clearCredentials()
   await lp.fillPassword('somepass')
   expect(await lp.isPasswordMasked()).toBeTruthy()
})

test('verify error message text', async ({page}) => {
   await lp.loginApplication('bad_user', 'bad_pass')
   const err = await lp.getErrorMessageText()
   await expect(err).toContain(loginBankData.errorMessage)
})

test('authenticated user can access send money nav', async ({page}) => {
   await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
   await expect(lp.homepageIdentifier).toBeVisible()
   // send money nav should be visible for authenticated users
   await expect(lp.sendmOney).toBeVisible()
})

// test('unauthenticated user redirected when accessing protected URL', async ({page}) => {
//    // try to navigate to a protected URL derived from base
//    const protectedUrl = loginBankData.url.replace('/login', '') + '/send'
//    await page.goto(protectedUrl)
//    // should be redirected to login (sign in button visible)
//    await expect(lp.signInButton).toBeVisible()
// })

// test('logout ends session', async ({page}) => {
//    await lp.loginApplication(loginBankData.username, loginBankData.vpassword)
//    await expect(lp.homepageIdentifier).toBeVisible()
//    await lp.logoutIfVisible()
//    // after logout, attempting to view send money should not be possible
//    await page.goto(loginBankData.url.replace('/login', '') + '/send')
//    await expect(lp.signInButton).toBeVisible()
// })

test.skip('account lock after multiple failed attempts (manual/optional)', async ({page}) => {
   // This test is environment specific; keep skipped by default.
   for (let i = 0; i < 6; i++) {
      await lp.loginApplication('bad_user', 'bad_pass')
   }
   const err = await lp.getErrorMessageText()
   expect(err && /locked|temporarily blocked/i.test(err)).toBeTruthy()
})
//test.todo('captcha flow - typically not automated')
//Created by me