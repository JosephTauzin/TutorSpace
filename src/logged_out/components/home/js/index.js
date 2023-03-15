var topProcessMenuButton = document.querySelector('.topProcessMenuButton')
var secondProcessMenuButton = document.querySelector('.secondProcessMenuButton')
var thirdProcessMenuButton = document.querySelector('.thirdProcessMenuButton')
var fourthProcessMenuButton = document.querySelector('.fourthProcessMenuButton')
var bottomProcessMenuButton = document.querySelector('.bottomProcessMenuButton')

var processTitle = document.getElementById("processTitle")
var processContent = document.getElementById("processContent")
var processImage = document.getElementById("processImage")

updateTopButtonContent = () => {
    processTitle.style.opacity = 0
    processContent.style.opacity = 0
    processImage.style.opacity = 0

    setTimeout(() => {
        processTitle.innerHTML = 'See <span class="bold">TutorSpace</span> Inside & Out'
        processContent.innerHTML = 'We’ll show you how TutorSpace can impact your business, dive into its features, and answer any questions you might have about the software. Fill out the contact form below to schedule a demo!'
        processImage.src='./images/TutorSpaceDashboard.png'

        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    topProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

updateSecondButtonContent = () => {
    processTitle.style.opacity = 0
    processContent.style.opacity = 0
    processImage.style.opacity = 0

    setTimeout(() => {
        processTitle.innerHTML = 'Hit the Ground Running'
        processContent.innerHTML = 'We’ll configure TutorSpace to meet your needs, create your student, tutor, and administrative accounts, upload existing data from your business, and show you the ropes to get the most out of the product.'
        processImage.src='./images/TutorSpaceMenuRoster.png'

        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    secondProcessMenuButton.classList.add("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

updateThirdButtonContent = () => {
    processTitle.style.opacity = 0
    processContent.style.opacity = 0
    processImage.style.opacity = 0

    setTimeout(() => {
        processTitle.innerHTML = 'Start Using TutorSpace'
        processContent.innerHTML = 'Once your accounts have been set up and all your data has been added to TutorSpace, we’ll help make sure things go smoothly as you start using TutorSpace and be available to help solve any problems.'
        processImage.src='./images/TutorSpaceNotes.png'

        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    thirdProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

updateFourthButtonContent = () => {
    processTitle.style.opacity = 0;
    processContent.style.opacity = 0;
    processImage.style.opacity = 0;

    setTimeout(() => {
        processTitle.innerHTML = 'Supercharge Your Business'
        processContent.innerHTML = 'Moving your regular processes into TutorSpace makes your business more efficient and easier to run! Set up integrated Stripe payments and invoicing, automatic emails to parents and students, and more.'
        processImage.src='./images/TutorSpacePayments.png'

        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    fourthProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

updateBottomButtonContent = () => {
    processTitle.style.opacity = 0;
    processContent.style.opacity = 0;
    processImage.style.opacity = 0;
    
    setTimeout(() => {
        processTitle.innerHTML = 'Build Momentum'
        processContent.innerHTML = 'We provide ongoing support while you‘re using TutorSpace and are available to troubleshoot, answer questions, build new features and tools suited for your business, and incorporate feedback to make TutorSpace better for you.'
        processImage.src='./images/TutorSpaceWhiteboard.png'

        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    bottomProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
} 

topProcessMenuButton.addEventListener('click', updateTopButtonContent)
secondProcessMenuButton.addEventListener('click', updateSecondButtonContent)
thirdProcessMenuButton.addEventListener('click', updateThirdButtonContent)
fourthProcessMenuButton.addEventListener('click', updateFourthButtonContent)
bottomProcessMenuButton.addEventListener('click', updateBottomButtonContent)

var contactForm = document.getElementById("contact")
var contactLink = document.querySelectorAll(".contactLink")

contactLink.forEach(formLink => {
    formLink.addEventListener('click', () => contactForm.scrollIntoView({behavior: 'smooth', block: 'center'}))
})


//Mobile Menu Fuctionality
var mobileMenu = document.querySelector(".mobileMenu")
var menuIcon = document.getElementById("menuIcon")


handleMenuClick = () => {
    if (mobileMenu.style.opacity == 0) {
        mobileMenu.style.transform = "translateX(0%)"
        mobileMenu.style.opacity = 1
    }
    else {
        mobileMenu.style.transform = "translateX(-100%)"
        mobileMenu.style.opacity = 0
    }
}

menuIcon.addEventListener('click', handleMenuClick)


//Contact Form Link Handler
var onPageContactLink = document.querySelector(".contactLinkMobile")
onPageContactLink.addEventListener('click', () => {
        handleMenuClick();
        contactForm.scrollIntoView({behavior: 'smooth', block: 'center'})
})
