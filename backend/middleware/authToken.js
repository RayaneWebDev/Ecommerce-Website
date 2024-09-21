const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try{
        const token = req.cookies?.token 

        if(!token){
            return res.status(200).json({
                message : "Please Login !",
                error : true,
                success : false
            })
        }
        // verify a token symmetric
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded) // bar

            if(err){
                console.log("error auth",err);
                
            }

            req.userId = decoded._id 

            next()
        });

        
        
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
            data : []
        })
    }

}

module.exports = authToken