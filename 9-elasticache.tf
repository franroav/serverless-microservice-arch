/* -------------------------------------------------------------------------- */
/*                                                          Redis ElastiCache Setup                        
                        If you want to set up a single-node Redis cluster instead, you can use the aws_elasticache_cluster */
/* -------------------------------------------------------------------------- */

# resource "aws_elasticache_subnet_group" "webkonce" {
#   name       = "webkonce"
#   subnet_ids =  data.aws_subnet_ids.webkonce_subnets.ids //aws_subnet.webkonce[*].id
# }

# resource "aws_elasticache_cluster" "webkonce" {
#   cluster_id           = "webkonce"
#   engine               = "redis"
#   node_type            = "cache.t2.micro"
#   num_cache_nodes      = 1
#   parameter_group_name = "default.redis3.2"
#   subnet_group_name    = aws_elasticache_subnet_group.webkonce.name

#   tags = {
#     Name = "webkonce-redis"
#   }
# }







/* -------------------------------------------------------------------------- */
/*                                                                 Redis ElastiCache Setup                        
                It looks like you have a mix-up between the aws_elasticache_cluster and aws_elasticache_replication_group resources. 
                        You need to decide whether you want to use a single Redis node or a replication group.*/
/* -------------------------------------------------------------------------- */

# resource "aws_elasticache_subnet_group" "webkonce" {
#   name       = "webkonce"
#   subnet_ids = aws_subnet.webkonce[*].id
# }

# resource "aws_elasticache_replication_group" "webkonce" {
#   replication_group_id          = "webkonce-replication-group"
#   replication_group_description = "webkonce replication group"
#   node_type                     = "cache.t2.micro"
#   number_cache_clusters         = 2
#   automatic_failover_enabled    = true
#   engine                        = "redis"
#   engine_version                = "6.x"
#   parameter_group_name          = "default.redis6.x"
#   port                          = 6379
#   subnet_group_name             = aws_elasticache_subnet_group.webkonce.name

#   tags = {
#     Name = "webkonce-replication-group"
#   }
# }

# output "redis_endpoint" {
#   value = aws_elasticache_replication_group.webkonce.primary_endpoint_address
# }