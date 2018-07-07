from tornado.websocket import WebSocketHandler
from tornado.web import Application
from tornado.ioloop import IOLoop
import sys
import time

clients = list()

class EchoWebSocket(WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print("WebSocket opened")
        clients.append(self)
        self.push_message('2+你好')

    def on_close(self):
        print("WebSocket closed")
        sys.exit()

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

