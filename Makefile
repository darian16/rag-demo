SYSTEM_NAME = demo
IMAGES_PREFIX = demo
BRANCH = develop
COMMIT_NAME = "demobot"
DOCKERHUB_FRONTEND = ko
DOCKERHUB_BACKEND = ko
ECR_FRONTEND = ko
ECR_BACKEND = ko
ECR_ACCOUNT = ecr-project
GCR_FRONTEND = ko
GCR_BACKEND = ko
GCR_PROJECT = gcr-project
GAR_FRONTEND = ko
GAR_BACKEND = ok
GAR_ZONE = eu-north1
GAR_PROJECT = gar-project
GAR_REPOSITORY = repo
CLEAN_IMAGES = docker rmi $(docker images --filter "dangling=true" -q --no-trunc) -f >/dev/null 2>&1 && echo none-images-cleaned || echo skiped-none-images-clean|head -n1|awk '{print $$1}'

export IMAGES_PREFIX
export DOCKERHUB_FRONTEND
export DOCKERHUB_BACKEND
export ECR_FRONTEND
export ECR_BACKEND
export ECR_ACCOUNT
export GCR_FRONTEND
export GCR_BACKEND
export GCR_PROJECT
export GAR_FRONTEND
export GAR_BACKEND
export GAR_ZONE
export GAR_PROJECT
export GAR_REPOSITORY

up: pull push clean compose_up
down: compose_down

pull:
	git checkout master;git pull;git checkout develop;git pull;git merge master;git pull
push:
	git add .;git commit -am $(COMMIT_NAME);git push
clean:
	$(CLEAN_IMAGES)
compose_up:
	cd frontend;$(MAKE) up SERVICE_NAME=frontend;cd ..;cd backend;$(MAKE) up SERVICE_NAME=backend
	docker-compose up -d
	docker ps
compose_down:
	docker-compose down
