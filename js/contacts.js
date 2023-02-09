let contacts = [];

let contas = [
    {
        'name': 'Talat Yildirim',
        'email': 'talatyildirim@outlook.de',
        'phone': '01754121987'
    },
]

async function initContacts() {
    await downloadFromServer();
    names = JSON.parse(backend.getItem('name')) || [];
    emails = JSON.parse(backend.getItem('email')) || [];
    phones = JSON.parse(backend.getItem('phone')) || [];

    createContact();

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
    console.log(contacts);

    name.value = '';
    email.value = '';
    phone.value = '';

    document.getElementById('contacts').innerHTML += templateHTML(contact);

    addUser();
    initContacts()

}

function templateHTML(contact) {
    return `
        <div> 
            <div>
                ${contact}
            </div>
        </div>
    `
}


function addUser() {
    backend.setItem('name', JSON.stringify(names));
    backend.setItem('email', JSON.stringify(emails));
    backend.setItem('phone', JSON.stringify(phones));
}