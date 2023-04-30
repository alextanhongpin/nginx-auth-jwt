# Nginx JavaScript

Run JavaScript in Nginx.


## Example

```bash
# Start the container
$ make up

$ curl localhost:8080/version
0.7.11%

$ curl localhost:8080/hello
Hello world!

$ curl localhost:8080/env

$ curl localhost:8080/static

# Sign a JWT token.
$ curl localhost:8080/jwt-sign

# Verify JWT token.
$ curl -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuZ2lueCIsInN1YiI6ImFsaWNlIiwiZm9vIjoxMjMsImJhciI6InFxIiwieHl6IjpmYWxzZSwiZXhwIjoxNjgyODYzODQzfQ.Rp8bhJru7W42YXAYk40H9XdYDsuDh_vovsOpyMtshfI' localhost:8080/jwt-verify
```



https://github.com/nginx/njs-examples#jwt
