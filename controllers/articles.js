import express from 'express';
import mongoose from 'mongoose';

import Article from '../models/article.js';

const router = express.Router();

export const getArticles = async (req, res) => { 
    try {
        const art = await Article.find().populate("categorieID").populate("scategorieID").exec();
         
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getArticlesbynom= async (req, res) => { 
    try {
        //const {designation,prix} = req.body
       const des= req.body.designation
       const pr= req.body.prix
        //const art = await Article.find({designation:des,prixAchat:pr}).populate("categorieID").populate("scategorieID").exec();

       const art = await Article.find().where('prixAchat').equals(pr).where('designation').equals(des).populate("categorieID").populate("scategorieID").exec();
         
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getArticlesbynompr= async (req, res) => { 
    try {
       const des= req.params.des
       const pr= req.params.prix
        //const art = await Article.find({designation:des,prixAchat:pr}).populate("categorieID").populate("scategorieID").exec();
        const art = await Article.find().where('prixAchat').equals(pr).where('designation').equals(des).populate("categorieID").populate("scategorieID").exec();
         
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
   export const getArtdes  =async (req, res) => { 
    try{
        const des= req.body.designation.toLowerCase()
       //const pr= req.body.prix
        
        const art = await Article.find()
        
       const products_result = art.filter(product => product.designation.toLowerCase().includes(des))
    
        if (products_result.length < 1) {
            return res.status(200).send('No products matched your search')
        }
        res.status(200).json(products_result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getArticleByID = async (req, res) => { 
    try {
      // const art = await Article.findById(req.params.id).populate("categorieID").populate("scategorieID").exec();
   const art = await Article.findById(req.params.id).exec();
       
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createArticle = async (req, res) => {
   const { reference, designation,prixAchat,prixVente,prixSolde,marque,qtestock,caracteristiques,categorieID,scategorieID} = req.body;
   
   const img= req.file && req.file.originalname.length > 0 ? req.file.originalname:"";
   const newArticle = new Article({reference: reference,designation: designation,prixAchat:prixAchat,prixVente:prixVente,prixSolde:prixSolde,marque:marque,qtestock:qtestock,caracteristiques:caracteristiques,imageartpetitf:img,imageartgrandf:[],categorieID:categorieID,scategorieID:scategorieID})

    try {
        await newArticle.save();
        const art = await Article.findById(newArticle._id).populate("categorieID").populate("scategorieID").exec();
        res.status(200).json(art );
    } catch (error) {
        console.log(error)
       res.status(409).json({ message: error.message });
      
    }
}

export const updateArticle= async (req, res) => {
    const { id } = req.params;
    
    const {reference, designation,prixAchat,prixVente,prixSolde,marque,qtestock,caracteristiques,categorieID,scategorieID} = req.body;
   
    const img= req.file && req.file.originalname.length > 0 ? req.file.originalname:"";
    const newArticle = new Article({_id : id,reference: reference,designation: designation,prixAchat:prixAchat,prixVente:prixVente,prixSolde:prixSolde,marque:marque,qtestock:qtestock,caracteristiques:caracteristiques,imageartpetitf:img,imageartgrandf:[],categorieID:categorieID,scategorieID:scategorieID})
     
   const art1= await Article.findByIdAndUpdate(id, newArticle);
   const art=  await Article.findById(art1._id).populate("categorieID").populate("scategorieID").exec();
    res.json(art);
}

export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`pas dearticle avec l'ID: ${id}`);

    const art=await Article.findByIdAndDelete(id);

    res.json({ message:  `Article supprimé` });
}
export default router;