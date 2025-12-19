from flask import Blueprint, request, send_file, jsonify, render_template, after_this_request
from .downloader import download_video # get_progress added
import os
#route for main homepage
# File: app/routes.py
views = Blueprint('views', __name__, template_folder='templates', static_folder='static')
@views.route('/')
@views.route('/index')
def index(): 
    return render_template('index.html')
 
#route for homepage
@views.route('/login')
def login():
    return render_template('login.html')

main = Blueprint('main', __name__)

@main.route('/api/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data.get('url')
    format_choice = data.get('format')

    # Call downloader (progress hook inside downloader.py me already set hai)
    success, file_path = download_video(url, format_choice)

    if success and os.path.exists(file_path):
        filename = os.path.basename(file_path)
        @after_this_request
        def cleanup(response):
            try: 
                os.remove(file_path)
            except Exception as e:
                print(f"Error handling file: {e}")
                return response
        return send_file(
            file_path,
            as_attachment=True,
            download_name=filename
        )
    else:
        return jsonify({"status": "error", "message": "Download failed"}), 500




