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
    const { content } = req.body;

    // Crear un nuevo file en la base de datos
    const file = new File({ content });
    await file.save();

    // Enviar una respuesta al cliente
    res.status(201).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al crear el file' });
  }
};

export const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Buscar un usuario por su ID en la base de datos
    const File = await File.findById(id);
    if (!File) {
      return res.status(404).json({ message: 'File no encontrado' });
    }

    // Actualizar el correo electrónico y la contraseña del usuario
    if (usuario) File.usuario = usuario;
    if (password) File.password = await bcrypt.hash(password, 10);
    await File.save();

    // Enviar una respuesta al cliente
    res.status(200).json(File);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el file' });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'File no encontrado' });
    }

    // Eliminar el usuario de la base de datos
    await file.deleteOne();

    // Enviar una respuesta al cliente
    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar el file' });
  }
};