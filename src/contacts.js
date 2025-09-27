export function loadContacts() {
    const content = document.getElementById('content');
    const header = document.querySelector('header');

    const oldHeadline = header.querySelector('h1');
    if (oldHeadline) {
        header.removeChild(oldHeadline);
    }

    const headline = document.createElement('h1');
    headline.textContent = "Contacts";

    const contactsDiv = document.createElement('div');
    contactsDiv.innerHTML = `
    <h2>📞 Contact Us</h2>
    <ul>
        <li><strong>Phone (Reservations & Orders):</strong> +40 123 456 789</li>
        <li><strong>Order at Home:</strong> Call us or use our delivery partners to enjoy our <em>mici</em> and other traditional Romanian dishes at home.</li>
        <li><strong>Email:</strong> <a href="mailto:contact@restaurantlamatei.ro">contact@restaurantlamatei.ro</a></li>
    </ul>
    <p>We look forward to serving you whether you dine in with us or enjoy our food at home!</p>
    `;

    contactsDiv.classList.add('contacts');

    header.appendChild(headline);
    content.appendChild(contactsDiv);
}