import parterImg from '../images/parter.jpg';
import subsolaImg from '../images/subsola.jpg';

export function loadHome() {
    const content = document.getElementById('content');
    const header = document.querySelector('header');

    const oldHeadline = header.querySelector('h1');
    if (oldHeadline) {
        header.removeChild(oldHeadline);
    }

    const headline = document.createElement('h1');
    headline.textContent = "Home";

    const title = document.createElement('p');
    title.textContent = "Welcome to Restaurant La Matei!";
    const description = document.createElement('p');
    description.textContent = "Welcome to Restaurant La Matei! " + 
    "We proudly serve authentic Romanian dishes made with love, including our famous mici. " +
    "Come and enjoy the true taste of tradition in a warm and friendly atmosphere.";

    const descDiv = document.createElement('div');

    const hours = document.createElement('p');
    hours.textContent = "Open daily: 7:00 AM – 11:00 PM"

    const imgOne = document.createElement('img');
    imgOne.src = parterImg;
    imgOne.alt = 'Restaurant upstairs';

    const imgTwo = document.createElement('img');
    imgTwo.src = subsolaImg;
    imgTwo.alt = 'Restaurant downstairs';
  

    const image = document.createElement('img');

    header.appendChild(headline);
    content.appendChild(imgOne);
    content.appendChild(descDiv);
    content.appendChild(imgTwo);

    descDiv.appendChild(title);
    descDiv.appendChild(description);
    descDiv.appendChild(hours);
}