import TblModel from '../models/Tbl1.js'

class SaveController {
    static saveData = async(req,res) => {
        try {
            const newData = req.body;
            const tbl1Instance = new TblModel(newData);
            const savedData = await tbl1Instance.save();
            res.status(201).json({ message: 'Data saved successfully', data: savedData });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
    }
}

export  default SaveController 
