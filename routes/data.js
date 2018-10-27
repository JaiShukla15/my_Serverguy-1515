const SearchData=require('../models/search');
function all(mdata)
{
  var myData=new SearchData({
    data:mdata
  });
  myData.save().then(()=>{
   console.log("Saved Successfully");
  }).catch(e=>console.log("cannot Save data"));
}
module.exports=all;