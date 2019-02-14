#!/bin/bash
echo "start docker compose for the dev environment"
docker-compose -f docker-compose.yml -f docker-compose-elasticsearch.yml up -d
# docker-compose -f docker-compose.yml up 
curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/wod/_bulk --data-binary "@wod.ndjson"