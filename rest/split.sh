#!/bin/bash

PATH_TO_VID="$1"
PIC_FOLDER="$2"
PATH_TO_AUDIO="$3"

echo "$PATH_TO_VID"
echo "$PIC_FOLDER"
echo "$PATH_TO_AUDIO"

ffmpeg -i "$PATH_TO_VID" -ab 160k -ac 2 -ar 44100 -vn "$PATH_TO_AUDIO" -r 10 -y small.avi

if [ ! -d "$PIC_FOLDER" ]; then
  mkdir "$PIC_FOLDER"
fi

ffmpeg -i small.avi -y "$PIC_FOLDER"/pic%d.jpg

rm small.avi
