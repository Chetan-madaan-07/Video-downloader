import yt_dlp
import os
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
DOWNLOAD_DIR = os.path.join(APP_ROOT, '..' , 'temp_downloads')

# Agar downloads folder exist nahi karta, toh bana do
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)


def download_video(url, format_choice):
    """
    url: video link (string)
    format_choice: mp4 / mp3 / 720p / 480p
    Returns: (success, file_path)
    """
    try:

        # yt-dlp options
        ydl_opts = {
            'outtmpl': f'{DOWNLOAD_DIR}/%(title)s.%(ext)s',
            'merge_output_format': 'mp4',
            'noplaylist': True,
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
        return False, None






