variable "project_id" {
  type        = string
  description = "The GCP project ID"
  default     = "kasadra-project"
}

variable "region" {
  type    = string
  default = "us-central1-c"
}

variable "zone" {
  type    = string
  default = "us-central1-c"
}

variable "gke_cluster_name" {
  type    = string
  default = "digi-cluster"
}

variable "domain_name" {
  description = "Root domain for the application"
  type        = string
  default     = "softwarestack.xyz"
}


variable "namespace" {
  description = "Kubernetes namespace where your app Ingress will be deployed"
  type        = string
  default     = "kasadara"
}
