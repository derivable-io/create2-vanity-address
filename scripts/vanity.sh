#!/bin/bash

b=$1
s=${2:-0}
n=${3:-$(nproc)}
c=${4:-1000000}

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

for i in $(eval echo {0..$((n-1))})
do
   node $SCRIPT_DIR/VanitySCAddress.js -s$((s+i)) -o$n -c$c -b$b &
done

wait -n
pkill -P $$
