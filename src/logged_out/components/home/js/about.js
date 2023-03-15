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