const { mongoosePassword } = process.env

module.exports = {
    MongoURI:`mongodb+srv://cabiediger:${mongoosePassword}@cluster-esqmr.mongodb.net/test?retryWrites=true&w=majority`
}