from flask import Blueprint, request, jsonify
from .downloader import download_video

main = Blueprint('main', __name__)
@main.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data.get('url')
    format_choice = data.get('format')

    success, file_path = download_video(url, format_choice)

    if success:
        return jsonify({"status": "success", "file_path": file_path})
    else:
        return jsonify({"status": "error", "message": "Download failed"}), 500
