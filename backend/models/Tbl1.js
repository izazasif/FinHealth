import mongoose from "mongoose";

const tbl1Schema = new mongoose.Schema({
    monthlyIncome:{ type:Number,require:true,trim:true},
    monthlyExpenses:{ type:Number,require:true,trim:true},
    totalDebts:{ type:Number,require:true,trim:true},
    totalAssets:{ type:Number,require:true,trim:true},
    financialHealthScore :{ type:Number,require:true,trim:true},
})

const TblModel = mongoose.model("tbl_1",tbl1Schema)

export default TblModel