const TodoListModel = require("../models/TodoListModel");

exports.CreateTodo=(req,res)=>{

    let reqBody=req.body;
    let TodoSubject=reqBody['TodoSubject'];
    let TodoDescription=reqBody['TodoDescription'];
    let UserName=req.headers['username'];
    let TodoStatus="New";
    let TodoCreateDate=Date.now();
    let TodoUpdateDate=Date.now();

    let PostBody={
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate
    }

    TodoListModel.create(PostBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}

exports.SelectTodo=(req,res)=>{

    let UserName=req.headers['username'];

    TodoListModel.find({UserName:UserName},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.UpdateTodo=(req,res)=>{

    let TodoSubject=req.body['TodoSubject'];
    let TodoDescription=req.body['TodoDescription'];
    let _id=req.body['_id'];
    let TodoUpdateDate=Date.now();

    let PostBody={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate
    }

    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.UpdateStatusTodo=(req,res)=>{

    let TodoStatus=req.body['TodoStatus'];
    let _id=req.body['_id'];
    let TodoUpdateDate=Date.now();

    let PostBody={
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate
    }

    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.RemoveTodo=(req,res)=>{

    let _id=req.body['_id'];

    TodoListModel.remove({_id:_id},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.SelectTodoByStatus=(req,res)=>{

    let UserName=req.headers['username'];
    let TodoStatus=req.body['TodoStatus'];

    TodoListModel.find({UserName:UserName,TodoStatus:TodoStatus},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.SelectTodoByDate=(req,res)=>{

    let UserName=req.headers['username'];
    let FormDate=req.body['FormDate'];
    let ToDate=req.body['ToDate'];

    TodoListModel.find({UserName:UserName,TodoCreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}