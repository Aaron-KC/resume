const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization
  console.log(auth)

  if(!auth) return res.status(401).json({message: 'Unauthorized Access!'})

  if(auth.startsWith("Bearer ")) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) return res.status(401).json({message: 'User not logged In or authentication error'})

      req.user = decoded
      next();
    })
  } else {
    return res.status(401).json({message: 'Invalid token format'})
  }
  
}