from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes import views, main
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(main, url_prefix='/api')

    return app

#  THIS LINE IS IMPORTANT
app = create_app()




