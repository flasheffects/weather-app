import {useState, useEffect} from "react";
import './App.css';

function App() {
    const cityList = ['London', 'Sydney', 'Tokyo', 'Madrid', 'Addis Ababa']
    const iconUrl = 'http://openweathermap.org/img/wn/'
    const flagUrl = 'http://openweathermap.org/images/flags/'
    const [city, setCity] = useState(null);
    let cities = []

    useEffect(() => {
        (async () => {
            let i = 0;
            for (i; i < cityList.length; i++) {
                const response = await fetch(`
                https://api.openweathermap.org/data/2.5/weather?q=${cityList[i]}&APPID=912859358d42a369fca4c4619000187a`)
                const json = await response.json()
                cities.push(json)
                setCity({cities})
            }
        })();
    }, []);

    const listing = city !== null && cities !== [] ? city.cities.map(i => i) : 'Loading..'
    const data = city !== null && cities !== [] && listing.sort(function (x, y) {
        return x.main.temp - y.main.temp;
    });

    return (
        <div className="App">
            <h1 style={{color: 'white', paddingTop: 40}}>Weather</h1>
            {city !== null && data.map((i, index) => (
                <div style={{paddingTop: 20}} key={index}>
                    <img src={flagUrl + i.sys.country.toLowerCase() + '.png'} alt=""/>
                    <h3>{i.name}</h3>
                    <h4>{Math.floor(i.main.temp - 273.15) > 0 ? "+" : "-"} {Math.floor(i.main.temp - 273.15)} {'°C'}</h4>
                    <h4>{i.weather[0].description} </h4>
                    <img style={{position: 'relative', top: -10}} src={iconUrl + i.weather[0].icon + '.png'} alt=""/>
                </div>
            ))}
        </div>
    );
}

export default App;
