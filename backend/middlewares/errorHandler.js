function errorHandler(err, req, res, next) {

      const status = err?.status || 500
      const message = err?.message || "No info"

      res.status(status).json({
            error: {
                  status,
                  message
            }
      })
}

export default errorHandler