/*  Zebraz Javascript Code
    Object Oriented principles used
    inheritance, polymorphism, encapsulation, abstraction.

*/

class MainClass {

    constructor (childClass=null) {
        /* Creates the Instance attributes */

        this.childClassName = childClass;


    }

    #getRegistrationData() {

        /* Gets user registration data from Form */

        let fullName = document.getElementById('name').value;
        let emailAddress = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        return [fullName, emailAddress, password];
        
    }

    #getLoginData() {

        let userEmail = document.getElementById('userEmail').value;
        let userPassword = document.getElementById('userPassword').value;

        return [userEmail, userPassword];
    }

    emailValidation(email) {
        /* Called to validate email making sure everything */

        const emailReString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (emailReString.test(email)) {

            return true;
            
        } else {

            throw new PageErrors('emailValidationError', 'Invalid Email! Kindly check your email format.');
            
        }


    }

    returnOnChildClass() {

        /* Calls various interna */


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

        }
        
    }

    createMessageAfter(id, message) {
        /* Called to create a success message*/
        
        location.href = "index.html";
        window.sessionStorage.setItem('documentLoaded', 1);
        window.sessionStorage.setItem('loginMessage', message);

        
    }

    messageOnLoad() {
        /* Displays the message every time the index page loads from the Login Page or registration page */

        window.addEventListener('DOMContentLoaded', function (event) {


            if (window.sessionStorage.getItem('documentLoaded') == true) {

                    
                let formMessage = window.document.getElementById('message__box');


                formMessage.classList.toggle('form__message');

                document.getElementById('display__message').innerHTML = window.sessionStorage.getItem('loginMessage');
                
                window.sessionStorage.setItem('documentLoaded', 0);

            }

            let headerTop = document.querySelector('header.top');

            if (headerTop) {
                headerTop.classList.toggle('scrolled', window.scrollY > 0);
    
            }


        });


    }

    static closeMessage() {
        /* Closes login and registration successful messages */
        document.getElementById('message__box').classList.remove('form__message');
    }

    static hamburgerClicked() {

        /* Called to Open the Mobile Menu */
    
    
        document.querySelector('.fa-bars').classList.toggle('fa-xmark');
    
        document.querySelector('.top').classList.toggle("nav__toggled");
    
    }

    static showAnswer() {
        /* Called to to show the frequently asked questions answers */
        
        document.querySelectorAll('.faq').forEach( faq => {
            faq.addEventListener('click', () => {
    
                
                let icon = faq.querySelector('i')
                
                if (icon.className === 'fa-solid fa-plus') {
    
                    icon.className = 'fa-solid fa-minus'
                    
                    
                    
                } else {
                    icon.className = 'fa-solid fa-plus'

                }
    
                faq.classList.toggle('faq__answer');
                
            })
    
        })
    
    
    }
    
    static changeHeaderOnScroll() {
        /* Called to change give different styles on scrolling */


        let currentSection = "";
        
        const sections = document.querySelectorAll('section');
        
        const nav_links = document.querySelectorAll('.nav__link');
        
        const headerTop = document.querySelector('header.top');
    


    
    
        window.addEventListener('scroll', () => {

            sections.forEach(section => {

                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                let calc = sectionTop - sectionHeight/2;
            
                if (scrollY >= calc ) {

                    currentSection = section.id;
    
                }
            
            });


            nav_links.forEach(link => {

                link.classList.remove('active__link');

                if (link.classList.contains(currentSection)) {
                    
                    link.classList.add('active__link');

                }
                
            });
    
            if (headerTop) {
                headerTop.classList.toggle('scrolled', window.scrollY > 10);

            }
    
        })
    
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

        if (this.personName && this.personEmail && this.personPassword) {

            if (this.emailValidation(this.personEmail)) {

                this.#addToZebrazMembers();
                
            } else {

                throw new PageErrors('emailValidation', 'Please make sure your email is in the right format');
                
            }

        } else {

            throw new PageErrors('emptyInputsError', 'Please enter all the required details')

        }

        
    }

    #createMessages(id, message) {

        /* Called to display appropriate messages to the user*/


        this.createMessageAfter(id, message);

        

        
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

                this.#createMessages('register_form', `Hello <strong>${this.personName}</strong> Welcome. Account created Successfully.`);
                

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


        if (this.userEmail && this.userPassword) { 

            if (this.emailValidation(this.userEmail)) {

                try {

                    this.#getStoredData(this.userEmail, this.userPassword);

                } catch(err) {

                    err.displayError();

                }


                
            } else {

                throw new PageErrors('emailValidation', 'Please make sure your email is in the right format');
                
            }

        } else {

            throw new PageErrors('emptyInputsError', 'Please enter all the required details')

        }
        
    }
    
    #getStoredData(email, password) {
        /* Fetches user data and confirms whther the values passed match */

        let userData = JSON.parse(localStorage.getItem('websiteUsers'))[email];


        if (userData && userData[1] == password) {

            
            this.#createMessages('login_form', `Welcome back <strong>${userData[0]}</strong> Continue where you left off.`)
            

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

        this.createMessageAfter(id, message);

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

class Subscribe extends MainClass {

    constructor() {
        /* Creates the Instance attributes */
        
        super();
        
    }

    #subscribeToNotification() {
        
        /* POLYMORPHISM Private Method Called by the  subscribeGetNotification method when user clicks the subscribe button to display a message */

        let emailSubscribe = document.getElementById('subscribe').value;
        
        if (emailSubscribe) {

            if (this.emailValidation(emailSubscribe)) {


                this.createMessageAfter('Thank you for subscribing to our Email Notifications.');

            }

        } else {
            throw new PageErrors('emptyInputsError', 'Please enter Email');
        }
        
    }
    
    subscribeGetNotification() {
        /* Called when user clicks the subscribe button */
        try {

            this.#subscribeToNotification();
        } catch(err) {

            err.displayError();
        }


    }

    createMessageAfter(message) {
        /* Called create a success message after user clicks subscribe button */

        let formMessage = window.document.getElementById('message__box');


        formMessage.classList.toggle('form__message');

        document.getElementById('display__message').innerHTML = message;

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


// MainClass overall static Methods
MainClass.changeHeaderOnScroll();
MainClass.showAnswer();

// MainClass Instance Object

const zebrazMain = new MainClass();

// MainClass instance Methods;
zebrazMain.createWebsiteStorage();
zebrazMain.messageOnLoad();


//Registration class intance Object
const userRegistration = new Registration();

//Login class intance Object
const userLogin = new Login();

//Subscribe class instance Object
const subNotification = new Subscribe();