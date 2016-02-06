var router = module.exports = require('express').Router();
var login  = require('./login');
var changes = require('../controllers/changes');
var projects = require('../controllers/projects');
var tasks = require('../controllers/tasks');
var files = require('../controllers/files');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.././uploaded/')
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

var upload = multer({ storage: storage });

//--------- Changes--------------------

router.route('/api/changes/:status')
    .get(changes.getChanges);

router.post('/api/changes', changes.createChange);
router.put('/api/changelog/:id', changes.updateChangeComment);

// TODO: Get files and tasks that are associated with a change when download a change
// A change requires the associated tasks and files to be downloaded at the same time however
// currently these are all downloaded with seperate calls. At the application level the state of a change
// should be associated with the task and the files so changes to state are managed together.
router.route('/api/change/:id')
    .get(changes.getChangeById)
    .put(changes.updateChange);

router.post('/export/changes', changes.dumpChanges);

//--------- Changes--------------------


router.route('/api/projects/:status')
//    .all(console.log("chirps route"),
//        login.required
//})
    .get(projects.getProjects);


    //Projects
    router.post('/api/projects', projects.createProject);

  router.route('/api/project/:id')
    .get(projects.getProjectById)
	.put(projects.updateProject)
 	.post(projects.createProject);
  // app.delete('/api/project/:id', projects.deleteProject);

router.route('/api/projectList/:status')
//    .all(console.log("chirps route"),
//        login.required
//})
    .get(projects.getProjectList);

  //Task

  router.get('/api/project/tasks/:id', tasks.getProjectTaskList);
//  app.get('/api/tasks', tasks.getTasks);
  router.get('/api/alltasks/:status', tasks.getTasks);
  router.get('/api/task/:id', tasks.getTaskById);
  router.put('/api/task/:id', tasks.updateTask);
  router.post('/api/task', tasks.createTask);
  router.delete('/api/tasks/:id', tasks.deleteTask);
  router.post('/export/tasks', tasks.dumpTasks);

  router.get('/api/files/:files', files.getFiles);
  router.get('/api/files/:files', files.getFiles);
  router.get('/api/filecount/:id', files.getFileCount);
  router.put('/api/filebooked/:id', files.updateFileBook);

    //**********File function ***************
 router.get('/server/upload/:file', files.downloadFile);
 router.get('/server/upload/:file', files.downloadFile);
  //app.post('/api/files', files.createFile);
  router.post('/server/upload', upload.any(), files.uploadFile);
  router.delete('/server/delete/:id', files.deletefile);
  //router.get('/api/exportcsv', deviations.dumpDeviation);
