import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d6efc2cd428893c6755c2fa349db85e8";
// const API_KEY = '00a1f4da0e165ef971ebd726aa768cee'

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

  return data;

};
