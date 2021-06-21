# Cloud360
## Default Configuration

```
Host: localhost
Port: 5000
```
**APIs**
```
GET /topics
GET /topics/{topicid}
POST /topic
POST /topic/{topicid}
POST /topic/{topicid}/comments
```

## Installation
run npm install to install all dependencies
```bash
npm install 
```
## Docker configuration
```bash
docker build -t <image name> <path to dockerfile>
```
```bash
docker run --publish <port>:5000 <image>  
```

