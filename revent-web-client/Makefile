.PHONY: docker all

TAG ?= dev

all: docker

docker:
	docker build -t revent-client:${TAG} -f Dockerfile .