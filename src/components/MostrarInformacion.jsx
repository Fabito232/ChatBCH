import { useEffect, useState } from 'react';
import { leerExcel } from './leerExcel';
import { procesarDatos } from '../data/procesarDatos';

function MostrarInformacion() {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await leerExcel('/base_de_conocimiento/Mortalidad_por_Semana_del_Covid_19.xlsx');

      if (jsonData) {
        const { processedData, countryList } = procesarDatos(jsonData);
        setData(processedData);
        setCountries(countryList);
        console.log('Datos procesados:', processedData);
        console.log('Lista de países:', countryList);
      }
    };

    fetchData();
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSearch = () => {
    const regex = /semana (\d+) en el país de ([\w\s]+) por el Covid 19/i;
    const match = question.match(regex);

    if (match) {
      const week = `semana ${match[1]}`;
      const country = match[2].trim();

      if (data[week] && data[week][country]) {
        setAnswer(`En el año 2023 en la ${week}, murieron ${data[week][country]} personas en el país de ${country} por el Covid 19.`);
      } else {
        setAnswer('No se encontraron datos para la semana o el país especificado.');
      }
    } else {
      setAnswer('No entendí la pregunta. Por favor, asegúrate de que esté en el formato correcto.');
    }
  };

  return (
    <div>
      <h1>Datos de Mortalidad por Semana del Covid-19</h1>
      <div>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Pregunta"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {answer !== null && <div>Respuesta: {answer}</div>}
    </div>
  );
}

export default MostrarInformacion;