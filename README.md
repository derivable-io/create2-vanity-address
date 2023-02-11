# Vanity Contract Address

The process of scanning the contract address as desired.

How to use:
    Run a command with
        -s starting salt number (0)
        -o salt step (1)
        -c checkpoint size (1000000)
        -b built contract JSON
Example
```
node scripts/VanitySCAddress.js -s 0 -o 4 -b ../utr/build/UniversalTokenRouter.json >> UTR_Log.txt
```
