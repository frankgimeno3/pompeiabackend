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
    const { name, dios } = req.body;

    // Crear un nuevo archivo en la base de datos
    const file = new File({ name, dios });
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
    const { name, dios } = req.body;

    // Buscar un archivo por su ID en la base de datos
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Actualizar el nombre y dios del archivo
    if (name) file.name = name;
    if (dios) file.dios = dios;
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