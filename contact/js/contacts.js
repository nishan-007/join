let contacts = [];
let deleteContacts = [];
let indexContact = 0;

async function initContacts() {
    await downloadFromServer();
    await loadContacts();
    await includeHTML()
    renderContacts();
}


function createContact() {
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name')
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    contacts.push({
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": phone.value,
        "color": getRandomColor(),
        "id": new Date().getTime()
    });

    addUser();
    renderContacts();
    deleteValue(firstName, lastName, email, phone);
    openContactData();
    editContact();
    sortUserAlphabetically()
    console.log(contacts);
}


function deleteContact(i) {
    const contact = contacts[i];

    deleteContacts.push(contact);

    contacts.splice(i, 1);
   
    renderContacts()
    addUser();
}


function sortUserAlphabetically() {
    users.sort(function (a, b) {
        if (a.name.renderContacts() < b.name.renderContacts()) return -1;
        if (a.name.renderContacts() > b.name.renderContacts()) return 1;
        return 0;
    });
}


function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += templateHTML(contact, i);
        document.getElementById(`alphabetic${i}`).innerHTML = contacts[i]["first-name"].charAt(0);
        document.getElementById("new-contact").classList.remove("show-overlay-menu");
        document.getElementById(`letterbox-contact-div${i}`).style.backgroundColor = contacts[i]["color"];
    }
}


function openContactData(i) {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata, i);
    document.getElementById(`contact-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];
}


async function editContact() {
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name')
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    (contacts[indexContact].first_name = firstName.value),
        (contacts[indexContact].second_name = lastName.value),
        (contacts[indexContact].email = email.value),
        (contacts[indexContact].phone = phone.value),
        (contacts[indexContact].addetAt = new Date().getTime()),
        await addUser(contacts);

    deleteValue(firstName, lastName, email, phone);
    renderContacts();
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


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
        <div id="alphabetic${i}" class="letter"></div>
        <img src="./img/Vector 10.png" class="contacts-div-line">
            <div class="letterbox" id="letterbox${i}" onclick="openContactData(${i})">
                <div class="latterbox-contact-div" id="letterbox-contact-div${i}">
                        ${contact['first-name'].charAt(0)}
                        ${contact['last-name'].charAt(0)}
                </div>
                <div class="openContact">
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


function contactDataHTML(contactdata, i) {
    return `
        <div> 
            <div class="contact-first-last-name-div" id="contact-first-last-name-div${i}">
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
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        <button class="edit-contact" onclick="editContact()"><img class="edit-contact-img" src="./img/Group 8.png">Edit Contact</button>
                        <img src="./img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <div class="contact-data-email">${contactdata['email']}</div>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <div class="contact-data-phone">${contactdata['phone']}</div>
                    </div> 
        </div>
    `
}


function editContactHTML(editdata, i) {
    return `
        <div class="edit-box">
            <div class="edit-box-left">
                <img>
                <h2>Edit contact</h2>
            </div>
            <div class="edit-name-token" id="edit-name-token${i}">
            </div>
            <div class="edit-input-field">
                <input class="edit-input">
                <input class="edit-input">
                <input class="edit-input">
                <input class="edit-input">
                <button class="edit-save">Safe</button>
            </div>
        </div>
                    `
}