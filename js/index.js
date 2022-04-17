
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
        document.querySelector('header.top').classList.toggle('scrolled', window.scrollY > 0);

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
        let userPassword = document.getElementById('password').value;

        return [fullName, emailAddress, userPassword];
        
    }

    #getLoginData () {

        console.log('login data needed');
    }

    returnOnChildClass () {

        /* Calls various interna */

        if (this.childClassName === 'registration' ) {
            
            return this.#getRegistrationData();

        } else if (this.childClassName === 'login') {

            this.#getLoginData();

        }

    }



}


class Registration extends MainClass {

    constructor () {
        /* Creates the Instance attributes */

        super('registration')

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

    #createMessages(message) {

        /* Called to display appropriate messages to the user*/

        console.log(message);

        
    }

    #addToZebrazMembers(message) {
        /* Called to add Successfully Registered Session Storage */

        this.#createMessages('Welcome to a whole new world of learning');
        
    }


    #getInputData() {

        /* Gets registration data from the parent class */


        [this.personName, this.personEmail, this.personPassword] = this.returnOnChildClass();

    }

    getvalidateStoreMessage() {
        /* Runs all the required methods */

        // this.#validateInput();
        this.#getInputData();

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

        console.log(this.message);

    }


}

changeHeaderOnScroll();

showAnswer();

const userRegistration = new Registration();


