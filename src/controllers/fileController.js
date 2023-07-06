import File from '../models/file.model.js';


export const getFiles = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const files = await File.find();

    // Enviar una respuesta al cliente
    res.status(200).json(files);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener los usuarios' });
  }
};

export const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const File = await File.findById(id);
    if (!File) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Enviar una respuesta al cliente
    res.status(200).json(File);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener el usuario' });
  }
};

export const createFile = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    // Crear un nuevo usuario en la base de datos
    const File = new File({ usuario, password });
    await File.save();

    // Enviar una respuesta al cliente
    res.status(201).json(File);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al crear el usuario' });
  }
};

export const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, password } = req.body;

    // Buscar un usuario por su ID en la base de datos
    const File = await File.findById(id);
    if (!File) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar el correo electrónico y la contraseña del usuario
    if (usuario) File.usuario = usuario;
    if (password) File.password = await bcrypt.hash(password, 10);
    await File.save();

    // Enviar una respuesta al cliente
    res.status(200).json(File);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el usuario' });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const File = await File.findById(id);
    if (!File) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar el usuario de la base de datos
    await File.deleteOne();

    // Enviar una respuesta al cliente
    res.status(200).json(File);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar el usuario' });
  }
};