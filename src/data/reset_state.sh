#!/bin/bash

# cd current directory
cd "$(dirname "$0")"

# remove all files ends with .json
rm -f *.json

# create blank files
filenames=("user.json" "userdata.json")
for filename in "${filenames[@]}"
do 
    echo "{}" > "$filename"
done

echo "State reset success"