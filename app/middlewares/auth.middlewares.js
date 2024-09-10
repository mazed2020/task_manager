import {TokenDecode,tokenEncode} from "../utility/token.utility.js";

export default (req,res,next)=> {
     try{
          const token = req.headers['token'];
          // console.log(token);
          const decodetoken=TokenDecode(token);
          if(!decodetoken){
               res.status(401).send({message:"No token found"});
          }
          const email=decodetoken.email;
          const user_id=decodetoken.user_id;
          req.headers.email=email;
          req.headers.user_id=user_id;
          next();

     }catch(e){
          res.status(400).send({message:e.message})
     }
}