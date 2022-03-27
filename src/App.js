import './App.css';
import data from './data';
import Card from './components/Card';

function App() {
  const renderCard = () => data.map((v) => <Card key={v.album.artists[0].id} img={v.album.images[0].url} album={v.album.name} name={v.album.artists[0].name}/>)
  return (
    <div className="header">
    <h1>Playlist</h1>
      <div className='album'>
        {renderCard()}
        <button class="myButton"><a href={data.uri}>Select</a></button>
      </div>
    </div>
  );
}

export default App;