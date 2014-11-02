
var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title:{type:String, required:'{PATH} is required!'},
    featured:{type:Boolean, required:'{PATH} is required!'},
    published:{type:Date, required:'{PATH} is required!'},
    tags:[String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses(){
    Course.find({}).exec(function(err, collection){
        if(collection.length===0){
            Course.create({title:"C# first steps intoducing",featured:true,published: new Date('1/1/2014'),tags:['C#']});
            Course.create({title:"C# finish guru secrets",featured:false,published: new Date('1/1/2014'),tags:['C#']});
            Course.create({title:"MongoDB secrets",featured:true,published: new Date('1/1/2015'),tags:['MongoDB','Databases']});
            Course.create({title:"Nodejs in sacrifice field",featured:false,published: new Date('1/1/2013'),tags:['web-server','programming','javascript']});
            Course.create({title:"PostgreSQL introducing",featured:true,published: new Date('1/1/2015'),tags:['PostgreSQL','Databases']});
            Course.create({title:"C# second steps intoducing",featured:false,published: new Date('1/1/2015'),tags:['C#']});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;