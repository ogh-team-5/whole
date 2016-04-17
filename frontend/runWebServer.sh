#!/bin/bash

addr=127.0.0.1:8080

php -S $addr &
firefox http://$addr
