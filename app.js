
const express=require('express');
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
var methods=require('./methods.js');

const app=express();

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title:'Cloud360 API',
            version:'1.0.0',
            description:"Cloud360 is a simple app where users can create topics and add comments to topics",
        }
        
    },
    apis:['app.js']
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(express.json());

//redirect to swagger api docs 
app.get('/', function(req, res) {
  res.redirect('/api-docs');
 });


//get all topics
app.get('/topic',(req,res)=>{

   methods.getTopics(res);

});


//get comments of a topic id
app.get('/topic/:topicid',(req,res)=>{
  

     methods.getTopic(req.params.topicid,res);

});


//create topic 
app.post('/topic',(req,res)=>{

    var topicName=req.body.name;
    if(topicName==undefined){
      res.status(400).send('invalid input, object invalid')
    }
    else{
      methods.addTopic(topicName,res);
    }
    
});



//add comments to topic
app.post('/topic/:topicid/comments',(req,res)=>{

  var comment = req.body.comment;

  if(comment == undefined)
  {
    res.status(400).send('invalid input, object invalid');
  }
  else
  {
    methods.addComments(req.params.topicid,comment,res);
  }

    
});



//change topic name
app.post('/topic/:topicid',(req,res)=>{

  let topicName=req.body.name;
  if(topicName==undefined)
  {
    res.status(400).send('invalid input, object invalid')
  }
  else
  {
    methods.updateTopic(req.params.topicid,topicName,res);

  }
  
});


//js doc section for swagger documentation

/**
 * @swagger
 * /topic:
 *    get:
 *      description: Get all topics
 *      responses:
 *        200:
 *          description: search results all topics
 *          
 */



/**
 * @swagger
 * /topic/{topicid}:
 *    get:
 *      description: get a specific topic comments
 *      parameters:
 *        - in: path
 *          name: topicid
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Numeric ID of the topic to get
 *      responses:
 *        200:
 *          description: search results matching criteria
 *        400:
 *          description: bad input parameter
 *          
 */



/**
 * @swagger
 * /topic:
 *    post:
 *      description: create a topic
 *      parameters:
 *        - in: body
 *          name: name
 *          description: Topic name to create
 *    
 *          properties:
 *            name:
 *              type: string
 *              required: false
 *      responses:
 *        201:
 *          description: item created
 *        400:
 *          description: invalid input, object invalid
 *        409:
 *          description: an existing item already exists
 *          
 */








/**
 * @swagger
 * /topic/{topicid}/comments:
 *    post:
 *      description: add comment to topic
 *      parameters:
 *        - in: path
 *          name: topicid
 *          required: true
 *          description: Numeric ID of the topic to get
 *          schema:
 *            type: integer
 *            minimum: 1
 *            
 *        - in: body
 *          name: comment
 *          description: new comment for the topic
 *          properties:
 *             comment: 
 *                type: string
 *                required: false
 *      responses:
 *          201:
 *            description: comment added
 *          400:
 *            description: invalid input, object invalid
 * 
 * 
 */








/**
 * @swagger
 * /topic/{topicid}:
 *    post:
 *      description: Update a topic name in system
 *      parameters:
 *        - in: path
 *          name: topicid
 *          required: true
 *          schema:
 *            type: integer
 *            minimun: 1
 *          description: Numeric ID of the topic to get
 *        - in: body
 *          name: name
 *          description: New topic name to update
 * 
 *          properties:
 *            name:
 *              type: string
 *              required: false
 *          
 *      responses:
 *        201:
 *          description: item updated
 *        400:
 *          description: invalid input, object invalid
 *  
 */



app.listen(5000,()=>console.log('listening on port 5000'));
