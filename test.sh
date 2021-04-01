#!/usr/bin/env bash

docker build -t packer-node10 -f tests/node10/Dockerfile .
docker build -t packer-node12 -f tests/node12/Dockerfile .
docker build -t packer-node14 -f tests/node14/Dockerfile .
docker build -t packer-node15 -f tests/node15/Dockerfile .

docker run -it --rm -p packer-node10
docker run -it --rm -p packer-node12
docker run -it --rm -p packer-node14
docker run -it --rm -p packer-node15