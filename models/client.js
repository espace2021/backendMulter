import mongoose from "mongoose"
const clientSchema=mongoose.Schema({
    nomcategorie:{ type: String, required: true,unique:true },
    imagecategorie :{ type: String, required: false }
    })
const Client = mongoose.model('Client', clientSchema);

export default Client

