let button = document.querySelector('#button');
let inputValue = document.querySelector('.inputValue');
let responseField = document.querySelector('#responseField');
const apiKey = '06ace67f03bd47ffa532cb68bb7cb2ae';
const url = 'https://api.rebrandly.com/v1/links';

const shortenUrl = async () => {
    const urlToShorten = inputValue.value;
    const data = JSON.stringify({destination: urlToShorten});
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: 'data',
            headers: {
                'Content-type': 'application/json',
                'apikey': apiKey
            }
        })
        if(response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse);
        }
    } catch(error) {
        console.log(error);
        alert('Oops, an error occured, check the console for more information.');
    }
}


//Clear the page and call the AJAX function
const displayShortURL = (event) => {
    event.preventDefault();
    while(responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    shortenUrl();
}

button.addEventListener('click', displayShortURL);

//Manipulats our response field to display an appropriated and formatted message
const renderResponse = (res) => {
    if(res.errors) {
        responseField.innetHTML = "<p>Sorry couldn'\t shorten your URL</p>";
    } else {
        responseField.innerHTML = `<p>Your shortned URL is:<br> ${res.shortURL}</p>`;
    }
}