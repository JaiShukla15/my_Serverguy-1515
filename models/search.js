const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const SearchSchema=new Schema({
gname:{
    type:String
},
gurl:{
    type:String
},
lused:{
    type:String
}
});
const Search=mongoose.model('search',SearchSchema);
module.exports=Search;