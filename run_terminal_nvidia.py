#!/usr/bin/env python3
"""
CyberCore Reactor Terminal — Dedicated NVIDIA GPU Hardware-Accelerated Runner
PyQt6 QtWebEngine configured for Linux Wayland & NVIDIA Discrete GPU Offload.
Disables system background repainting to eliminate widget blinking.
"""

import os
import sys

# 1. Force XWayland (xcb) to eliminate dual-GPU DMA-BUF buffer blinking between AMD display and NVIDIA dGPU
os.environ["QT_QPA_PLATFORM"] = "xcb"

# 2. Force NVIDIA PRIME Render Offload to discrete GPU (RTX 3050)
os.environ["__NV_PRIME_RENDER_OFFLOAD"] = "1"
os.environ["__GLX_VENDOR_LIBRARY_NAME"] = "nvidia"
os.environ["__VK_LAYER_NV_optimus"] = "NVIDIA_only"

# 3. Stable, High-Performance GPU Rasterization Flags
os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = (
    "--enable-gpu-rasterization "
    "--enable-zero-copy "
    "--ignore-gpu-blocklist "
    "--disable-gpu-sandbox "
    "--enable-accelerated-2d-canvas "
    "--disable-gpu-driver-bug-workarounds"
)

from PyQt6.QtCore import QCoreApplication, Qt, QUrl
from PyQt6.QtWidgets import QApplication, QMainWindow
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebEngineCore import QWebEngineSettings, QWebEngineProfile


class CyberCoreWindow(QMainWindow):
    def __init__(self, target_url="http://localhost:3000/"):
        super().__init__()
        self.setWindowTitle("CyberCore Reactor Terminal // NVIDIA RTX 3050")
        self.resize(1600, 900)
        self.setStyleSheet("background-color: #000000;")

        # Prevent Qt window repaint double-buffering blink
        self.setAttribute(Qt.WidgetAttribute.WA_OpaquePaintEvent, True)
        self.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)

        # Set persistent profile for persistent storage & localStorage
        storage_path = os.path.expanduser("~/.local/share/cybercore-reactor-terminal")
        os.makedirs(storage_path, exist_ok=True)
        profile = QWebEngineProfile.defaultProfile()
        profile.setPersistentStoragePath(storage_path)

        # Initialize WebEngine View
        self.browser = QWebEngineView(self)
        self.browser.setAttribute(Qt.WidgetAttribute.WA_OpaquePaintEvent, True)
        self.browser.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)
        self.setCentralWidget(self.browser)

        # High-Performance WebEngine Settings
        settings = self.browser.settings()
        settings.setAttribute(QWebEngineSettings.WebAttribute.Accelerated2dCanvasEnabled, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.WebGLEnabled, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.JavascriptCanAccessClipboard, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.PlaybackRequiresUserGesture, False)

        # Load Local React App URL
        self.browser.setUrl(QUrl(target_url))

    def keyPressEvent(self, event):
        if event.key() == Qt.Key.Key_F11:
            if self.isFullScreen():
                self.showNormal()
            else:
                self.showFullScreen()
        elif event.key() == Qt.Key.Key_Escape:
            if self.isFullScreen():
                self.showNormal()
        else:
            super().keyPressEvent(event)


def main():
    QCoreApplication.setAttribute(Qt.ApplicationAttribute.AA_ShareOpenGLContexts, True)
    app = QApplication(sys.argv)
    app.setApplicationName("CyberCore Reactor Terminal")

    target_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000/"
    window = CyberCoreWindow(target_url)
    window.show()

    sys.exit(app.exec())


if __name__ == "__main__":
    main()
