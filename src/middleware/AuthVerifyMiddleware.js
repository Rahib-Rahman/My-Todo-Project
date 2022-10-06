var jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{

    let Token = req.headers['token-key']

    jwt.verify(Token,"SecretKey123",function(err,decoded){
        if(err){
            res.status(401).json({status:"unauthorized"})
        }
        else{
            //Get UserName from Decoded Token & Add with Request Header
            let username = decoded['data']['UserName'];
            req.headers.username = username
            next();
        }
    })

}