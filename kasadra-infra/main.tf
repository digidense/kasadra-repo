##############################
# GKE Cluster
##############################
resource "google_container_cluster" "Cluster" {
  name     = var.gke_cluster_name
  location = var.zone

  remove_default_node_pool = true
  initial_node_count       = 1

  network             = "default"
  subnetwork          = "default"
  deletion_protection = false
}


##############################
# Node Pool
##############################
resource "google_container_node_pool" "primary_nodes" {
  name     = "primary-node-pool"
  location = var.zone
  cluster  = google_container_cluster.Cluster.name

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    tags = ["http-server"]
  }

  initial_node_count = 2
}

##############################
# Firewall Rule to Allow HTTP
##############################
resource "google_compute_firewall" "allow_http" {
  name    = "trafficcluster"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

##############################
# Ingress Controller via Helm
##############################
resource "helm_release" "ingress_nginx" {
  name             = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  namespace        = "ingress-nginx"
  create_namespace = true

  set {
    name  = "controller.service.type"
    value = "LoadBalancer"
  }
}

##############################
# Cloud DNS Managed Zone
##############################
resource "google_dns_managed_zone" "app_zone" {
  name        = "app-zone"
  dns_name    = "${var.domain_name}."   # softwarestack.xyz.
  description = "Managed zone for frontend"
}

##############################
# Get Ingress Controller LB IP
##############################
data "kubernetes_service" "ingress_nginx" {
  metadata {
    name      = "ingress-nginx-controller"
    namespace = "ingress-nginx"
  }

  depends_on = [helm_release.ingress_nginx]
}


##############################
# DNS Records (Root + www)
##############################
# Root domain (softwarestack.xyz)
resource "google_dns_record_set" "root_dns" {
  name         = "${var.domain_name}."   # softwarestack.xyz.
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.app_zone.name
  rrdatas      = [data.kubernetes_service.ingress_nginx.status[0].load_balancer[0].ingress[0].ip]

  depends_on = [data.kubernetes_service.ingress_nginx]
}

# www subdomain (www.softwarestack.xyz)
resource "google_dns_record_set" "frontend_dns" {
  name         = "www.${var.domain_name}."   # www.softwarestack.xyz.
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.app_zone.name
  rrdatas      = [data.kubernetes_service.ingress_nginx.status[0].load_balancer[0].ingress[0].ip]

  depends_on = [data.kubernetes_service.ingress_nginx]
}
##############################
# Outputs
##############################
output "name_servers" {
  description = "Nameservers for the DNS zone (update these in GoDaddy)"
  value       = google_dns_managed_zone.app_zone.name_servers
}

output "ingress_lb_ip" {
  description = "LoadBalancer IP of ingress-nginx controller"
  value       = data.kubernetes_service.ingress_nginx.status[0].load_balancer[0].ingress[0].ip
}




















