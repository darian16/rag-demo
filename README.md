<div align="center">
  <img src="https://github.com/nivalcode/demo2/blob/master/.github/assets/logo.png" alt="Earground" width="300px">
  <br>
  <h1><img width="40px" src="https://github.com/nivalcode/demo2/blob/master/.github/assets/icon.svg" alt="Icon"> RAG-powered AIS/AES analysis tool</h1>
  <strong>Demo for the project Earground</strong>
</div>
<br>
<p align="center">
  <a href="https://rag-demo-33b16.web.app">
    <img src="https://img.shields.io/badge/Status-Demo-blue.svg" alt="Status">
  </a>
  <a href="https://github.com/nivalcode/demo2/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License (MIT)">
  </a>
  <a href="https://github.com/nivalcode/demo2/blob/master/README.md">
    <img src="https://img.shields.io/badge/Documentation-Readme.md-blue.svg" alt="Documentation (Readme.md)">
  </a>
  <a href="https://github.com/nivalcode/demo2/security/dependabot">
    <img src="https://img.shields.io/badge/Dependencies-Dependabot-blue.svg" alt="Dependencies (Dependabot)">
  </a>
  </br>
  <a href="https://github.com/nivalcode/demo2/actions/workflows/frontend_linter.yml">
    <img src="https://github.com/nivalcode/demo2/actions/workflows/frontend_linter.yml/badge.svg" alt="Frontend linter (ESlint)">
  </a>
  <a href="https://github.com/nivalcode/demo2/actions/workflows/backend_linter.yml">
    <img src="https://github.com/nivalcode/demo2/actions/workflows/backend_linter.yml/badge.svg" alt="Backend linter (pylint)">
  </a>
  <a href="https://github.com/nivalcode/demo2/actions/workflows/backend_tests.yml">
    <img src="https://github.com/nivalcode/demo2/actions/workflows/backend_tests.yml/badge.svg" alt="Tests (pytest)">
  </a>
