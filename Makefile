include .env
export

up:
	@docker-compose up -d


down:
	@docker-compose down


restart:
	@docker-compose restart


logs:
	@docker-compose logs
