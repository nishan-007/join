let contacts = [];
let letters = [];


async function initContacts() {
    await downloadFromServer();
    await loadContacts();
    renderContacts();
}


function createContact() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contact = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value
    };

    contacts.push(contact);
    addUser();
    renderContacts();
    deleteValue(name, email, phone);
    openContactData();
    console.log(contacts);
}


function renderContacts(filter) {
    let content = document.getElementById('contacts');
    content.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetter = contact['name'].charAt(0);

        if (!filter || filter == firstLetter) {
            content.innerHTML += templateHTML(contact, i);
        }

        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

    document.getElementById('new-contact').classList.remove('show-overlay-menu');
    
    renderLetters();
}


function openContactData(i) {
        const contactdata = contacts[i];
        document.getElementById('contact-data').innerHTML += contactDataHTML(contactdata);
}


function setFilter(letter) {
    renderContacts(letter);
}


function renderLetters() {
    let letterbox = document.getElementById(`letterbox`);
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += `<div class="letter">${letter}</div>`;
    }
}


/**
 * this function delete the inputfield
 * 
 * @param {string} name.value 
 * @param {string} email.value 
 * @param {string} phone.value 
 */
function deleteValue(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}


/**
 * this function save contacts to the backend
 * 
 */
async function addUser() {
    await backend.setItem('contact', JSON.stringify(contacts));
}


/**
 * this function load contacts from the backend
 * 
 */
async function loadContacts() {
    contacts = JSON.parse(backend.getItem('contact')) || [];
}


function templateHTML(contact, i) {
    return `
        <div class="letterbox" id="letterbox"></div>
            <div class="contacts">
                <div onclick="openContactData(${i})">
                    <div class="contactlist-name">
                        ${contact['name']}
                    </div>
                    <div class="contactlist-email">
                        ${contact['email']}
                    </div>
                </div>
            </div>
    `
}


function contactDataHTML(contactdata) {
    return`
        <div> 
            <div class="contact-data-name">${contactdata['name']}</div>
            <div class="contact-data-email">${contactdata['email']}</div>  
            <div class="contact-data-phone">${contactdata['phone']}</div> 
        </div>
    `
}