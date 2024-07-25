/* -------------------------------------------------------------------------- */
/*                            Deploying Resources to EKS                      */
/* -------------------------------------------------------------------------- */
# Example of creating Kubernetes secrets dynamically
resource "kubernetes_secret" "lambda_nestjs_secret" {
  metadata {
    name      = "lambda-nestjs-secret"
    namespace = "default"
  }
  data = {
    IMAGE_TAG           = var.image_tag
    JWT_EXPIRATION_TIME = var.jwt_expiration_time
    JWT_SECRET          = var.jwt_secret
    MONGODB_URI         = var.mongodb_uri
    SECRET_KEY          = var.secret_key
  }
}

resource "kubernetes_config_map" "lambda_nestjs_config" {
  metadata {
    name      = "lambda-nestjs-config"
    namespace = "default"
  }
  data = {
    IMAGE_TAG           = var.image_tag
    JWT_EXPIRATION_TIME = var.jwt_expiration_time
    JWT_SECRET          = var.jwt_secret
    MONGODB_URI         = var.mongodb_uri
    SECRET_KEY          = var.secret_key
  }
}

/* -------------------------------------------------------------------------- */
/*                            Create Kubernetes Deployment and Service        */
/* -------------------------------------------------------------------------- */

resource "kubernetes_deployment" "lambda_nestjs" {
  metadata {
    name      = "lambda-nestjs-deployment"
    namespace = "default"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "lambda-nestjs"
      }
    }

    template {
      metadata {
        labels = {
          app = "lambda-nestjs"
        }
      }

      spec {
        container {
          name              = "lambda-nestjs-container"
          image             = "${aws_ecr_repository.ecr_repos["lambda-nestjs"].repository_url}:${var.image_tag}"
          image_pull_policy = "Always" // or "IfNotPresent"

          env {
            name  = "MONGODB_URI"
            value = "mongodb://mongodb-service.default.svc.cluster.local:27017"
          }

          # Uncomment below if fetching secrets from Kubernetes Secret
          # env {
          #   name = "JWT_EXPIRATION_TIME"
          #   value_from {
          #     secret_key_ref {
          #       name = kubernetes_secret.lambda_nestjs_secret.metadata[0].name
          #       key  = "JWT_EXPIRATION_TIME"
          #     }
          #   }
          # }
          # env {
          #   name = "JWT_SECRET"
          #   value_from {
          #     secret_key_ref {
          #       name = kubernetes_secret.lambda_nestjs_secret.metadata[0].name
          #       key  = "JWT_SECRET"
          #     }
          #   }
          # }
          # env {
          #   name = "SECRET_KEY"
          #   value_from {
          #     secret_key_ref {
          #       name = kubernetes_secret.lambda_nestjs_secret.metadata[0].name
          #       key  = "SECRET_KEY"
          #     }
          #   }
          # }

          // Add any additional configuration like volume mounts, ports, etc.
        }
      }
    }
  }
}

resource "kubernetes_service" "lambda_nestjs_service" {
  metadata {
    name      = "lambda-nestjs-service"
    namespace = "default"
  }

  spec {
    selector = {
      app = "lambda-nestjs"
    }

    port {
      port        = 80
      target_port = 3000 // Adjust port based on your application's configuration
    }

    type = "LoadBalancer" // Type can be ClusterIP, NodePort, or LoadBalancer
  }
}

/* -------------------------------------------------------------------------- */
/*                            Create Kubernetes StatefulSet for MongoDB       */
/* -------------------------------------------------------------------------- */

resource "kubernetes_stateful_set" "mongodb" {
  metadata {
    name      = "mongodb-statefulset"
    namespace = "default"
  }

  spec {
    replicas     = 1
    service_name = "mongodb"

    selector {
      match_labels = {
        app = "mongodb"
      }
    }

    template {
      metadata {
        labels = {
          app = "mongodb"
        }
      }

      spec {
        container {
          name  = "mongodb"
          image = "mongo:latest"

          volume_mount {
            name       = "mongodb-data"
            mount_path = "/data/db"
          }
        }

        volume {
          name = "mongodb-data"
          persistent_volume_claim {
              claim_name = kubernetes_persistent_volume_claim.mongodb_pvc.metadata[0].name
            # claim_name = "mongodb-pvc"
          }
        }
      }
    }
  }
}


