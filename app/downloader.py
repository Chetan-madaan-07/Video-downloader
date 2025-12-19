import yt_dlp
import os
import uuid

DOWNLOAD_DIR = "/tmp"  # 🔥 Render-safe directory

def download_video(url, format_choice):
    try:
        unique_id = str(uuid.uuid4())

        # Default options (NO ffmpeg)
        ydl_opts = {
            "outtmpl": f"{DOWNLOAD_DIR}/{unique_id}.%(ext)s",
            "noplaylist": True,
            "quiet": True,
        }

        # ⚠️ FFmpeg-free formats only
        if format_choice == "720p":
            ydl_opts["format"] = "best[height<=720]"
        elif format_choice == "480p":
            ydl_opts["format"] = "best[height<=480]"
        else:
            ydl_opts["format"] = "best"

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            file_path = ydl.prepare_filename(info)

        return True, file_path

    except Exception as e:
        print("🔥 DOWNLOAD ERROR:", e)
        return False, None







