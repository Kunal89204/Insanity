const checkAdminRole = (req, res, next) => {
    const userRole = req.headers.role
    if (userRole !== 'admin') {
      return res.json({ error: 'Admin access required' })
    }
    next()
  }
  
  module.exports = checkAdminRole
  