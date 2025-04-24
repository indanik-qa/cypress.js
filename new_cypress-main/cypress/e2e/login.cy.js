import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
           });

   it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввели верный логин 
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

   it('Верный логин c заглавными и верный пароль', function () {
        cy.get(main_page.email).type('GermMan@dolnikov.ru'); // ввели верный логин 
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

   it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввели верный логин 
        cy.get(main_page.password).type('iLoveqastudio7'); // ввели неверный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

   it('Не верный логин и верный пароль', function () {
        cy.get(main_page.email).type('germaan@dolnikov.ru'); // ввели неверный логин 
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Проблема с валидацией', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввели логин без собачки
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажимаю восстаноувить пароль

        cy.get(recovery_page.email).type(data.login); // ввели логин
        cy.get(result_page.send_button).click(); // Нажимаю отправить новый пароль

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })
})
 