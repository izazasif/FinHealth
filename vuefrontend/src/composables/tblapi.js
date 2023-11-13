import { ref } from 'vue'
import axios from  'axios'

export default function useTbl(){
    const url = "http://localhost:8000/api/tbl"
    const tblData = ref([])
    const error = ref (null)
    const getAlltbl = async () => {
        tblData.value = []
        error.value = null
        try {
            const res = await axios (url)
            tblData.value = res.data
    }
    catch(err){
        error.value = err
    }

 }
 
return {
    tblData,
    error,
    getAlltbl
}

}
