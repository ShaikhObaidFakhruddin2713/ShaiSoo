const admin = (req,res,next)=> { 
    if (req.user && req.user.role === 'admin'){
        next();
    }
    else{
        res.status(403).json({message:'not authorized as an admin malik only'})
    }   
};
module.exports = {admin};
