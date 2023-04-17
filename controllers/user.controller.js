import User from '../models/user.js';
import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
        const{nom,email,password,avatar,role}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);
        const newUser=new User({
                    nom:nom,
                    email:email,
                    password:hash,
                    avatar:avatar,
                    role:role
                    });
      
     try {
         await newUser.save();
 
         res.status(201).json(newUser );
     } catch (error) {
         res.status(409).json({ message: error.message });
     }
 }

export const getusers=async(req,res)=>{
  try {
        
    const user = await User.find().select('-password');
             
    res.status(200).json(user);
    
 } catch (error) {
     res.status(404).json({ message: error.message });
 }
}

const generateAccessToken=(user) =>{
  return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });

}


export const getuserBYEmail = async (req, res) => { 
  try {
      //const{email,password}=req.body;
      const email= decodeURIComponent(req.body.email);
      const password =decodeURIComponent(req.body.password);
      const user = await User.findOne({email});
     if(user==""){  res.status(401).send('utilisateur non existant');
      return} ;
     
      const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch) {res.status(400).json({msg:'mot de passe incorrect'})
     return}
   if(user.role!="Admin") throw Error('Accès authorisé sauf pour admin');
   
      const accessToken = generateAccessToken(user);

      const refreshToken = generateRefreshToken(user);

     
      console.log("backen token " + accessToken)
     res.status(200).json({ 
      accessToken,
      user,
     
    })
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getuserBYEmailClient = async (req, res) => { 
  try {
      //const{email,password}=req.body;
      const email= decodeURIComponent(req.body.email);
      const password =decodeURIComponent(req.body.password);
      const user = await User.findOne({email});
     if(user==""){  res.status(401).send('utilisateur non existant');
      return} ;
     
      const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch) {res.status(400).json({msg:'mot de passe incorrect'})
     return}
   
        
     res.status(200).json({ 
      user,
     
    })
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

  export const getuserBYEmailUser = async (req, res) => { 
    try {
        const{email,password}=req.body;
        const user = await User.findOne({email});
       if(!user){  res.status(400).send('utilisateur non existant');
        return} ;

        const isMatch=await bcrypt.compare(password,user.password);
      
       if(!isMatch) {res.status(400).json({msg:'mot de passe incorrect'})
       return
      }
         
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
       res.status(200).json({
        accessToken,
        refreshToken
      })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// Refresh
function generateRefreshToken(user) {
  return jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3600s' });
}

export const RefreshToken = async (req, res) => {  
  try {
      const{email,password}=req.body;
      const user = await User.findOne({email});
     if(user==""){  res.status(404).send('utilisateur non existant');
      return} ;
      const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch) {res.status(400).json({msg:'mot de passe incorrect'})
       return} ;

      const refreshedToken = generateAccessToken(user);
      res.status(200).json({
             accessToken: refreshedToken,
          })
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

};

export const getUserByID = async (req, res) => {

  try {

      const cat = await User.findById(req.params.id);

     

      res.status(200).json(cat);

  } catch (error) {

      res.status(404).json({ message: error.message });

  }

}



export const updateUser= async (req, res) => {

  const { id } = req.params;

  const { nom, email, password} = req.body;

 

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`pas de user avec un id: ${id}`);



  const us1 = { nom:nom,email:email,password:password ,_id: id };



  await User.findByIdAndUpdate(id, us1);



  res.json(us1);

}



export const deleteUser = async (req, res) => {

  const { id } = req.params;



  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`pas de user avec l'ID: ${id}`);



  await User.findByIdAndDelete(id);



  res.json({ message: "user deleted successfully." });

}

