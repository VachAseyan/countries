let list = document.querySelector('.list');
let info = document.querySelector('.info');
let countryFlag = document.querySelector('.country-flag');
let countryName = document.querySelector('.country-name');
let countryCapital = document.querySelector('.country-capital');
let countryPopulation = document.querySelector('.country-population');
let countryRegion = document.querySelector('.country-region');

const fetchData = async (url) => {
    let response = await fetch(url);
    return await response.json();
}

const populate = async () => {
    let countries = await fetchData('https://restcountries.com/v3.1/all');
    countries.forEach(country => {
        let option = document.createElement('option');
        option.textContent = country.name.common;
        list.appendChild(option);
    });
}

const getCountryData = async (countryName) => {
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    let countryArray = await fetchData(url);
    let country = countryArray[0];
    countryName.textContent = country.name.common;
    countryFlag.setAttribute('src', country.flags.svg);
    countryCapital.textContent = country.capital;
    countryPopulation.textContent = country.population;
    countryRegion.textContent = country.region;
}

list.addEventListener('change', (e) => {
    let selectedCountry = e.target.value;
    if (selectedCountry !== "Select") {
        getCountryData(selectedCountry);
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
});
populate();