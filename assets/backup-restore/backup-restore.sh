mongodump --db meteor --collection patients --port 3001
mongodump --db meteor --collection Images --port 3001

mongorestore --port 3001 --db meteor pictures/meteor/

db.Images.find({}).forEach(function(e,i) {
    e.path = e.path.replace("/home/leonardo/Projects","/opt/redmine/repos");
    e.versions.original.path = e.versions.original.path.replace("/home/leonardo/Projects","/opt/redmine/repos");
    e._storagePath = e._storagePath.replace("/home/leonardo/Projects","/opt/redmine/repos");
    db.Images.save(e);
});