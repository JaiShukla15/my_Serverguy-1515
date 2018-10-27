const mongoosse=require('mongoose');
const Schema=mongoose.Schema;
const SeachSchema=new Schema({
data:{
    type:String
}

});
const SearchData=mongoose.model('searchData',SeachSchema);
module.exports=SearchData;