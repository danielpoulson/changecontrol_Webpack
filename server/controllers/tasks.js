var Task = require('mongoose').model('Task');
var fs = require('fs');
var files = require('../controllers/files');
var login  = require('../config/login');

//TODO: LOW FUNC This all task get function only for change control only should by dynamic
// When add project functionality the get task function would need to be used for both.
exports.getTasks = function(req, res) {
    var status = req.params.status;

    Task
        .where('TKStat').lte(status)
        .where('SourceId').in([/^CC.*$/])
        .select({SourceId:1, TKName:1, TKTarg:1, TKStart:1, TKChamp:1, TKStat:1})
        .sort({TKTarg : 1})
        .exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getProjectTaskList = function(req, res) {
    Task.find({SourceId:req.params.id}, function(err, collection) {
        res.send(collection);
    });
};

exports.updateTask = function(req, res) {
    var query = {_id: req.params.id};
    Task.findOneAndUpdate(query, req.body, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};


exports.deleteTask = function(req, res) {
    var taskId = req.params.id;
    var taskTitle = '';
    var SourceId = '';
    var user = req.user.fullname;

    Task.findOne({_id:taskId}).exec(function(err, task) {
        taskTitle = task.TKName;
        SourceId = task.SourceId;

        Task.remove({_id:taskId}, function (err) {
            if (err) return handleError(err);
            res.status(200).send(taskId);
        });

        write_to_log("DELETED TASK - " + "(" + SourceId + " - " + taskTitle + ") by " + user);
    });



};

exports.createTask = function(req, res, next) {
    Task.create(req.body, function(err, task) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Task');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.status(200).send(task);
    });
};

exports.getTaskById = function(req, res) {
    Task.findById(req.params.id).exec(function(err, task) {
        res.send(task);
    });
};

exports.getTaskCount = function(req,res){
    Task.count({SourceId:req.params.id}, function(err, taskCount){
        res.send(taskCount.toString());
    });
};

exports.dumpTasks = function(req, res) {
    //var status = 2;
    var int = parseInt((Math.random()*1000000000),10);
    var file = '.././uploaded/tasks' + int + '.csv';
    var fileData = {};
    var newDate = new Date();



    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = 'tasks' + int;
    fileData.fsFileExt = 'csv';
    fileData.fsSource = req.body.fsSource;
    fileData.fsFilePath = 'tasks' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    Task.findAndStreamCsv({}, {SourceId:true, TKName:true, TKChamp:true, TKStart:true, TKTarg:true, TKStat:true, _id: 0})
        .pipe(fs.createWriteStream(file));

    console.log("Files have been created");

    res.sendStatus(200);



};

function write_to_log (write_data) {
    var fs = require("fs");
    var path = '.././logs/logs.txt';
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2)
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var dString = day + "/" + month + "/" + year;

    var write_data = "\r\n" + dString + " - " + write_data;

    fs.appendFile(path, write_data, function(error) {
         if (error) {
           console.error("write error:  " + error.message);
         } else {
           console.log("Successful Write to " + path);
         }
    });
}

function handleError(err){
    console.log(err);
};
