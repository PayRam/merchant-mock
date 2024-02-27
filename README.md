# PayRam Merchant Mock

This is a simple mock server emulating Merchan't payment page. This uses PayRam server and payments.

## Usage
Run the Merchant Mock server from it's own folder like so:
```
node app.js
```
Merchant Mock server available at http://localhost:8080

To compile and create a docker image
```
docker build -t merchant-mock:v0.1 .
```

To create a docker container
```
docker run -d --name merchant-mock-v0.1 --network="host"  -p 8081:8081 merchant-mock:v0.1
