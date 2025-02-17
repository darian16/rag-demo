COMMIT_ID = $(shell git log|head -n1|awk '{print $$2}'|head -c 8)
IMAGE_INSPECT = $(shell docker inspect --type=image $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) >/dev/null 2>&1 && echo ok || echo ko|head -n1|awk '{print $$1}'|head -c 2)
ifneq ($(strip $(IMAGE_INSPECT)),ok)
DOCKER_BUILD = docker build -t $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) -t $(IMAGES_PREFIX)/$(SERVICE_NAME):latest .
else
DOCKER_BUILD = $(info skiped-docker-build)
endif
ifeq ($(strip $(DOCKERHUB_FRONTEND)),ok)
DOCKERHUB_PUSH = docker push $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID);docker push $(IMAGES_PREFIX)/$(SERVICE_NAME):latest
else
DOCKERHUB_PUSH = $(info skiped-dockerhub-push)
endif
ifeq ($(strip $(ECR_FRONTEND)),ok)
ECR_TAG = docker tag $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) $(ECR_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com/$(SERVICE_NAME):$(COMMIT_ID);docker tag $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) $(ECR_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com/$(SERVICE_NAME):latest
ECR_LOGIN = aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin $(ECR_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com
ECR_PUSH = docker push $(ECR_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com/$(SERVICE_NAME):$(COMMIT_ID);docker push $(ECR_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com/$(SERVICE_NAME):latest
else
ECR_TAG = $(info skiped-ecr-tag)
ECR_LOGIN = $(info skiped-ecr-login)
ECR_PUSH = $(info skiped-ecr-push)
endif
ifeq ($(strip $(GCR_FRONTEND)),ok)
GCR_TAG = docker tag $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) gcr.io/$(GCR_PROJECT)/$(SERVICE_NAME):$(COMMIT_ID);docker tag $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) gcr.io/$(GCR_PROJECT)/$(SERVICE_NAME):latest
GCR_PUSH = docker push gcr.io/$(GCR_PROJECT)/$(SERVICE_NAME):$(COMMIT_ID);docker push gcr.io/$(GCR_PROJECT)/$(SERVICE_NAME):latest
else
GCR_TAG = $(info skiped-gcr-tag)
GCR_PUSH = $(info skiped-gcr-push)
endif
ifeq ($(strip $(GAR_FRONTEND)),ok)
GAR_TAG = docker tag $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) $(GAR_ZONE)-docker.pkg.dev/$(GAR_PROJECT)/$(GAR_REPOSITORY)/$(SERVICE_NAME):$(COMMIT_ID);docker tag $(IMAGES_PREFIX)/$(SERVICE_NAME):$(COMMIT_ID) $(GAR_ZONE)-docker.pkg.dev/$(GAR_PROJECT)/$(GAR_REPOSITORY)/$(SERVICE_NAME):latest
GAR_PUSH = docker push $(GAR_ZONE)-docker.pkg.dev/$(GAR_PROJECT)/$(GAR_REPOSITORY)/$(SERVICE_NAME):$(COMMIT_ID);docker push $(GAR_ZONE)-docker.pkg.dev/$(GAR_PROJECT)/$(GAR_REPOSITORY)/$(SERVICE_NAME):latest
else
GAR_TAG = $(info skiped-gar-tag)
GAR_PUSH = $(info skiped-gar-push)
endif

up: dockerbuild login push

dockerbuild:
	$(DOCKER_BUILD)
	$(ECR_TAG)
	$(GCR_TAG)
	$(GAR_TAG)
login:
	$(ECR_LOGIN)
push:
	$(DOCKERHUB_PUSH)
	$(ECR_PUSH)
	$(GCR_PUSH)
	$(GAR_PUSH)
