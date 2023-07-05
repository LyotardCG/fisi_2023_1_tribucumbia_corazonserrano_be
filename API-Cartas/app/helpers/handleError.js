const httpError = (res, err) => {
    //console.log(err)
    res.status(err.statusCode)
    res.send({ error: err.message })
}

module.exports = { httpError }