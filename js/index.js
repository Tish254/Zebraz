/*  Zebraz Javascript Code */

// the rest of the functions and code 


function hamburgerClicked() {

    /* Called to Open the Mobile Menu */

    console.log('Hamburgered');

    document.querySelector('.fa-bars').classList.toggle('fa-xmark');

    document.querySelector('.top').classList.toggle("nav__toggled");

}

function showAnswer() {
    /* Called to to show the frequently asked questions answers */
    
    document.querySelectorAll('.faq').forEach( faq => {
        faq.addEventListener('click', () => {

            console.log('adding')
            
            let icon = faq.querySelector('i')
            
            if (icon.className === 'fa-solid fa-plus') {

                icon.className = 'fa-solid fa-minus'
                console.log('fa-minus added')
                
                
            } else {
                icon.className = 'fa-solid fa-plus'
                console.log('fa-plus added')
            }

            faq.classList.toggle('faq__answer');
            
        })

    })


}


function changeHeaderOnScroll() {
    /* Called to change give the header a different style on scrolling */


    window.addEventListener('scroll', () => {
        let headerTop = document.querySelector('header.top');

        if (headerTop) {
            headerTop.classList.toggle('scrolled', window.scrollY > 10);

        }

    })


}


class MainClass {

    constructor (childClass=null) {
        /* Creates the Instance attributes */

        this.childClassName = childClass;


    }

    #getRegistrationData () {

        /* Gets user registration data from Form */

        let fullName = document.getElementById('name').value;
        let emailAddress = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        return [fullName, emailAddress, password];
        
    }

    #getLoginData () {

        let userEmail = document.getElementById('userEmail').value;
        let userPassword = document.getElementById('userPassword').value;

        return [userEmail, userPassword];
    }

    returnOnChildClass () {

        /* Calls various interna */

        console.log(this.childClassName);

        if (this.childClassName === 'registration' ) {
            
            return this.#getRegistrationData();

        } else if (this.childClassName === 'login') {

            return this.#getLoginData();

        }

    }

    createWebsiteStorage() {
        /*  Called to create a local storage for the potential users of the website */

        if (!window.localStorage.getItem('websiteUsers')) {
            
            window.localStorage.setItem('websiteUsers', JSON.stringify({}));

        } else {
            console.log('Storage Already Exists');

        }
        
    }

    resetFormCreateMessage(id, message) {
        /* Called to create a message and reset the form */

        document.getElementById(id).reset();

        location.href = "index.html";
        window.sessionStorage.setItem('documentLoaded', 1);
        window.sessionStorage.setItem('loginMessage', message);
        
    }

    messageOnLoad() {
        /* Displays the message every time the index page loads from the Login Page or registration page */

        window.addEventListener('DOMContentLoaded', function (event) {


            if (window.sessionStorage.getItem('documentLoaded') == true) {

                    
                let form__message = window.document.getElementById('message__box');


                form__message.className = 'form__message';
                

                form__message.innerHTML = window.sessionStorage.getItem('loginMessage');
                window.sessionStorage.setItem('documentLoaded', 0);

            }


        });


    }



}


class Registration extends MainClass {

    constructor () {
        /* Creates the Instance attributes */

        super('registration');

        this.personName,
        this.personEmail,
        this.personPassword;
        
    }

    #validateInput() {

        /* Called to to make sure user inputs are in okay */

        const emailReString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.personName && this.personEmail && this.personPassword) {

            if (emailReString.test(this.personEmail)) {

                this.#addToZebrazMembers();
                
            } else {

                throw new PageErrors('emailValidation', 'Please make sure your email is in the right format');
                
            }

        } else {

            throw new PageErrors('emptyInputs', 'Please enter all the required details')

        }

        
    }

    #createMessages(id, message) {

        /* Called to display appropriate messages to the user*/

        console.log(id, message);

        this.resetFormCreateMessage(id, message);

        

        
    }

    #addToZebrazMembers() {
        /* Called to add Successfully Registered user to to a json string in the local  Storage */

        
        let users = JSON.parse(window.localStorage.getItem('websiteUsers'));
    
        try {

            if (users[this.personEmail]) {
    
                throw new PageErrors('emailExists', 'Email elready taken please choose another one or Login');

            } else {

                users[this.personEmail] = [this.personName, this.personPassword];
                
                window.localStorage.setItem('websiteUsers', JSON.stringify(users));

                this.#createMessages('register_form', `Hello <strong> ${this.personName} </strong> Thank your for Signing Up with us. Welcome to a whole new world of learning.`);
                

            }

        } catch (err) {

            err.displayError();

            return;

        }
        
        
        

    }


    #getInputData() {

        /* Gets registration data from the parent class */


        [this.personName, this.personEmail, this.personPassword] = this.returnOnChildClass();

    }

    getvalidateStoreMessage() {
        /* Runs all the required methods */

        this.#getInputData();

        try {
            this.#validateInput();

        } catch (err) {
            
            err.displayError();
            
            return;

        }

    }

}

class Login extends MainClass {
    
    constructor() {

        /* Creates the Instance attributes */
        
        super('login');
        this.userPassword, this.userEmail;
        
    }

    #validateInput()  {

        /* Called to make sure user inputs are okay */

        const emailReString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.userEmail && this.userPassword) { 

            if (emailReString.test(this.userEmail)) {

                try {

                    this.#getStoredData(this.userEmail, this.userPassword);

                } catch(err) {

                    err.displayError();

                }


                
            } else {

                throw new PageErrors('emailValidation', 'Please make sure your email is in the right format');
                
            }

        } else {

            throw new PageErrors('emptyInputs', 'Please enter all the required details')

        }
        
    }
    
    #getStoredData(email, password) {
        /* Fetches user data and confirms whther the values passed match */

        let userData = JSON.parse(localStorage.getItem('websiteUsers'))[email];


        if (userData && userData[1] == password) {

            console.log(userData[0]);
            
            this.#createMessages('login_form', `Welcome back <strong> ${userData[0]} </strong> Continue where you left off.`)
            

        } else {

            throw new PageErrors('invalidPasswordOrEmail', 'Wrong Password or Email Entered');

        }

        
    }

    #getLoginInputData() {
        /* Get login form data from the parent class */

        [this.userEmail, this.userPassword] = this.returnOnChildClass();
        
    }
    

    #createMessages(id, message) {
        /* called to diplay appropriate message to the user */

        this.resetFormCreateMessage(id, message);

    }

    getValidateRetrieveMessage() {
        /* calls all the required methods */

        this.#getLoginInputData();

        try {

            this.#validateInput();

        } catch (err) {

            err.displayError();
        
            return;
        }
        
    }

}

class PageErrors extends Error {

    constructor(name, message) {

        super(message);
        
        this.name = name;
        this.message = message;


    }

    displayError() {
        /* Creates Div Element to display Errors */

        let form__error = window.document.getElementById('error_message');
        form__error.className = 'form__error';
        form__error.innerHTML = this.message;


    }


}

changeHeaderOnScroll();

showAnswer();

const zebrazMain = new MainClass();
zebrazMain.createWebsiteStorage();
zebrazMain.messageOnLoad();

const userRegistration = new Registration();

const userLogin = new Login();