let play = document.querySelector('#termsAndCo');
let checkBox = document.querySelector('#squaredOne');

checkBox.addEventListener('click', () => {
    if (checkBox.checked == true) {
        play.classList.remove('disabled');
    }
    if (checkBox.checked == false) {
        play.classList.add('disabled');
    }
})
play.addEventListener('click', () => {
    if (!play.classList.contains('disabled')) {
        window.open('/chat', '_self');
    }
})