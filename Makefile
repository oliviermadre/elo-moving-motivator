.DEFAULT_GOAL: help

# See https://www.thapaliya.com/en/writings/well-documented-makefiles/
help: ## Display this help
	@awk 'BEGIN {FS = ":.* ##"; printf "\n\033[1mUsage:\033[0m\n  make \033[32m<target>\033[0m\n"} /^[a-zA-Z_-]+:.* ## / { printf "  \033[33m%-25s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

DOCKER_COMPOSE      = docker-compose -f docker-compose.yml -p elo-moving-motivator
SERVICE             = dev-server
NPM                 = $(DOCKER_COMPOSE) run --rm $(SERVICE) npm

.PHONY: install
install: ## Install app dependencies
	$(NPM) install

.PHONY: serve
serve: ## Compiles and hot-reloads for development
	$(NPM) run serve

.PHONY: build
build: ## Compiles and minifies for production
	$(NPM) run build

.PHONY: lint
lint: ## Lints and fixes files
	$(NPM) run lint

.PHONY: logs
logs: ## Output the logs of local containers
	$(DOCKER_COMPOSE) logs -f


