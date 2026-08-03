<div align="center">
  <img src="https://github.com/darian16/rag-demo/blob/master/.github/assets/logo.png" alt="Earground" width="300px">
  <br>
  <h1><img width="40px" src="https://github.com/darian16/rag-demo/blob/master/.github/assets/icon.svg" alt="Icon"> RAG-powered AIS AES analysis tool</h1>
  <strong>Earground Demo (live: https://rag-demo-33b16.web.app)</strong>
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
  <a href="https://github.com/darian16/rag-demo/actions/workflows/backend_linter.yml">
    <img src="https://github.com/darian16/rag-demo/actions/workflows/backend_linter.yml/badge.svg" alt="Backend linter (pylint)">
  </a>
  <a href="https://github.com/darian16/rag-demo/actions/workflows/backend_tests.yml">
    <img src="https://github.com/darian16/rag-demo/actions/workflows/backend_tests.yml/badge.svg" alt="Tests (pytest)">
  </a>
</p>

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [RAG agent workflow](#rag-agent-workflow)
- [Sample of queries](#sample-of-queries)
- [Earground vs other LLMs](#earground-vs-other-llms)
  - [Earground](#earground)
  - [ChatGPT](#chatgpt)
  - [Claude](#claude)
  - [Gemini](#gemini)
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
- [Roadmap](#roadmap)

## Overview
This project involves developing a web application that enables users to explore and analyze Customs Import Procedures and Customs Export Procedures through AI-powered natural language interactions. The system architecture consists of a Python backend built with FastAPI, which serves as the bridge between the frontend interface and a Retrieval-Augmented Generation (RAG) system. The RAG system leverages advanced techniques such as vector embeddings, semantic search, and prompt engineering to retrieve relevant information from the reports and generate insightful, contextual responses. The application ensures all results are traceable, enabling users to navigate directly to the original source data for verification and deeper analysis.
<div align="center">
  <img src="https://github.com/user-attachments/assets/df1c7bd6-4f42-4f61-9914-7211b335b25c" alt="Preview 1" width="70%">
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
- **Model**: gemini-2.5-flash, gpt-4o (rewrite_question_node).

## RAG agent workflow
<div align="center">
  <img src="https://github.com/darian16/rag-demo/blob/develop/backend/graph.png" alt="Workflow" width="auto">
</div>

## Sample of queries
- *What are the differences between declarations for UK and EU trades?*
- *Is it possible to declare empy containers?*
- *What are the time limits for lodging export declaration?*
- *What is the Windsor Framework?*
- *Give me the differences between manifests for ships departing to any country and to another EU country.*
- *What is the time limit for rail traffic?*

## Earground vs other LLMs
<div align="center">
  
### Earground
✅
<div align="center">
  <img src="https://github.com/user-attachments/assets/5e69cefd-7705-4575-99ad-2495c0bc63e3" alt="Preview Earground" width="70%">
</div>

### ChatGPT
❌
<div align="center">
  <img src="https://github.com/user-attachments/assets/571e55e0-5015-463f-9293-1601e2d67ad6" alt="Preview ChatGPT" width="70%">
</div>

### Claude
❌
<div align="center">
  <img src="https://github.com/user-attachments/assets/c9f03e1d-b49c-49ef-8669-37c944ed6471" alt="Preview Claude" width="70%">
</div>

### Gemini
❌
<div align="center">
  <img src="https://github.com/user-attachments/assets/0551e2bf-9263-47f8-8219-06f4500752dc" alt="Preview Gemini" width="70%">
</div>
</div>

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
**Description:** In-context RAG-based chat.

### Backend dependencies
- python3.11
- python3-pip
- python3.11-distutils
- python3.11-dev
- langchain == 1.3.11
- onnxruntime == 1.20.1
- chromadb == 1.5.9
- langchain-chroma == 1.1.0
- langchain_community == 0.4.2
- langgraph == 1.2.7
- pypdf == 6.7.2
- tiktoken == 0.8.0
- gpt4all == 2.8.2
- langchain-openai == 1.3.3
- fastapi[standard]
- pylint == 3.3.4
- grandalf == 0.8
- ipython == 8.32.0
- pysqlite3-binary; platform_system != "Windows"
- pytest == 8.3.4
- pytest-cov == 6.0.0
- langchain-google-genai == 4.2.6
- google-generativeai == 0.8.6

### Backend severless settings recommendations
- Memory (Memory to allocate to each container instance): 512Mb
- CPU (Number of vCPUs allocated to each container instance): 1
- Request timeout (Time within which a response must be returned): 300 seconds
- Maximum requests per container (The maximum number of concurrent requests that can reach each container instance): 1
- Minimum number of instances (Autoscaling): 1
- Maximum number of instances (Autoscaling): 5

## Roadmap
- Build an expert-curated benchmark of context-dependent question–answer pairs to evaluate Earground’s ability to leverage environmental information. Compare Earground against out-of-context LLM baselines using semantic similarity metrics, LLM-as-a-Judge scoring, and expert human evaluation to quantify improvements in contextual understanding, factual accuracy, and response quality.

[🔼 Back to top](#-rag-powered-ais-aes-analysis-tool)
