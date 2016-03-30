import SimpleHTTPServer
import SocketServer
#https://docs.python.org/2/library/simplehttpserver.html
# call *********** python -m SimpleHTTPServer 8000 *********** to run this server.
PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
