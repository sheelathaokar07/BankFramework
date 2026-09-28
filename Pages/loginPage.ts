//login page class
import{Locator,Page} from '@playwright/test'

export class LoginPage {
    page:Page
    email:Locator
    password:Locator
    loginButton:Locator
    errorMessage:Locator
    homepageIdentifier:Locator
    
    
    constructor(page:Page){
      this.page=page
      this.email=this.page.getByPlaceholder('email@example.com')   
      this.password=this.page.locator('#userPassword')
      this.loginButton=this.page.locator('#login')
      this.errorMessage=this.page.locator('#toast-container')
      this.homepageIdentifier=this.page.locator('[routerlink="/dashboard/"]') 
    }

    //Methods

    async launchUrl(url:string)
    {
        await this.page.goto(url)
    }

    async loginToApplication(username:string, password:string)
    {
       await this.email.fill(username)
       await this.password.fill(password)
       await this.loginButton.click()
    }
}