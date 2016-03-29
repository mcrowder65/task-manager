#!/usr/bin/env python3
import fileinput

with fileinput.FileInput("bundle.js", inplace=True, backup='.bak') as file:
    for line in file:
        print(line.replace("/** @jsx React.DOM */", ""), end='')