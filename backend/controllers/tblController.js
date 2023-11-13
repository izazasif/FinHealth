import TblModel from '../models/Tbl1.js'

class TblController {
    static getAllDoc = async(req,res) => {
        try{
            const result = await TblModel.find()
            res.send(result)
            console.log(result)
        }
        catch(err){
            console.log(error)
        }
    }
}

export  default TblController 