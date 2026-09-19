#!/usr/bin/env bash
# CyberCore Reactor Terminal - Dedicated NVIDIA RTX 3050 (4GB VRAM) Launcher
# Forces isolated GPU process offloading directly to NVIDIA discrete graphics.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Ensure local Vite dev server is running on port 3000
if ! nc -z 127.0.0.1 3001 2>/dev/null; then
    echo "Starting local Vite server in background..."
    nohup npm run dev > /dev/null 2>&1 &
    sleep 2
fi

# 1. Explicit NVIDIA PRIME Render Offload to NVIDIA GeForce RTX 3050 (4GB VRAM)
export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia
export __VK_LAYER_NV_optimus=NVIDIA_only
export VK_LOADER_DRIVERS_SELECT=*nvidia*
export DRI_PRIME=pci-0000_01_00_0

# 2. Hardware Acceleration Flags for RTX 3050
GPU_FLAGS="--enable-gpu-rasterization --enable-zero-copy --ignore-gpu-blocklist --enable-accelerated-2d-canvas --disable-gpu-driver-bug-workarounds"

# 3. Dedicated profile directory to ensure a separate GPU process from any background browser
PROFILE_DIR="$HOME/.config/cybercore-nvidia-app"
mkdir -p "$PROFILE_DIR"

# Check if native PyQt6 NVIDIA Runner is preferred
if [ "$1" == "--native" ]; then
    exec /usr/bin/python3 "$DIR/run_terminal_nvidia.py"
fi

if which brave-browser >/dev/null 2>&1; then
    exec switcherooctl launch brave-browser --user-data-dir="$PROFILE_DIR" --app="http://localhost:3001/" $GPU_FLAGS "$@"
elif which google-chrome >/dev/null 2>&1; then
    exec switcherooctl launch google-chrome --user-data-dir="$PROFILE_DIR" --app="http://localhost:3001/" $GPU_FLAGS "$@"
elif which chromium >/dev/null 2>&1; then
    exec switcherooctl launch chromium --user-data-dir="$PROFILE_DIR" --app="http://localhost:3001/" $GPU_FLAGS "$@"
else
    # Dedicated Python PyQt6 QtWebEngine runner on NVIDIA RTX 3050
    exec /usr/bin/python3 "$DIR/run_terminal_nvidia.py"
fi
