// middlewares/authenticateToken.js
import jwt from 'jsonwebtoken'; // Importa el módulo jwt para trabajar con tokens
import config from '../config.js'; // Importa la configuración del proyecto
import User from '../models/users.model.js'; // Importa el modelo de usuarios

const authenticateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization; // Obtiene el encabezado de autorización de la solicitud
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1]; // Extrae el token de acceso del encabezado
    if (!accessToken) {
      return res.status(401).json({ message: 'No se ha proporcionado un token de acceso' }); // Si no hay token de acceso, devuelve un error de autorización
    }

    const decodedToken = jwt.verify(accessToken, config.secretKey); // Verifica y decodifica el token de acceso utilizando la clave secreta
    const user = await User.findById(decodedToken.userId); // Busca al usuario correspondiente al ID contenido en el token decodificado
    if (!user) {
      return res.status(401).json({ message: 'Token de acceso no válido' }); // Si el usuario no existe, devuelve un error de autorización
    }

    req.user = user; // Almacena el objeto de usuario en el objeto de solicitud para su posterior uso
 
    next(); // Pasa al siguiente middleware o controlador
  } catch (error) {
    console.error(error); // Registra cualquier error en la consola
    res.status(500).json({ message: 'Ha ocurrido un error al autenticar el token de acceso' }); // Devuelve un error interno del servidor
  }
};

export default authenticateToken; // Exporta la función de middleware para su uso en otros archivos