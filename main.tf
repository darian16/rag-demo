terraform {
  required_version = ">= 1.9"

  required_providers {
	  google = ">= 5.37"
  }
}
  
provider "google" {
  project = "gcp-project"
}

# Cloud Run
resource "google_cloud_run_service" "backend" {
  name = "backend"
  location = "eu-north1"
  template {
    metadata {
      annotations = {
        "run.googleapis.com/execution-environment" = "gen1"
        "run.googleapis.com/ingress" = "all"
        "run.googleapis.com/startup-cpu-boost" = true
        "run.googleapis.com/cpu-throttling" = false
        "autoscaling.knative.dev/minScale" = 1
        "autoscaling.knative.dev/maxScale" = 5
        "run.googleapis.com/client-name" = "terraform"
        "run.googleapis.com/vpc-access-connector" = "default"
      }
    }
    spec {
      containers {
        image = "eu-north1-docker.pkg.dev/gcp-project/repo/backend:latest"
        name = "backend"
        resources {
          limits = {
            cpu = "1"
            memory = "512Mi"
          }
        }
      }
    }
  }
}
resource "google_cloud_run_service" "frontend" {
  name = "frontend"
  location = "eu-north1"
  template {
    metadata {
      annotations = {
        "run.googleapis.com/execution-environment" = "gen1"
        "run.googleapis.com/ingress" = "all"
        "run.googleapis.com/startup-cpu-boost" = true
        "run.googleapis.com/cpu-throttling" = false
        "autoscaling.knative.dev/minScale" = 1
        "autoscaling.knative.dev/maxScale" = 5
        "run.googleapis.com/client-name" = "terraform"
        "run.googleapis.com/vpc-access-connector" = "default"
      }
    }
    spec {
      containers {
        image = "eu-north1-docker.pkg.dev/gcp-project/repo/frontend:latest"
        name = "frontend"
        resources {
          limits = {
            cpu = "0.1"
            memory = "128Mi"
          }
        }
        env {
          name = "BACKEND_BASE_URL"
          value = ""
        }
        env {
          name = "FRONTEND_BUILD_NUMBER"
          value = "1.0.0"
        }
      }
    }
  }
}

# Permissions
data "google_iam_policy" "noauth" {
   binding {
     role = "roles/run.invoker"
     members = ["allUsers"]
   }
 }
 resource "google_cloud_run_service_iam_policy" "noauth-backend" {
   location    = google_cloud_run_service.cloudrun-backend.location
   project     = google_cloud_run_service.cloudrun-backend.project
   service     = google_cloud_run_service.cloudrun-backend.name
   policy_data = data.google_iam_policy.noauth.policy_data
 }
 resource "google_cloud_run_service_iam_policy" "noauth-frontend" {
   location    = google_cloud_run_service.cloudrun-frontend.location
   project     = google_cloud_run_service.cloudrun-frontend.project
   service     = google_cloud_run_service.cloudrun-frontend.name
   policy_data = data.google_iam_policy.noauth.policy_data
 }
