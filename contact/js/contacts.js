let contacts = [];
let letters = [];


async function initContacts() {
    await downloadFromServer();
    await loadContacts();
    renderContacts();
}


function createContact() {
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name')
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contact = {
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": phone.value
    };

    contacts.push(contact);
    addUser();
    renderContacts();
    deleteValue(firstName, lastName, email, phone);
    openContactData();
    console.log(contacts);
}


function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
            content.innerHTML += templateHTML(contact, i);

    document.getElementById('new-contact').classList.remove('show-overlay-menu');
    
}
}

function openContactData(i) {
        const contactdata = contacts[i];
        document.getElementById('contact-data').innerHTML += contactDataHTML(contactdata);
}


/**
 * this function delete the inputfield
 * 
 * @param {string} name.value 
 * @param {string} email.value 
 * @param {string} phone.value 
 */
function deleteValue(firstName, lastName, email, phone) {
    firstName.value = '';
    lastName.value = '';
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
        <div class="contacts">
            <div class="letterbox" id="letterbox${i}">
                ${contact['first-name'].charAt(0)}
                ${contact['last-name'].charAt(0)}
                <div onclick="openContactData(${i})">
                    <span class="contactlist-name">
                        ${contact['first-name']}
                        ${contact['last-name']}
                    </span>
                    <a class="contactlist-email">
                        ${contact['email']}
                    </a>
                </div>
            </div>
        </div>
    `
}


function contactDataHTML(contactdata) {
    return`
        <div> 
        <div class="contact-first-last-name">
            ${contactdata['first-name'].charAt(0)}
            ${contactdata['last-name'].charAt(0)}
        </div>
            <span class="contact-data-name">
                ${contactdata['first-name']}
                ${contactdata['last-name']}
            </span>
            <div class="add-task-div">
                <img class="add-task-img" src="./img/Group 11.png">
                <a hraf="#" class="add-task">Add Task</a>
            </div>
            <span class="contact-information">Contact Information</span>
            <a class="contact-data-email">${contactdata['email']}</a>  
            <div class="contact-data-phone">${contactdata['phone']}</div> 
        </div>
    `
}