#!/usr/bin/python3

import flask
import flask_cors
import flask_socketio
import subprocess

app = flask.Flask(__name__,
                  static_url_path="",
                  static_folder='../static/dist',
                  template_folder='../static/dist')
socketio = flask_socketio.SocketIO(app)
#  flask_cors.CORS(app)

available_keys = []
available_keys_names = []

remotename = 'naeve'


@app.route('/')
def index():
    return flask.send_from_directory('../static/dist', 'index.html')


@app.route('/', methods=['POST'])
def send_ir_command():
    message = flask.request.json
    if type(message) is dict:
        commands = [message]
    elif type(message) is list:
        commands = message
    else:
        return 'bad json message structure', 400

    for command in commands:
        key_s = str(command['key'])
        if key_s in available_keys_names:
            subprocess.run(['irsend', '--device=/home/doublesack/.cache/lirc/lircd', 'SEND_ONCE',
                           remotename, 'KEY_' + key_s],
                           check=True, text=True)

    return '', 200


@app.route('/wake')
def wake():
    return flask.send_from_directory('../static/dist', 'index.html')


@app.route('/sleep')
def sleep():
    return flask.send_from_directory('../static/dist', 'index.html')


@app.route('/keys')
def get_keys():
    return flask.jsonify(available_keys), 200


if __name__ == '__main__':
    raw_keys_s = subprocess.run(['irsend', '--device=/home/doublesack/.cache/lirc/lircd', 'LIST', remotename, ''],
                                check=True, text=True,
                                stdout=subprocess.PIPE)
    keys_list = raw_keys_s.stdout.split('\n')
    for key_raw in keys_list:
        key_name = key_raw.split(' ')
        if len(key_name) > 1:
            key = {"id": int(key_name[0], 16),
                   "name": (key_name[1])[4:]}
            available_keys.append(key)
            available_keys_names.append(key['name'])

    #  print(available_keys)
    socketio.run(app, host='0.0.0.0', port=80, debug=False)
