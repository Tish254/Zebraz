
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
        document.querySelector('header.top').classList.toggle('scrolled', window.scrollY > 100);

    })


}

changeHeaderOnScroll();

showAnswer();