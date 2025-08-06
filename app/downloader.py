import yt_dlp
import os

# PC ka default Downloads folder
DOWNLOAD_DIR = os.path.join(os.path.expanduser("~"), "Downloads")

# Agar downloads folder exist nahi karta, toh bana do
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)

# Global progress data store
progress_data = {
    "status": "idle",       # idle / downloading / finished / error
    "percentage": 0         # 0 - 100
}

# Default progress hook
def progress_hook(d):
    if d['status'] == 'downloading':
        total_bytes = d.get('total_bytes', 0)
        downloaded_bytes = d.get('downloaded_bytes', 0)
        if total_bytes > 0:
            progress = int(downloaded_bytes * 100 / total_bytes)
            progress_data["status"] = "downloading"
            progress_data["percentage"] = progress
    elif d['status'] == 'finished':
        progress_data["status"] = "finished"
        progress_data["percentage"] = 100


def download_video(url, format_choice):
    """
    url: video link (string)
    format_choice: mp4 / mp3 / 720p / 480p
    Returns: (success, file_path)
    """
    try:
        # Download start hone se pehle reset karte hain progress
        progress_data["status"] = "downloading"
        progress_data["percentage"] = 0

        # yt-dlp options
        ydl_opts = {
            'outtmpl': f'{DOWNLOAD_DIR}/%(title)s.%(ext)s',
            'merge_output_format': 'mp4',
            'noplaylist': True,
            'progress_hooks': [progress_hook]  # progress track
        }

        # Format selection
        if format_choice == "mp3":
            ydl_opts.update({
                'format': 'bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
                'merge_output_format': 'mp3'
            })
        elif format_choice == "720p":
            ydl_opts.update({
                'format': 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/mp4'
            })
        elif format_choice == "480p":
            ydl_opts.update({
                'format': 'bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/mp4'
            })
        else:  # Default best MP4
            ydl_opts.update({
                'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4'
            })

        # Download process
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            file_path = ydl.prepare_filename(info)

        # Extension fix
        if format_choice == "mp3":
            file_path = os.path.splitext(file_path)[0] + ".mp3"
        else:
            file_path = os.path.splitext(file_path)[0] + ".mp4"

        return True, file_path

    except Exception as e:
        print("Error:", e)
        progress_data["status"] = "error"
        return False, None


# API ke liye progress return
def get_progress():
    return progress_data