</p>

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [RAG agent workflow](#rag-agent-workflow)
- [Sample of queries](#sample-of-queries)
- [Services topology diagram](#services-topology-diagram)
- [Frontend](#frontend)
  - [Frontend dependencies](#frontend-dependencies)
  - [Frontend Severless settings recommendations](#frontend-severless-settings-recommendations)
- [Backend](#backend)
  - [Services](#services)
    * [Index](#index)
    * [Chat](#chat)
  - [Backend dependencies](#backend-dependencies)
  - [Backend Severless settings recommendations](#backend-severless-settings-recommendations)

## Overview
This project involves developing a web application that enables users to explore, analyze, and compare two market research reports through AI-powered natural language interactions. The system architecture consists of a Python backend built with FastAPI, which serves as the bridge between the frontend interface and a Retrieval-Augmented Generation (RAG) system. The RAG system leverages advanced techniques such as vector embeddings, semantic search, and prompt engineering to retrieve relevant information from the reports and generate insightful, contextual responses. The application must ensure all results are traceable, enabling users to navigate directly to the original source data for verification and deeper analysis.
<div align="center">
  <img src="https://github.com/nivalcode/demo2/blob/master/.github/assets/preview.png" alt="Preview" width="90%">
</div>
This software demonstrates Retrieval Augmented Generation (RAG) for in-context learning using specific PDF documents:

- [Customs Import Procedures](https://www.revenue.ie/en/tax-professionals/tdm/customs/import-export-policy/customs-import-procedures-manual.pdf)
- [Customs Export Procedures](https://www.revenue.ie/en/tax-professionals/tdm/customs/import-export-policy/customs-export-procedures-manual.pdf)

## Tech Stack
- **LLMops**: LanghGraph.
- **Frontend**: ReacJS, Material.
- **Backend**: FastAPI.
- **Database**: Chroma.
- **Infrastructure**: Google Cloud Platform (GCP), Terraform, Makefile, Docker, Docker Compose, CloudRun for serverless architecture, Firebase.
- **Quality**: ESlint, pylint, pytest, pycov.

## RAG agent workflow
<div align="center">
  <img src="https://github.com/nivalcode/demo2/blob/develop/backend/graph.png" alt="Workflow" width="auto">
</div>

## Sample of queries
- *Please tell me how to declare the goods.*
- *Is it possible to declare empy containers?*
- *What are the time limits for lodging export declaration?*
- *What is the Windsor Framework?*
- *Give me the differences between manifests for ships departing to any country and to another EU country.*

## Services topology diagram
<div align="center">
  <img src="topology.svg" alt="Services topology diagram" width="80%">
</div>

## Frontend

### Frontend dependencies
- "@emotion/cache": "^11.9.3"
- "@emotion/react": "^11.9.3"
- "@emotion/styled": "^11.9.3"
- "@mui/icons-material": "^5.8.4"
- "@mui/lab": "^5.0.0-alpha.88"
- "@mui/material": "^5.8.6"
- "@mui/system": "^5.8.6"
- "@mui/utils": "^5.8.6"
- "@tabler/icons": "^1.72.0"
- "axios": "^1.3.6"
- "crypto-js": "^4.0.0"
- "formik": "^2.2.9"
- "framer-motion": "^6.3.16"
- "i18next": "^22.4.13"
- "node-polyfill-webpack-plugin": "^2.0.1"
- "prop-types": "^15.8.1"
- "react": "^18.2.0"
- "react-detect-offline": "^2.4.5"
- "react-device-detect": "^2.2.2"
- "react-dom": "^18.2.0"
- "react-gtm-module": "^2.0.11"
- "react-i18next": "^12.2.0"
- "react-loading-skeleton": "^3.2.1"
- "react-perfect-scrollbar": "^1.5.8"
- "react-redux": "^8.0.2"
- "react-router": "6.3.0"
- "react-router-dom": "6.3.0"
- "react-scripts": "^5.0.1"
- "react-tooltip": "^5.28.0"
- "redux": "^4.2.0"
- "yup": "^0.32.11"

### Frontend severless settings recommendations
- Memory (Memory to allocate to each container instance): 128Mb
- CPU (Number of vCPUs allocated to each container instance): 0.1
- Request timeout (Time within which a response must be returned): 300 seconds
- Maximum requests per container (The maximum number of concurrent requests that can reach each container instance): 1
- Minimum number of instances (Autoscaling): 1
- Maximum number of instances (Autoscaling): 5

## Backend

### Services

### Index
**Category:** Endpoint<br/>
**Relative URL:** /<br/>
**Description:** App description.

### Chat
**Category:** Endpoint<br/>
**Relative URL:** /chat<br/>
**Description:** In-context ChatGPT-based chat.

### Backend dependencies
- python3.11
- python3-pip
- python3.11-distutils
- python3.11-dev
- langchain==0.3.15
- onnxruntime==1.20.1
- chromadb==0.6.3
- langchain-chroma==0.2.1
- langchain_community==0.3.15
- langgraph==0.2.67
- pypdf==5.1.0
- tiktoken==0.8.0
- gpt4all==2.8.2
- langchain-openai==0.3.5
- pysqlite3-binary
- fastapi[standard]
- pylint == 3.3.4
- pytest == 8.3.4
- pytest-cov == 6.0.0

### Backend severless settings recommendations
- Memory (Memory to allocate to each container instance): 512Mb
- CPU (Number of vCPUs allocated to each container instance): 1
- Request timeout (Time within which a response must be returned): 300 seconds
- Maximum requests per container (The maximum number of concurrent requests that can reach each container instance): 1
- Minimum number of instances (Autoscaling): 1
- Maximum number of instances (Autoscaling): 5

[🔼 Back to top](#-rag-powered-ais/aes-analysis-tool)
