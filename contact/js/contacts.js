let contacts = [];

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
    console.log(contacts);

    openContactData();
}

function renderContacts() {
    document.getElementById('contacts').innerHTML += '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        document.getElementById('contacts').innerHTML += templateHTML(contact, i);
        document.getElementById('new-contact').classList.remove('show-overlay-menu');
    }
}

function openContactData(i) {
        const contactdata = contacts[i];
        document.getElementById('contact-data').innerHTML += contactDataHTML(contactdata);
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
        <div class="contacts" onclick="openContactData(${i})">
            <div class="contactlist-name">
                ${contact['name']}
            </div>
            <div class="contactlist-email">
                ${contact['email']}
            </div>
        </div>
    `
}