let contacts = [];
let deleteContacts = [];
let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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

    saveUsers();
    renderContacts();
    deleteValue(firstName, lastName, email, phone);
    openContactData();
    openEditContact();
    deleteContact();
    console.log(contacts);
}


function deleteContact(i) {
    const contact = contacts[i];
    document.getElementById('contact-data').innerHTML = '';

    deleteContacts.push(contact);

    contacts.splice(i, 1);

    renderContacts()
    saveUsers();
}


function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';


    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += templateHTML(contact, i);
        document.getElementById("new-contact").classList.remove("show-overlay-menu");
        document.getElementById(`letterbox-contact-div${i}`).style.backgroundColor = contacts[i]["color"];

        sortAlphabetic(i);
    }
}


function sortAlphabetic(i) {
    document.getElementById(`alphabetic${i}`).innerHTML = contacts[i]["first-name"].charAt(0);
    contacts.sort((a, b) => {
        let fa = a["first-name"].toLowerCase(),
            fb = b["first-name"].toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    
    console.log(contacts);
}


function openContactData(i) {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata, i);
    document.getElementById(`contact-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];
}


function openEditContact(i) {
    const editcontactdata = contacts[i];
    document.getElementById('edit-contact').innerHTML = editContactDataHTML(editcontactdata, i);
    document.getElementById(`edit-name-token${i}`).style.backgroundColor = contacts[i]["color"];
}

function editSave(i){
    let firstName = document.getElementById(`edit-first-name${i}`);
    let lastName = document.getElementById(`edit-last-name${i}`)
    let email = document.getElementById(`edit-email${i}`);
    let phone = document.getElementById(`edit-phone${i}`);
    
    contacts[i] = ({
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": phone.value,
        "color": getRandomColor(),
    });

    document.getElementById('contact-data').innerHTML = '';

    closeEdit();
    renderContacts();
    saveUsers();
    openContactData();
}

function closeEdit() {
    document.getElementById('edit-contact').innerHTML = '';
}



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
async function saveUsers() {
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
        <div class="contactdata"> 
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
                        <button class="edit-contact-button" onclick="openEditContact(${i})"><img class="edit-contact-img" src="./img/Group 8.png">Edit Contact</button>
                        <img src="./img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${contactdata['email']}" class="contact-data-email">${contactdata['email']}</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${contactdata['phone']}" class="contact-data-phone">${contactdata['phone']}</a>
                    </div> 
        </div>
    `
}


function editContactDataHTML(editcontactdata, i) {
    return `
    <div class="edit-box" id="edit-box">
    <img src="./img/Vector.png" class="close-x" onclick="closeEdit()">
    <div class="edit-box-left">
        <img src="./img/Capa.png">
        <h2 class="edit-contact-name">Edit contact</h2>
    </div>
    <div class="edit-name-token" id="edit-name-token${i}">
                ${editcontactdata['first-name'].charAt(0)}
                ${editcontactdata['last-name'].charAt(0)}
    </div>
    <div class="edit-input-field" id="edit-input-field">
            <div>
                <input class="edit-input" id="edit-first-name${i}" value="${editcontactdata['first-name']}" placeholder="First-Name">
                <input class="edit-input" id="edit-last-name${i}" value="${editcontactdata['last-name']}" placeholder="Last-Name">
                <input class="edit-input" id="edit-email${i}" value="${editcontactdata['email']}" placeholder="Email">
                <input class="edit-input" id="edit-phone${i}" value="${editcontactdata['phone']}" placeholder="Phone">
            </div>
        <button class="edit-save" id="edit-save" onclick="editSave(${i})">
            <h3 class="edit-save-button">Save</h3>
        </button>
    </div>
</div>
    `
}