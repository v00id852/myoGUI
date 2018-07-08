from tornado.websocket import WebSocketHandler
from tornado.web import Application
from tornado.ioloop import IOLoop
import sys
import json

clients = list()

class EchoWebSocket(WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print("WebSocket opened")
        clients.append(self)
        self.push_message(json.dumps({"type": "myo", "data": "Test"}))
        self.push_message(json.dumps({"type": "voice", "data": "Test"}))
        self.push_message(json.dumps({"type": "incomplete", "data": "Test"}))

    def on_close(self):
        print("WebSocket closed")
        clients.remove(self)

    def on_message(self, msg):
        self.push_message(msg)

    @classmethod
    def push_message(cls, msg):
        for item in clients:
            item.write_message(msg)


class Application(Application):
    def __init__(self):
        handles = [
            (r"/", EchoWebSocket)
        ]
        super(Application, self).__init__(handles)


def main():
    app = Application()
    app.listen(2233)
    IOLoop.current().start()


if __name__ == '__main__':
    main()

