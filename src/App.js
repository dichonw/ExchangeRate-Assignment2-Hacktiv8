import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const API_KEY = 'beee3e3f2df5447bb5c45eaca885201e';
  const symbols = 'CAD, EUR, IDR, JPY, CHF, GBP';

  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
    .get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=${symbols}`)
      .then((response) => {
        const currency = response.data.rates;
        const currencyData = Object.keys(currency).map((rate) => ({
          currencyName: rate,
          weBuy: Number(currency[rate] * 1.05).toFixed(4),
          exchangeRate: Number(currency[rate] * 1.0).toFixed(4),
          weSell: Number(currency[rate] * 0.95).toFixed(4),
        }));
        setData(currencyData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-light my-3">Currency Rates</h1>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <td className="fw-bold">Currency</td>
              <td className="fw-bold">We Buy</td>
              <td className="fw-bold">Exchange Rate</td>
              <td className="fw-bold">We Shell</td>
            </tr>
          </thead>
          <tbody>
            {data.map((items, index) => (
            <tr key={index}>
              <td>{items.currencyName.toString()}</td>
              <td>{items.weBuy.toString()}</td>
              <td>{items.exchangeRate.toString()}</td>
              <td>{items.weSell.toString()}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <p className="text-light">
          Rates are based from 1 USD <br/>
          This application uses API from <a href="https://currencyfreaks.com">https://currencyfreaks.com</a> 
        </p>
      </div>
    </div>
  );
};

export default App;
