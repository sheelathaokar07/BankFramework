
import { Locator,Page } from "@playwright/test";

export class sendMoney
{
  page:Page
  sendMoney:Locator
  fromAccount:Locator
  everydayChecking:Locator
  payee:Locator
  amount:Locator
  note:Locator
  selectPayee:Locator
  sendButton:Locator
  SendMoneyTitle:Locator
  confirmDialog:Locator
  errorForHigherAmt:Locator
  successMessage:Locator

  moneyError:Locator

  constructor(page:Page)
      {
          this.page=page        
          this.sendMoney=this.page.locator('[data-nav="send-money"]')
          this.SendMoneyTitle=this.page.locator('[data-testid="send-money-page-title"]')
          this.fromAccount=this.page.locator('#send-from-trigger')
          this.payee=this.page.locator('#payee-select-trigger')
          this.amount=this.page.locator('#send-amount')
          this.note=this.page.locator('#send-note')
          this.everydayChecking=this.page.locator('[data-account-id="acc-checking-1"]')
          this.selectPayee=this.page.getByRole('option')
          this.sendButton=this.page.getByText('Review & Send')

          this.confirmDialog=this.page.getByText('Confirm & Send')
          this.errorForHigherAmt=this.page.getByText('Insufficient funds. Available balance: $4,250.00.')
          this.successMessage=this.page.getByText('Money Sent Successfully')
          this.moneyError=this.page.locator('[data-testid="send-money-error"]')
      }

      async sendMoneyToPayee()
      {
        await this.sendMoney.click()
      }

      async SendMoneytoOther(amount:string,note:string,payee:number)
      {
        await this.fromAccount.click()
        await this.everydayChecking.click()
        await this.payee.click()
        await this.selectPayee.nth(payee).click();
        await this.amount.fill(amount)
        await this.note.fill(note)     
        await this.sendButton.click()

        await this.confirmDialog.click()   
           
      }
}
