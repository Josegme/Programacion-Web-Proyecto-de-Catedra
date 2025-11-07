import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { ContactoData } from '../shared/type';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta del archivo de datos
const DATA_FILE = path.join(__dirname, 'data', 'datos.json');

// Asegurar que existe el directorio data
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Asegurar que existe el archivo datos.json
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Función para validar email
function validarEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Endpoint para recibir datos del formulario
app.post('/api/contacto', (req: Request, res: Response) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Validaciones
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'El nombre es obligatorio' 
      });
    }

    if (!email || !validarEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'El email no es válido' 
      });
    }

    // Crear objeto de contacto
    const nuevoContacto: ContactoData = {
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: mensaje?.trim() || '',
      fecha: new Date().toISOString()
    };

    // Leer datos existentes
    const datosExistentes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    
    // Agregar nuevo contacto
    datosExistentes.push(nuevoContacto);
    
    // Guardar en archivo
    fs.writeFileSync(DATA_FILE, JSON.stringify(datosExistentes, null, 2));

    res.json({ 
      success: true, 
      message: 'Contacto guardado exitosamente',
      data: nuevoContacto
    });

  } catch (error) {
    console.error('Error al procesar contacto:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// Endpoint para obtener todos los contactos
app.get('/api/contactos', (req: Request, res: Response) => {
  try {
    const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json({ success: true, data: datos });
  } catch (error) {
    console.error('Error al leer contactos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al leer los datos' 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Datos guardados en: ${DATA_FILE}`);
});