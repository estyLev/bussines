export class CountryService {

    getCountries() {
        return fetch('/bussines/data/countries.json').then(res => res.json())
            .then(d => d.data);
    }
}
    