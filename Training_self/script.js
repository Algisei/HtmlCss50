function checkFadeIn() {
    var elements = document.querySelectorAll('.fade-in');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var position = element.getBoundingClientRect().top;

        if (position - window.innerHeight <= 0) {
            element.classList.add('show');
        }
    }
}

document.body.style.backgroundImage = "url(forest.jpg)";
document.body.style.backgroundSize = "cover";
window.addEventListener('scroll', checkFadeIn);
window.addEventListener('resize', checkFadeIn);
checkFadeIn();
