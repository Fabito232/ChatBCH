export const procesarDatos = (jsonData) => {
    if (!jsonData || jsonData.length === 0) return { processedData: {}, countryList: [] };
  
    const datasetIndex = jsonData.findIndex((row) => Array.isArray(row) && row[0] === 'País');
    if (datasetIndex === -1) {
      console.error('No se encontró el índice del conjunto de datos.');
      return { processedData: {}, countryList: [] };
    }
  
    // Obtener las columnas de países
    const columns = jsonData[datasetIndex];
    if (!columns || columns.length === 0) {
      console.error('No se encontraron columnas de países.');
      return { processedData: {}, countryList: [] };
    }
  
    const countryList = columns.slice(1); // Obtener la lista de países
    // Eliminar filas innecesarias y convertir los datos a formato largo
    const data = jsonData.slice(datasetIndex + 1).filter((row) => Array.isArray(row) && row.length > 1);
  
    let processedData = {};
    for (let i = 0; i < data.length; i++) {
      const week = `semana ${i}`;
      if (!processedData[week]) {
        processedData[week] = {};
      }
      for (let j = 1; j < columns.length; j++) {
        if (data[i][j] && data[i][j] !== '..') {
          const country = columns[j].trim(); // Asegurarse de que los nombres de países no tengan espacios
          processedData[week][country] = parseInt(data[i][j], 10);
        }
      }
    }
  
    return { processedData, countryList };
  };