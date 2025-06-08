
function authAdmin(req, res, next) {
      const {id, status} = req.user
      console.log(`Authenticating admin: User id: ${id}, status: ${status}`)

      if (status === 'admin') {
            next()
      }
      else {
            res.status(403).json({authorization: false})  
      }
}

export default authAdmin