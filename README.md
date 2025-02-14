<div align="center">
  <img src="https://github.com/darian16/rag-demo/blob/master/.github/assets/bounce_insights_logo.svg" alt="Bounce Insights" width="100px">
  <br>
  <h1><img width="40px" src="https://github.com/darian16/rag-demo/blob/master/.github/assets/icon.svg" alt="Icon"> RAG-powered survey analysis tool</h1>
  <strong>Demo for Bounce Insights</strong>
</div>
<br>
<p align="center">
  <a href="https://rag-demo-33b16.web.app">
    <img src="https://img.shields.io/badge/Status-Demo-blue.svg" alt="Status">
  </a>
  <a href="https://github.com/darian16/rag-demo/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License (MIT)">
  </a>
  <a href="https://github.com/darian16/rag-demo/blob/master/README.md">
    <img src="https://img.shields.io/badge/Documentation-Readme.md-blue.svg" alt="Documentation (Readme.md)">
  </a>
  <a href="https://github.com/darian16/rag-demo/security/dependabot">
    <img src="https://img.shields.io/badge/Dependencies-Dependabot-blue.svg" alt="Dependencies (Dependabot)">
  </a>
  </br>
  <a href="https://github.com/darian16/rag-demo/actions/workflows/frontend_linter.yml">
    <img src="https://github.com/darian16/rag-demo/actions/workflows/frontend_linter.yml/badge.svg" alt="Frontend linter (ESlint)">
  </a>
  </br>
  <a href="https://github.com/darian16/rag-demo/actions/workflows/backend_linter.yml">
    <img src="https://github.com/darian16/rag-demo/actions/workflows/backend_linter.yml/badge.svg" alt="Backend linter (pylint)">
  </a>
</p>

## Table of Contents
- [Tech Stack](#tech-stack)
- [RAG agent workflow](#rag-agent-workflow)
- [Preview](#preview)
- [Sample of queries](#sample-of-queries)
- [Services topology diagram](#services-topology-diagram)
- [Frontend](#frontend)
  - [Frontend dependencies](#frontend-dependencies)
  - [Frontend Severless settings recommendations](#frontend-severless-settings-recommendations)
- [Backend](#backend)
  - [Services](#services)
  - [Backend dependencies](#backend-dependencies)
  - [Backend Severless settings recommendations](#backend-severless-settings-recommendations)

## Tech Stack
- **LLMops**: LanghGraph.
- **Frontend**: ReacJS, Material.
- **Backend**: FastAPI.
- **Database**: Chroma.
- **Infrastructure**: Google Cloud Platform (GCP), Terraform, Makefile, Docker, Docker Compose, CloudRun for serverless architecture, Firebase.

## RAG agent workflow


## Preview


## Sample of queries


## Services topology diagram


## Frontend

### Frontend dependencies


### Frontend severless settings recommendations
- Memory (Memory to allocate to each container instance): 128Mb
- CPU (Number of vCPUs allocated to each container instance): 0.1
- Request timeout (Time within which a response must be returned): 300 seconds
- Maximum requests per container (The maximum number of concurrent requests that can reach each container instance): 1
- Minimum number of instances (Autoscaling): 1
- Maximum number of instances (Autoscaling): 5

## Backend

### Services


### Backend dependencies
- 

### Backend severless settings recommendations
- Memory (Memory to allocate to each container instance): 512Mb
- CPU (Number of vCPUs allocated to each container instance): 1
- Request timeout (Time within which a response must be returned): 300 seconds
- Maximum requests per container (The maximum number of concurrent requests that can reach each container instance): 1
- Minimum number of instances (Autoscaling): 1
- Maximum number of instances (Autoscaling): 5

[🔼 Back to top](#-rag-powered-survey-analysis-tool)
