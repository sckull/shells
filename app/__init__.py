from flask import Flask, make_response, Response
from string import Template
from pathlib import Path

app = Flask(__name__)

def shells(ip:str, port:str) -> str:

    template = Template(Path('shells.template').read_text())
    template = template.safe_substitute(host=ip, port=port)

    return template


@app.route("/<ip>:<port>", methods = ['GET']) # type -> ignore
def main(ip:str, port:str) -> Response:

    response = make_response(shells(ip, port))
    response.content_type = "text/plain"
    response.headers['server'] = "shells"

    print(f'Shell for: {ip}:{port}')

    return response


if __name__ == "__main__":
    app.run()