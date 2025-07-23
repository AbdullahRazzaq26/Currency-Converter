let baseURL = 'https://open.er-api.com/v6/latest/'
let dropdown = document.querySelectorAll('select')
let exchangeBtn = document.querySelector('#exchangeBtn')
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select')
let amount = document.querySelector('#amount')


window.addEventListener("load", () => {
    exchange();
});


for (let select of dropdown) {
    for (let currCode in countryList) {
        let option = document.createElement('option')
        option.innerText = currCode
        option.value = currCode
        select.append(option)
        if (select.name === 'from' && currCode === 'USD') {
            option.selected = 'selected'
        } else if (select.name === 'to' && currCode === 'PKR') {
            option.selected = 'selected'
        }
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
        exchange()
    })
}


function updateFlag(element) {
    currCode = element.value
    let img = element.parentElement.querySelector('img')
    img.src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`
}

exchangeBtn.addEventListener('click', () => {
    exchange()
})

amount.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        exchange()
    }
})

const exchange = async () => {
    let amount = document.querySelector('#amount')
    let amountValue = amount.value
    if (amountValue === 0 || amountValue < 1) {
        amountValue = 1
        amount.value = 1
    }

    let URL = `${baseURL}${fromCurr.value}`
    let response = await fetch(URL)
    let data = await response.json()
    let rates = amountValue * data.rates[toCurr.value];


    let formattedRate = Number(rates.toFixed(2)).toLocaleString()
    msg.innerText = `${amountValue} ${fromCurr.value} is ${formattedRate} ${toCurr.value}`
    

    msg.classList.remove('flash')
    void msg.offsetWidth; // force reflow to restart animation
    msg.classList.add('flash')
}

