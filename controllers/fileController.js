import File from '../models/file.model.js';


export const getFiles = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const files = await File.find();

    // Enviar una respuesta al cliente
    res.status(200).json(files);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener los files' });
  }
};

export const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'File no encontrado' });
    }

    // Enviar una respuesta al cliente
    res.status(200).json(File);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener el file' });
  }
};

export const createFile = async (req, res) => {
  try {
    const { nombre, midios, lang } = req.body;

    // Crear un nuevo archivo en la base de datos
    const file = new File({ nombre, midios, lang });
    await file.save();

    // Enviar una respuesta al cliente
    res.status(201).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al crear el archivo' });
  }
};

export const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, midios } = req.body;

    // Buscar un archivo por su ID en la base de datos
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Actualizar el nombre y midios del archivo
    if (nombre) file.nombre = nombre;
    if (midios) file.midios = midios;
    if (lang) file.lang = lang;
    await file.save();

    // Enviar una respuesta al cliente
    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el archivo' });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un archivo por su ID en la base de datos
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Eliminar el archivo de la base de datos
    await file.deleteOne();

    // Enviar una respuesta al cliente
    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar el archivo' });
  }
};

export const deleteFileByTimestamp = async (req, res) => {
  try {
    const timestamp = 1634043371000;

    // Encuentra y elimina todos los archivos con createdAt anterior al timestamp
    const deletedFiles = await File.deleteMany({ createdAt: { $lt: new Date(timestamp) } });

    // Verifica si se eliminaron archivos
    if (deletedFiles.deletedCount === 0) {
      return res.status(404).json({ message: 'No se encontraron archivos para eliminar antes del timestamp proporcionado' });
    }

    res.status(200).json({ message: 'Archivos eliminados con éxito', deletedCount: deletedFiles.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar archivos antes del timestamp' });
  }
};