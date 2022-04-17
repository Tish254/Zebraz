
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

    constructor (childClass) {
        /* Creates the Instance attributes */


        this.childClass = childClass;


    }

    get

}


class Registration {

    constructor (name, email, password) {
        /* Creates the Instance attributes */


        this.person_name = name;
        this.person_email = email;
        this.person_password = password;
        
    }

    #validateInput() {

        /* Called to to make sure user inputs are in okay */

        const emailReString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.person_name && this.person_email && this.person_password) {

            if (emailReString.test(this.person_email)) {

                this.#createMessages('Welcome to a whole new world of learning');
                
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


