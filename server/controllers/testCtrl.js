

const testRoute = (req, res, next) => {
    console.log(`It lives`)
    res.send('Alive')
    next()
}

module.exports = { testRoute }