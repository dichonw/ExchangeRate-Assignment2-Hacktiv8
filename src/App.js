import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="container mx-auto p-5">
      <h1 className="text-4xl text-center font-semibold mb-5">Currency Rates</h1>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-sm text-center bg-slate-900 text-white font-bold">
          <tr>
            <td className="px-6 py-3">Currency</td>
            <td className="px-6 py-3">We Buy</td>
            <td className="px-6 py-3">Exchange Rate</td>
            <td className="px-6 py-3">We Shell</td>
          </tr>
        </thead>
        <tbody>
          {data.map((items, index) => (
          <tr key={index}>
            <td className="text-center text-white px-6 py-3 font-semibold bg-slate-800">{items.currencyName.toString()}</td>
            <td className="text-center text-white px-6 py-3 font-semibold bg-slate-800">{items.weBuy.toString()}</td>
            <td className="text-center text-white px-6 py-3 font-semibold bg-slate-800">{items.exchangeRate.toString()}</td>
            <td className="text-center text-white px-6 py-3 font-semibold bg-slate-800">{items.weSell.toString()}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <p className="text-slate-800 text-center mt-2">
        Rates are based from 1 USD <br/>
        This application uses API from <a className="text-blue-500" href="https://currencyfreaks.com">https://currencyfreaks.com</a> 
      </p>
    </div>
  );
};

export default App;
