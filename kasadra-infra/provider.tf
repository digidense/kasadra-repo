terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.33.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.32.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.12.1"
    }
  }


  required_version = ">= 1.3.0"
}

# Google Cloud provider
provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# Authentication details for current user
data "google_client_config" "default" {}

# Use the cluster you create in Terraform
provider "kubernetes" {
  host                   = "https://${google_container_cluster.Cluster.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(
    google_container_cluster.Cluster.master_auth[0].cluster_ca_certificate
  )
}

provider "helm" {
  kubernetes {
    host                   = "https://${google_container_cluster.Cluster.endpoint}"
    token                  = data.google_client_config.default.access_token
    cluster_ca_certificate = base64decode(
      google_container_cluster.Cluster.master_auth[0].cluster_ca_certificate
    )
  }
}
