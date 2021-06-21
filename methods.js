const db = require('./db.js');
var db1 = require('./db.js');

function getTopics(res){

    db.all('SELECT name,id FROM topics',[],(err,rows)=>{

        if(err){
            console.log(err);
        }
        else{
            res.status(200).json(rows);
        }
    });
}

 function getTopic(topicid,res){

    db.all('SELECT name,id FROM topics WHERE id=?',[topicid],(err,row)=>{
        
        if(err || row.length==0){

            res.status(400).send("bad input parameter");
        }
       else{

            db.all('SELECT comment as name,id FROM comments WHERE id=?',[topicid],(err,comments)=>{
                
                if(err){

                    res.status(400).send("bad input parameter");
                }
                else{
        
        
                    res.status(200).json({comments,name:row[0].name,id:row[0].id});
                }
            });

       }
    })

   

}

function addTopic(name,res){
   
    db.run('INSERT INTO topics (name) values\
    (?)',[name],(err)=>{

        if(err){
            console.log(err);
            res.status(409).send('an existing item already exists');
        }
        else{
            res.status(201).send('item created');
        }
    }
    );

}

 function addComments(topicid,comment,res){

    db.run('INSERT INTO comments values(?,?)',[topicid,comment],(err)=>{
        if(err){

            console.log(err);
            res.status(400).send('invalid input, object invalid');
        }
        else{

            res.status(201).send('comment added');
        }
    });

}

 function updateTopic(topicid,name,res){

    db.all('SELECT name,id FROM topics WHERE id=?',[topicid],(err,row)=>{
        
        if(err || row.length==0){

            res.status(400).send('invalid input, object invalid');
        }
        else{

            db.all('UPDATE topics SET name=? WHERE id=?',[name,topicid],(err)=>{
                if(err){

                    console.log(err);
                    res.status(400).send('invalid input, object invalid');
        
                }
                else{

                    res.status(201).send('item updated');
                }
            });  
        }
    });

}
   
        
       
       

module.exports.addComments=addComments;
module.exports.addTopic=addTopic;
module.exports.getTopic=getTopic;
module.exports.getTopics=getTopics;
module.exports.updateTopic=updateTopic;