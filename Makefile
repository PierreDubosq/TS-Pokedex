start:
	@docker-compose up --build -d
	@echo "\033[32m[+] Starting containers\033[0m"

stop:
	@docker-compose down
	@echo "\033[31m[-] Stopping containers\033[0m"

clean: stop
	@docker volume prune -f
	@docker network prune -f
	@docker system prune -f
	@echo "\033[31m[-] Cleaning containers\033[0m"

tests: clean
	@docker-compose up --build -d && docker exec pokedex-api yarn test

restart: stop start

install:
	@cd api && yarn install && cd ..
	@cd web && yarn install && cd ..
	@cd mobile && yarn install && cd ..

pull:
	@git pull origin $(git branch --show-current)
	@git pull origin dev

logs:
	@docker-compose logs -f

.PHONY: start stop clean tests restart install pull logs