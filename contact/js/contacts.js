let contacts = [];

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

    let contact = {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "email": email.value,
        "phone": phone.value,
        "color": getRandomColor()
    };

    contacts.push(contact);
    addUser();
    deleteValue(firstName, lastName, email, phone);
    openContactData();
    getRandomColor();
    compareStrings(a, b);
    console.log(contacts);
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

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

contacts.sort(function (a, b) {
    return compareStrings(a.firstName, b.firstName);
})


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += templateHTML(contact, i);
        document.getElementById(`letterbox-contact-div${i}`).style.backgroundColor = contacts[i]["color"];
    }
}


function editContact(i) {
    const editdata = contacts[i];
    document.getElementById('edit-contact').innerHTML = editContactHTML(editdata, i);
}

function openContactData(i) {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata, i);
    document.getElementById(`contact-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];
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
        <div class="alphabetic${i}"></div>
        <div><img src="./img/Vector 10.png"></div>
        <div class="contacts" onclick="openContactData(${i})">
            <div class="letterbox" id="letterbox${i}">
                <div class="latterbox-contact-div" id="letterbox-contact-div${i}">
                    <div class="latterbox-contact">
                        ${contact['first-name'].charAt(0)}
                        ${contact['last-name'].charAt(0)}
                    </div>
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
                <div class="contact-first-last-name">
                    ${contactdata['first-name'].charAt(0)}
                    ${contactdata['last-name'].charAt(0)}
                </div>
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
    return`
        <div class="edit-box">
            <div class="edit-box-left">
                <img>
                <h2>Edit contact</h2>
            </div>
            <div>
            <div class="edit-name-token"></div>
            <input class="edit-input">
            <input class="edit-input">
            <input class="edit-input">
            <input class="edit-input">
            </div>
            <button class="edit-save"></button>
        </div>
                    `
}