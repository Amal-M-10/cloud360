var sqlite3 = require('sqlite3').verbose();
const database = "db.sqlite";

let db = new sqlite3.Database(database, (err) => {

    if (err) 
    {
      console.error(err.message)
      throw err
    }
    else
    {
        //set foreign key constrain on 
        db.get("PRAGMA foreign_keys = ON");

        console.log('Connected to the SQLite database.');

        //create table for topics with topicid and topic name
        db.run('CREATE TABLE topics(\
                id INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL,\
                name VARCHAR(150) UNIQUE NOT NULL\
          )',(err)=>{
            if(err)
            {
              console.log('table exist');
            }
            else
            {
              console.log('table created');
            }
          });

       //create table for storing comments with a foreign key reference to topicid in topics
       db.run('CREATE TABLE comments(\
              id INTEGER  NOT NULL,\
              comment TEXT  NOT NULL,\
              FOREIGN KEY(id) REFERENCES topics(id)\
          )',(err)=>{
            if(err)
            {
              console.log('table exist');
            }
            else
            {
              console.log('table created');
            }
          });  
    }
         

});


module.exports = db
