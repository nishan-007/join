let contacts = [];

async function initContacts() {
    await downloadFromServer();
    loadContacts();
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
    addUser()
    deleteValue(name, email, phone);
    console.log(contacts);

    document.getElementById('contacts').innerHTML += templateHTML(contact);

    document.getElementById('new-contact').classList.remove('show-overlay-menu');
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
 * this function load contacts from the backend
 * 
 */
function loadContacts() {
    contacts = JSON.parse(backend.getItem('contact')) || [];
}


/**
 * this function save contacts to the backend
 * 
 */
async function addUser() {
    await backend.setItem('contact', JSON.stringify(contacts));
}


function templateHTML(contact) {
    return `
        <div class="contacts">
            <div class="contactlist-name">
                ${contact['name']}
            </div>
            <div class="contactlist-email">
                ${contact['email']}
            </div>
        </div>
    `
}