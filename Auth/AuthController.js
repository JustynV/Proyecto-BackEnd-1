const jwt = require("jsonwebtoken")
const secretKey = "secretsauce";

exports.cookiesJWT = (req,res) =>{
    const token = req.cookies.token
    try {
        const user = jwt.verify(token, secretKey)
        return user
    } catch (error) {
        return "Invalid"
    }
}