# File: app/__init__.py

from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Dono blueprints ko import karo
    from .routes import views, main

    # Dono blueprints ko app ke saath register karo
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(main, url_prefix='/api') # API routes ko /api/ ke andar daalna acchi practice hai

    return app



