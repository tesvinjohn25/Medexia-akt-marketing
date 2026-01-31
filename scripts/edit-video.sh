#!/bin/bash
# Video Edit Script for Orlistat Case (The Orlistat Case, 01:16 duration)
# EDL: Reduce from 01:16 to ~55 seconds. Export at 15fps.
# 
# Step breakdown with timecodes:
# Step 1: 00:00 – 00:06 (Keep Normal) - Dashboard showing "Safe Pass" line
# Step 2: 00:06 – 00:08 (CUT) - Remove loading spinner entirely  
# Step 3: 00:08 – 00:18 (Speed Up 400%) - Fast forward: reading question, cursor flies to answer
# Step 4: 00:18 – 00:20 (Keep Normal) - Clicking Option C and Submit
# Step 5: 00:20 – 00:42 (Keep Normal) - The "Moat": Scrolling through explanation
# Step 6: 00:42 – 00:48 (CUT) - Remove delay between "Ask Tutor" click and answer
# Step 7: 00:48 – 01:03 (Keep Normal) - Scrolling through Tutor's NICE guidelines
# Step 8: 01:03 – 01:05 (CUT) - Remove blank screen transition
# Step 9: 01:05 – 01:09 (Speed Up 300%) - "Zip" motion: closing tutor to History tab
# Step 10: 01:09 – 01:12 (Speed Up 200%) - Click History tab, expand Learning Point card

set -e

INPUT="/Users/delta/clawd/work/Medexia-akt-marketing/public/demo/video/app-demo.mp4"
OUTPUT_DIR="/Users/delta/clawd/work/Medexia-akt-marketing/public/demo"
TEMP_DIR="/tmp/video_edit_$$"

mkdir -p "$TEMP_DIR"

echo "=== Extracting segments according to EDL ==="

# Step 1: 00:00 - 00:06 (Keep Normal) - 6 seconds
ffmpeg -y -i "$INPUT" -ss 00:00:00 -t 6 -vf "fps=15,scale=660:1432:flags=lanczos" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step1.mp4"

# Step 3 (from original 00:08-00:18): Speed Up 400% 
# Original 10s becomes 2.5s at 400% speed
ffmpeg -y -i "$INPUT" -ss 00:00:08 -t 10 -vf "fps=60,scale=660:1432:flags=lanczos,setpts=0.25*PTS" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step3.mp4"

# Step 4: 00:18 - 00:20 (Keep Normal) - 2 seconds
ffmpeg -y -i "$INPUT" -ss 00:00:18 -t 2 -vf "fps=15,scale=660:1432:flags=lanczos" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step4.mp4"

# Step 5: 00:20 - 00:42 (Keep Normal) - 22 seconds (The Moat - SYNC with scroll)
ffmpeg -y -i "$INPUT" -ss 00:00:20 -t 22 -vf "fps=15,scale=660:1432:flags=lanczos" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step5.mp4"

# Step 7: 00:48 - 01:03 (Keep Normal) - 15 seconds (Tutor response)
ffmpeg -y -i "$INPUT" -ss 00:00:48 -t 15 -vf "fps=15,scale=660:1432:flags=lanczos" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step7.mp4"

# Step 9 (from original 01:05-01:09): Speed Up 300%
# Original 4s becomes ~1.33s at 300% speed
ffmpeg -y -i "$INPUT" -ss 00:01:05 -t 4 -vf "fps=60,scale=660:1432:flags=lanczos,setpts=0.333*PTS" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step9.mp4"

# Step 10 (from original 01:09-01:12): Speed Up 200%
# Original 3s becomes 1.5s at 200% speed
ffmpeg -y -i "$INPUT" -ss 00:01:09 -t 3 -vf "fps=30,scale=660:1432:flags=lanczos,setpts=0.5*PTS" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -an "$TEMP_DIR/step10.mp4"

echo "=== Creating concat list ==="
cat > "$TEMP_DIR/concat.txt" << EOF
file 'step1.mp4'
file 'step3.mp4'
file 'step4.mp4'
file 'step5.mp4'
file 'step7.mp4'
file 'step9.mp4'
file 'step10.mp4'
EOF

echo "=== Concatenating segments ==="
ffmpeg -y -f concat -safe 0 -i "$TEMP_DIR/concat.txt" -c copy "$OUTPUT_DIR/app-demo-edited.mp4"

echo "=== Extracting frames at 15fps ==="
rm -rf "$OUTPUT_DIR/frames"
mkdir -p "$OUTPUT_DIR/frames"
ffmpeg -y -i "$OUTPUT_DIR/app-demo-edited.mp4" -vf "fps=15,scale=660:1432:flags=lanczos" -q:v 2 "$OUTPUT_DIR/frames/frame_%04d.jpg"

FRAME_COUNT=$(ls "$OUTPUT_DIR/frames/" | wc -l)
echo "=== Complete! Generated $FRAME_COUNT frames ==="
echo "=== Output video: $OUTPUT_DIR/app-demo-edited.mp4 ==="

# Cleanup
rm -rf "$TEMP_DIR"

echo "=== Duration check ==="
ffmpeg -i "$OUTPUT_DIR/app-demo-edited.mp4" 2>&1 | grep Duration
