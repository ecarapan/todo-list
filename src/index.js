import "./styles.css"
import { loadHome } from './home';
import { loadMenu } from './menu';
import { loadContacts } from './contacts';

const homeBtn = document.getElementById('home-btn');
const menuBtn = document.getElementById('menu-btn');
const contactsBtn = document.getElementById('contacts-btn');

function clearContent() {
    document.getElementById('content').innerHTML = '';
}

function setActiveButton(activeBtn) {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

homeBtn.addEventListener('click', () => {
    setActiveButton(homeBtn);
    clearContent();
    loadHome();
});

menuBtn.addEventListener('click', () => {
    setActiveButton(menuBtn);
    clearContent();
    loadMenu();
});

contactsBtn.addEventListener('click', () => {
    setActiveButton(contactsBtn);
    clearContent();
    loadContacts();
});

setActiveButton(homeBtn);
loadHome();