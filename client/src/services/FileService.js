import Api from './Api'

export default({
    openfolder(foldername){
        return Api().post('openfolder', foldername)
    }
}) 
 
// FileService.openfolder({
//     foldername:"public"
// })