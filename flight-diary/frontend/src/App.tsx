import { useEffect, useState } from "react";
import axios from 'axios';
import { apiBaseUrl } from "./constants";

interface DiaryEntry {
  id: number,
  date: string,
  weather: string,
  visibility: string
}

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      id: entries.length + 1,
      date,
      weather,
      visibility,
      comment
    };

    axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, entryToAdd)
    .then(response => {
      setEntries(entries.concat(response.data));
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data;
          const match = errorMessage.match(/Error:.+/);
          setError(match);
        }
      }
      setTimeout(() => {
        setError('');
      }, 5000);
    });
};


  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`).then(response => {
      setEntries(response.data);
    });
  }, []);

  return (
    <div>
      <form onSubmit={entryCreation}>
        <h2>Add new entry</h2>
        <p style={{color: 'red'}}>{error}</p>
        <div>
          date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <div>
          <span style={{ marginRight: '20px' }}>visibility</span> 
            <label>
            great
            <input type="radio" value="great" name="visibility"
              onChange={(event) => setVisibility(event.target.value)} 
            />
            </label>

            <label>
            good
            <input type="radio" value="good" name="visibility"
              onChange={(event) => setVisibility(event.target.value)} 
            />
            </label>

            <label>
            ok
            <input type="radio" value="ok" name="visibility"
              onChange={(event) => setVisibility(event.target.value)} 
            />
            </label>

            <label>
            poor
            <input type="radio" value="poor" name="visibility"
              onChange={(event) => setVisibility(event.target.value)} 
            />
            </label>
          </div>
        </div>
        <div>
          <div>
          <span style={{ marginRight: '20px' }}>weather</span> 
            <label>
            sunny
            <input type="radio" value="sunny" name="weather"
              onChange={(event) => setWeather(event.target.value)} 
            />
            </label>

            <label>
            rainy
            <input type="radio" value="rainy" name="weather"
              onChange={(event) => setWeather(event.target.value)} 
            />
            </label>

            <label>
            cloudy
            <input type="radio" value="cloudy" name="weather"
              onChange={(event) => setWeather(event.target.value)} 
            />
            </label>

            <label>
            stormy
            <input type="radio" value="stormy" name="weather"
              onChange={(event) => setWeather(event.target.value)} 
            />
            </label>

            <label>
            windy
            <input type="radio" value="windy" name="weather"
              onChange={(event) => setWeather(event.target.value)} 
            />
            </label>
          </div>
        </div>
        <div>
          comment
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map(diary => 
        <div key={diary.id}>
          <h3>{diary.date}</h3> 
          <p>
            visibility: {diary.visibility}
            <br></br>
            weather: {diary.weather}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;