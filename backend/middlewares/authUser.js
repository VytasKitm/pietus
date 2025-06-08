import jwt from 'jsonwebtoken'

async function authUser(req, res, next) {

      const auth = req.headers.authorization
      if(!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({message: "User not Authorized. Bad header"})
      }
      const token = auth.split(' ')

      try {
            const payload = jwt.verify(token[1], process.env.JWT_SECRET)
            req.user = {id: payload.id, status: payload.status}
            console.log("User auth payload:", payload)
            console.log(`User verified. (authUser.js). id: ${payload.id}. Status: ${payload.status}`)
            next()
      }
      catch(error) {
            error.status = 401
            next(error)
      }
}

export default authUser