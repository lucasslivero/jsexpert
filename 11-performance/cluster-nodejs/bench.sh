URL=localhost:3000

pnpm autocannon $URL -m POST --warmup [-c 1 -d 3] --connections 500 --pipeline 10 --renderStatusCodes

if [ $1 ]; then
  cat log.txt | grep $1 | wc -l
fi