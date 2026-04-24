#!/usr/bin/env bash
# Notify IndexNow (Bing + Yandex + Seznam + Naver) that our pages changed.
# Run after every deploy. The key file must already be live at the root.
#
# Usage: ./.seo/ping-indexnow.sh
#
# IndexNow spec: https://www.indexnow.org/documentation
set -eu

HOST="dmarkamado-gif.github.io"
KEY="23e8f795c06a60389ab9df9614d79e74"
KEY_LOCATION="https://${HOST}/protean-608/${KEY}.txt"

# All pages we want crawlers to recheck.
URLS='[
  "https://dmarkamado-gif.github.io/protean-608/",
  "https://dmarkamado-gif.github.io/protean-608/study.html",
  "https://dmarkamado-gif.github.io/protean-608/flashcards.html",
  "https://dmarkamado-gif.github.io/protean-608/practice.html",
  "https://dmarkamado-gif.github.io/protean-608/resources.html"
]'

BODY=$(printf '{"host":"%s","key":"%s","keyLocation":"%s","urlList":%s}' \
  "${HOST}" "${KEY}" "${KEY_LOCATION}" "${URLS}")

echo "Pinging IndexNow with ${BODY}"
curl -sS -X POST 'https://api.indexnow.org/indexnow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "${BODY}" \
  -w '\nHTTP %{http_code}\n'
