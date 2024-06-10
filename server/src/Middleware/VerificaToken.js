const jwt = require('jsonwebtoken');

 const  verificarToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token.slice(7), process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    } else {
      // Token válido, pode avançar para a próxima rota
      req.userId = decodedToken.userId;
      next();
    }
  });
}


module.exports = verificarToken
