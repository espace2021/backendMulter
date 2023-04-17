import express from 'express';

import  {auth} from '../middleware/auth.js';
import { getArticles, getArticleByID, createArticle, updateArticle, deleteArticle,getArticlesbynom,getArticlesbynompr,getArtdes } from '../controllers/articles.js';

//import multer from 'multer';

import uploadImg from "../middleware/uploadProvider.js"

const router = express.Router();
/**
 * @route   GET /api/articles
 * @desc    Get All articles
 * @access  Public
 */
router.get('/',getArticles);





router.get('/artnom/:des/:prix',getArticlesbynompr);


/**
 * @route   POST /api/article
 * @desc    Ajouter un article
 * @access  Public
 */
router.post('/', uploadImg.single("imageartpetitf"), createArticle);


/**
 * @route   GET /api/articles/:id
 * @desc    Renvoyer un article
 * @access  Public
 */




/**
 * @route   PUT /api/articles/:id
 * @desc    Modifier un article
 * @access  Public
 */
router.put('/:id', uploadImg.single("imageartpetitf"),updateArticle);


/**
 * @route  DELETE /api/articles/:id
 * @desc    Supprimer un article
 * @access  Public
 */
router.delete('/:id', deleteArticle);

router.get('/artnom',getArticlesbynom);
router.get("/artdes",getArtdes);
router.get('/:id', getArticleByID);
export default router;