import{Page,Locator} from '@playwright/test'

export class BankLogin{

    page:Page
    userName:Locator
    password:Locator
    signInButton:Locator
    errorMessage:Locator
    homepageIdentifier:Locator
    sendmOney:Locator
    rememberMe: Locator
    forgotPasswordLink: Locator
    logoutButton: Locator
    usernameValidationMsg: Locator
    passwordValidationMsg: Locator

    constructor(page:Page)
    {
        this.page=page
        this.userName=this.page.locator('#login-username')
        this.password=this.page.locator('#login-password')
        this.signInButton=this.page.getByRole('button',{name:'Sign In'})
        this.errorMessage=this.page.locator('[data-testid="login-error-message"]')
        this.homepageIdentifier=this.page.locator('.mb-6 h1') 
        this.sendmOney=this.page.locator('[data-nav="send-money"]')
        this.rememberMe = this.page.locator('input[name="remember"]')
        this.forgotPasswordLink = this.page.getByRole('link',{name: /forgot password/i})
        this.logoutButton = this.page.getByRole('button',{name: /logout|sign out/i})
        this.usernameValidationMsg = this.page.locator('[data-testid="login-error-banner"]')
        this.passwordValidationMsg = this.page.locator('[data-testid="login-error-banner"]')
    }

    async launchbrowser(url:string)
    {
        await this.page.goto(url)
    }

    async loginApplication(username:string,password:string)
    {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.signInButton.click()
    }

    async fillUsername(username: string) {
        await this.userName.fill(username)
    }

    async fillPassword(password: string) {
        await this.password.fill(password)
    }

    async clickSignIn() {
        await this.signInButton.click()
    }

    async clearCredentials() {
        await this.userName.fill('')
        await this.password.fill('')
    }

    async toggleRememberMe(enable: boolean) {
        const isChecked = await this.rememberMe.isChecked().catch(() => false)
        if (isChecked !== enable) await this.rememberMe.click()
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click()
    }

    async getErrorMessageText() {
        return this.errorMessage.textContent()
    }

    async getUsernameValidationText() {
        return this.usernameValidationMsg.textContent()
    }

    async getPasswordValidationText() {
        return this.passwordValidationMsg.textContent()
    }

    async isPasswordMasked() {
        const type = await this.password.getAttribute('type')
        return type === 'password'
    }

    async isOnHomePage() {
        return this.homepageIdentifier.isVisible()
    }

    async logoutIfVisible() {
        if (await this.logoutButton.count() > 0) {
            await this.logoutButton.click()
        }
    }
} 