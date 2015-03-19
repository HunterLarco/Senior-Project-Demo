from google.appengine.ext.webapp import template
import webapp2
import os


class MainHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), '3dtest.html')
    self.response.out.write(template.render(path, template_values))


class MobileHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'mobile.html')
    self.response.out.write(template.render(path, template_values))
  

app = webapp2.WSGIApplication([
                ('/mobile/?', MobileHandler),
                ('/.*', MainHandler)
              ], debug=True)