//https://rallycoding.herokuapp.com/api/music_albums

const fetchAlbums= async() => {
   const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
      const json =   await res.json();
       // .then(json => console.log(json))
    console.log(json)
};

fetchAlbums();