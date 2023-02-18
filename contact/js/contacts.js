let contacts = [];
let colors = [];


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


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < colors.length; i++) {
       color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function setRandomColor(i) {
    let letterbox = document.getElementById(`letterbox-contact-div${i}`);
    letterbox.style.backgroundColor = getRandomColor();
}


function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += templateHTML(contact, i);

        document.getElementById('new-contact').classList.remove('show-overlay-menu');
    }
    setRandomColor();
}

function openContactData(i) {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata);
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

function editContact() {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata);
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


function contactDataHTML(contactdata) {
    return `
        <div> 
            <div class="contact-first-last-name-div" id="contact-first-last-name-div">
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
                        <button clas="edit-contact" onclick="editContact()"><img class="edit-contact-img" src="./img/Group 8.png">Edit Contact</button>
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