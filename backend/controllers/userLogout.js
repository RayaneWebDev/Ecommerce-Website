async function userLogout(req,res) {
    try{
        res.clearCookie("token")

        res.json({
            message : "Logout successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : error.message || error,
            error : true ,
            success : false
        })
    }
}

module.exports = userLogout