/* -------------------------------------------------------------------------------------------------*/
/*      Create a Kubernetes Job for Initialization and populate MONGODB                             */

/*  This Job will run once and populate your MongoDB with the necessary collections and documents.  */
/* ------------------------------------------------------------------------------------------------ */


resource "kubernetes_job" "mongodb_init" {
  metadata {
    name      = "mongodb-init"
    namespace = "default"
  }

  spec {
    template {
      metadata {
        name = "mongodb-init"
      }

      spec {
        restart_policy = "OnFailure"

        container {
          name  = "mongo-init"
          image = "mongo:latest"

          command = [
            "sh", "-c", <<-EOF
              until mongosh --eval "print('waiting for connection')" &>/dev/null; do
                sleep 2
              done
              mongosh <<EOF
              use cb_subscription
              db.createCollection("traces")
              db.createCollection("subscriptions")
              db.createCollection("users")
              db.createCollection("articles");
              db.users.insertMany([
              {"email": "franroav@gmail.com", "password": "prueba1"},
              {"email": "webkonce@gmail.com", "password": "$2b$10$uwkf/5wtKfpdBbxMSSePje5eL/owosUhCYHi6EJpU7TJ.DDb35wtO"}
              ])
              db.articles.insertMany([
              {
                created_at: new Date(),
                title: "Article 1",
                url: "http://example.com/article1",
                author: "Author 1",
                points: 10,
                story_text: "This is the story text of article 1.",
                comment_text: "This is a comment on article 1.",
                num_comments: 5,
                story_id: 1,
                story_title: "Story Title 1",
                story_url: "http://example.com/story1",
                parent_id: 0,
                created_at_i: Math.floor(new Date().getTime() / 1000)
              },
              {
                created_at: new Date(),
                title: "Article 2",
                url: "http://example.com/article2",
                author: "Author 2",
                points: 20,
                story_text: "This is the story text of article 2.",
                comment_text: "This is a comment on article 2.",
                num_comments: 10,
                story_id: 2,
                story_title: "Story Title 2",
                story_url: "http://example.com/story2",
                parent_id: 1,
                created_at_i: Math.floor(new Date().getTime() / 1000)
              }
            ])
              db.traces.insertMany([
                {email: "trace1@example.com",name: "Trace 1"},
                {email: "trace2@example.com",name: "Trace 2"}
              ])
              db.subscriptions.insertMany([
                {
                  name: "Subscription 1",
                  invitation: 10,
                  amount: 100,
                  email: "sub1@example.com",
                  address: "123 Main St",
                  gender: "Male",
                  code: "ABC123",
                  traces: [
                    {email: "trace1@example.com", name: "Trace 1"},
                    {email: "trace2@example.com", name: "Trace 2"}
                  ],
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                },
                {
                  name: "Subscription 2",
                  invitation: 20,
                  amount: 200,
                  email: "sub2@example.com",
                  address: "456 Elm St",
                  gender: "Female",
                  code: "XYZ789",
                  traces: [
                    {email: "trace1@example.com", name: "Trace 1"}
                  ],
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }
              ])
              EOF
            ,
          ]
        }
      }
    }
  }

  depends_on = [kubernetes_stateful_set.mongodb]
}

/* -------------------------------------------------------------------------- */
/*             Kubernetes Persistent Volume Claim for MongoDB                 */
/* -------------------------------------------------------------------------- */

resource "kubernetes_persistent_volume_claim" "mongodb_pvc" {
  metadata {
    name      = "mongodb-pvc"
    namespace = "default"
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "10Gi"
      }
    }
  }
}

resource "kubernetes_persistent_volume" "example" {
  metadata {
    name = "mongovolumename"
  }
  spec {
    capacity = {
      storage = "10Gi"
    }
    access_modes = ["ReadWriteMany"]
    persistent_volume_source {
       host_path {
        path = "/mnt/data"
      }
      gce_persistent_disk {
        pd_name = "test-123"
      }
    }
  }
}



