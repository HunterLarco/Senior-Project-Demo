from google.appengine.ext.webapp import template
import webapp2
import os


class MainHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'controller.html')
    self.response.out.write(template.render(path, template_values))


class PresentationHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'presentation.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
                ('/presentation/?', PresentationHandler),
                ('/controller/?', MainHandler)
              ], debug=True)