# Software-Defined-Communication-Device
@author: Alberto Attilio Brincat

System that extends the concept of SDN to the lower levels of the protocol stack, creating a device whose functionalities are all software-defined, allowing the execution of multiple transmission protocols on the same hardware with dynamic re-configuration.
During the realization of this project two distinct communication protocols were used for the realization of the dynamic switch:
- IEEE 802.11
- IEEE 802.15.4.

## Pre-requisites
1. GNU Radio v3.7
2. HackRF One or similar SDR 
3. gr-ieee802-11: https://github.com/bastibl/gr-ieee802-11
4. gr-ieee802-15-4: https://github.com/bastibl/gr-ieee802-15-4
5. NodeJS
6. Python v2.7.

## Installation
1. Setup the following file "controller.py","tx.html" with the correct IP address value of your machine
2. Launch the two python controller in receive and trasmission side: "controller.py" and "rx_controller.py"
3. Send a new message with a relative protocol choise through the file "tx.html".
