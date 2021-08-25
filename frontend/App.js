import React,{useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [nazwajedzenia,setnazwajedzenia] = useState("")
  const [ilosc,setilosc] = useState(0)
  const [nowanazwa,setnowanazwa] = useState("")
  const [listajedzenia,setlistajedzenia] = useState([])
  useEffect(()=>{
    Axios.get('http://localhost:3001/read').then((response)=>{
      console.log(response)
      setlistajedzenia(response.data)
    })
  },[])
  const dodajrecord = () =>{
    //  console.log(nazwajedzenia + ilosc)
    Axios.post('http://localhost:3001/dodaj',{
      nazwajedzenia: nazwajedzenia,
      ilosc: ilosc
    })
  }
  const zaktualizuj = (id) =>{
    Axios.put('http://localhost:3001/zaktualizuj',{
      nowanazwa: nowanazwa,
      id:id
    })
  }
  const usun = (id) =>{
    Axios.delete(`http://localhost:3001/usun/${id}`)
  }

  return (
    <div className="App">
      <label>nazwa</label>
      <input type="text" onChange={(event)=>{
        setnazwajedzenia(event.target.value)
      }}/>
      <label>ile</label>
      <input type="number" onChange={(event)=>{
        setilosc(event.target.value)
      }}/>
      <button onClick={dodajrecord}>dodaj</button>
      <h1>Lista</h1>
      {listajedzenia.map((wartosc,key) =>{
        return <div key={key} className="prostokat">
          <h1>{wartosc.nazwa}</h1> <h1>{wartosc.ile}</h1>{" "}
          <input type="text" placeholder="nowa nazwa" onChange={
            (event)=>{
              setnowanazwa(event.target.value)
            } 
          }/>
          <button onClick={()=>zaktualizuj(wartosc._id)}>update</button>
          <button onClick={()=>usun(wartosc._id)}>delete</button>
        </div>
      
        }
      )
      }
    </div>
  );
}

export default App;
