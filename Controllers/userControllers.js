const users = require("../models/usersSchema");
const moment = require("moment")

// create users

exports.userpost = async(req,res)=>{
    // console.log(req.body);
    // We will get the  value we are passing on body
    const {firstname,email,mobile,gender,status}=req.body;
    if(!firstname || !email || !mobile || !gender || !status){
        res.status(400).json({error: "All Input is required"});
    }
    try{
        const preuser = await users.findOne({email:email});
        if(preuser){
            res.status(400).json({error: "This user already exist in our database"});
        }else{
            const dateCreate = moment(new Date()).format("YYY-MM-DD hh:mm:ss");

            const userData = new users({
                firstname,email,mobile,gender,status , datecreated:dateCreate
            });
            await userData.save();
            res.status(200).json(userData);
        }
    }catch(error){
        res.status(400).json(error);
        console.log("catch block error");
    }

}

// get all users

exports.getUsers = async(req,res) =>{
    const search = req.query.search || "";
    const status = req.query.status || "";
    const gender = req.query.gender || "";
    const sort = req.query.sort || "";
    const page = req.query.page || "";
    const ITEM_PERPAGE = req.query.iteams ||4;
    // console.log("search",search);
    // console.log("gender",gender);
    const query={
        firstname:{$regex:search,$options:"i"}
    }
    if(status!=="All"){
        query.status =status
    }
    if(gender!=="All"){
        query.gender = gender
    }
    // console.log("query",query);
    try{
           // skip
           const skip =(page -1)*ITEM_PERPAGE 
        //    2-1=1 1*4 =4

        // count Document
        const count = await users.countDocuments(query);

       const usersData = await users.find(query)
       .sort({datecreated:sort=="new"?-1:1})
       .limit(ITEM_PERPAGE)
       .skip(skip);
    //    res.status(200).json(usersData)

       const pageCount =Math.ceil(count/ITEM_PERPAGE); 
       res.status(200).json({
        pagination:{
            count:pageCount
        },
        usersData
       });
    }catch(error){
        // res.status(400).json(error);
        // console.log("catch block error");
        console.error("Error:", error);
        res.status(400).json({ error: "An error occurred" });
    }
}

// get single user

exports.getSingleUser = async(req,res)=>{
    const {id} = req.params;
    try{
         const singleUserData = await  users.findOne({_id:id});
         res.status(200).json(singleUserData);
    }catch(error){
           res.status(400).json(error);
           console.log("catch block error");
    }
}

// delete user
exports.deleteuser = async(req,res)=>{
    const{id}=req.params;
    try {
        const deleteUserData = await users.findByIdAndDelete({_id:id});
        res.status(200).json(deleteUserData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error");
    }
}

// Update user

exports.updateUser = async(req,res)=>{
    const{id}=req.params;
    const {firstname,email,mobile,gender,status}=req.body;
    try {
       const  dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
       const updateUserdata = await users.findByIdAndUpdate({_id:id},{
        firstname,email,mobile,gender,status , dateUpdated:dateUpdate
       },{new:true});

       await updateUserdata.save();

       res.status(200).json(updateUserdata);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error");
    }
}