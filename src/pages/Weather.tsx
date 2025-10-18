import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import type { WeatherData } from '../types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeather = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error('City not found');
  return res.json();
};

export const Weather = () => {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', searchCity],
    queryFn: () => fetchWeather(searchCity),
    enabled: false
  });

  const handleSearch = () => {
    if (city.trim()) {
      setSearchCity(city);
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4">
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Weather Widget</h1>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {isLoading && (
            <div className="text-center text-gray-600">
              Fetching weather...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              City not found or error fetching data
            </div>
          )}

          {data && !isLoading && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/10d@2x.png`}
                alt="weather icon"
                className="mx-auto w-24 h-24"
              />
              <p className="text-5xl font-bold mb-2">{Math.round(data.main.temp)}°C</p>
              <p className="text-xl text-gray-600 capitalize mb-4">
                {data.weather[0].description}
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Humidity:</strong> {data.main.humidity}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};