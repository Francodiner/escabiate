import "./App.css";
import { useState } from "react";

function App() {

  const [tragos, setTragos] = useState([])
  const [tragoABuscar, setTragoABuscar] = useState()

  const handleClick = async () => {

    /* CONEXION CON API - FUNCION */

    let solicitarTragos = async (trago) => {

      try {
        console.log('Enseguida vengo con ustedes');

        const respuestaDelMozo = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${trago}`)

        const bodyRespuestaDelMozo = respuestaDelMozo.json()

        return bodyRespuestaDelMozo
      } catch (error) {
        console.log('Error: ', error)
      }

    }

    const misTragos = await solicitarTragos(tragoABuscar)

    setTragos(misTragos.drinks)

    console.log(misTragos)

  }

  return (
    <div className="App">
      <title>Diner S.A</title>
      <header className="App-header">
        <h1>Tragos</h1>
        <input value={tragoABuscar} onChange={(e) => setTragoABuscar(e.target.value)} />
        <button onClick={handleClick}>Pedir Trago</button>
        {
          tragos.length > 0 ? (tragos.map(trago =>
          (
            <p>{trago.strDrink}</p>
          ))) :
            (
              <p>Todavia no tengo trago</p>
            )
        }
      </header>
    </div>
  );
}

export default App;
