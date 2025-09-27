export function loadMenu() {
    const content = document.getElementById('content');
    const header = document.querySelector('header');

    const oldHeadline = header.querySelector('h1');
    if (oldHeadline) {
        header.removeChild(oldHeadline);
    }

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('menu-container')

    const headline = document.createElement('h1');
    headline.textContent = "Menu";

    // Ciorba de Perisoare
    const ciorbaDiv = document.createElement('div');
    ciorbaDiv.classList.add('ciorba');
    const nameCiorbaDiv = document.createElement('div');
    nameCiorbaDiv.textContent = "Ciorba de Perisoare";
    const priceCiorbaDiv = document.createElement('div');
    priceCiorbaDiv.textContent = "$4.99";
    ciorbaDiv.appendChild(nameCiorbaDiv);
    ciorbaDiv.appendChild(priceCiorbaDiv);

    // Sarmale
    const sarmaleDiv = document.createElement('div');
    sarmaleDiv.classList.add('sarmale');
    const nameSarmaleDiv = document.createElement('div');
    nameSarmaleDiv.textContent = "Sarmale cu Mamaliguta";
    const priceSarmaleDiv = document.createElement('div');
    priceSarmaleDiv.textContent = "$7.99";
    sarmaleDiv.appendChild(nameSarmaleDiv);
    sarmaleDiv.appendChild(priceSarmaleDiv);

    // Mici
    const miciDiv = document.createElement('div');
    miciDiv.classList.add('mici');
    const nameMiciDiv = document.createElement('div');
    nameMiciDiv.textContent = "Mititei cu Cartofi Prajiti";
    const priceMiciDiv = document.createElement('div');
    priceMiciDiv.textContent = "$9.99";
    miciDiv.appendChild(nameMiciDiv);
    miciDiv.appendChild(priceMiciDiv);

    // Papanași
    const papanasiDiv = document.createElement('div');
    papanasiDiv.classList.add('papanasi');
    const namePapanasiDiv = document.createElement('div');
    namePapanasiDiv.textContent = "Papanasi";
    const pricePapanasiDiv = document.createElement('div');
    pricePapanasiDiv.textContent = "$4.49";
    papanasiDiv.appendChild(namePapanasiDiv);
    papanasiDiv.appendChild(pricePapanasiDiv);

    header.appendChild(headline);
    content.appendChild(containerDiv);
    containerDiv.appendChild(ciorbaDiv);
    containerDiv.appendChild(sarmaleDiv);
    containerDiv.appendChild(miciDiv);
    containerDiv.appendChild(papanasiDiv);
}