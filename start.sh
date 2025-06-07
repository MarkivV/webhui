#!/bin/sh
set -ex

pnpm dlx --no-update-notifier prisma migrate deploy

node server.js
