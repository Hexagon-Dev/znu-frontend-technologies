current_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

start:
	docker build -t lab1 .
	docker run -ti --rm --name node-app -p 8080:8080 -v $(current_dir)app:/app lab1