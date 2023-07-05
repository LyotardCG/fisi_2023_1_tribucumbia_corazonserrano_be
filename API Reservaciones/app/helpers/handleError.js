const httpError = (res, err) => {
    res.status(err.statusCode)
    res.send({ error: err.message })
}

module.exports = {  httpError }