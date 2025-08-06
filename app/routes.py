from flask import Blueprint, request, send_file, jsonify
from .downloader import download_video, get_progress  # get_progress added
import os

main = Blueprint('main', __name__)

@main.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data.get('url')
    format_choice = data.get('format')

    # Call downloader (progress hook inside downloader.py me already set hai)
    success, file_path = download_video(url, format_choice)

    if success and os.path.exists(file_path):
        filename = os.path.basename(file_path)
        return send_file(
            file_path,
            as_attachment=True,
            download_name=filename
        )
    else:
        return jsonify({"status": "error", "message": "Download failed"}), 500

@main.route('/progress', methods=['GET'])
def progress():
    return jsonify(get_progress())




