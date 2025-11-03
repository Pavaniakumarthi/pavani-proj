#!/usr/bin/env bash
set -ex

npm install
npm rebuild bcrypt --build-from-source
npm rebuild sqlite3 --build-from-source
