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


class PianoPlayerHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    # path = os.path.join(os.path.dirname(__file__), 'player.html')
    path = os.path.join(os.path.dirname(__file__), 'speechjammer.html')
    self.response.out.write(template.render(path, template_values))


class ColorsHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'demos/colors.html')
    self.response.out.write(template.render(path, template_values))


class GameHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'game.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
                ('/presentation/?', PresentationHandler),
                ('/controller/?', MainHandler),
                ('/player/?', PianoPlayerHandler),
                ('/demos/colors/?', ColorsHandler),
                ('/game/?', GameHandler)
              ], debug=True)