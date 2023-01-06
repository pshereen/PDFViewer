import Api from './Api'

export default({
    dowlnloadfile(){
        return Api().get('downloadfile');
    }
}) 
 
// FileService.openfolder({
//     foldername:"public"
// })