import * as XLSX from 'xlsx';

export const leerExcel = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log('Datos originales leídos:', jsonData); // Añadido para depuración
    return jsonData;
  } catch (error) {
    console.error('Error leyendo el archivo de Excel:', error);
    return null;
  }
};