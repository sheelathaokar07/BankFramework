import{test,expect} from '@playwright/test'
import { LoginPage } from '../Pages/loginPage'
import loginData from '../testData/login.json'

//dont use hard coded values

// const url='https://rahulshettyacademy.com/client/#/auth/login'
// const username='sheelaphalke@gmail.com'
// const password='123'
// const vPassword='Vivaan@1234'
// const errorMessage='incorrect email or password'

let lp:LoginPage
test.beforeEach(async ({page})=>{
   lp =new LoginPage(page)
   await lp.launchUrl(loginData.url)
})

 
test('invalid password', async ({page})=>{
//    const lp =new LoginPage(page)
//    await lp.launchUrl(url)
   await lp.loginToApplication(loginData.username,loginData.password)
   await expect(lp.errorMessage).toBeVisible()
})

test('valid username and password', async ({page})=>{
//     const lp =new LoginPage(page)
//    await lp.launchUrl(url)
   await lp.loginToApplication(loginData.username,loginData.vPassword) 
   await expect(lp.homepageIdentifier).toBeVisible()    
})

