from flask import Flask
from api.kickass.routes.kickass_routes import kickass_api

app = Flask(__name__)

# Add kickass api routes
app.register_blueprint(kickass_api)
