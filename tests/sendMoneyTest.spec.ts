import {test,expect} from '@playwright/test'
import {BankLogin} from '../Pages/loginBank'
import { sendMoney } from '../Pages/sendMoney'
import loginBankData from '../testData/loginBank.json'
import sendMoneyData from '../testData/sendMoney.json'

let sm:sendMoney
let lp:BankLogin
test.beforeEach(async ({page})=>{
     lp=new BankLogin(page)
     sm=new sendMoney(page)   
     await lp.launchbrowser(loginBankData.url)         
     await lp.loginApplication(loginBankData.username,loginBankData.vpassword)
})

test('sendHigherMoney', async({})=>{
    await sm.sendMoneyToPayee()
    await sm.SendMoneytoOther(sendMoneyData.higherMoney,sendMoneyData.note,0)   
    await expect(sm.errorForHigherAmt).toBeVisible() 
})

test('sendCorrectMoney', async({})=>{
    await sm.sendMoneyToPayee()
    await sm.SendMoneytoOther(sendMoneyData.correctMoney,sendMoneyData.note,2)   
    await expect(sm.successMessage).toBeVisible() 
})