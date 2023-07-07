# Keycloak and OpenID Connect

This is the demo of the talk "Keycloak and OpenID Connect".

[Here](https://www.fabian-scheidt.com/projects/keycloak-and-oidc/20230707_Keycloak_and_OIDC.pdf) you can find the slides of the talk.

## Running the Solution

Run `docker-compose up --build`.
- Keycloak is available at http://localhost:8080/. You can log in with username and password "admin".
- The solution is available at http://localhost:3000/solution/hello. You can log in with username and password "alice".

To use the GitHub identity provider, you will need to obtain and configure your own client id and secret:
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

## Running the Demo

```bash
docker-compose up --build -d keycloak
yarn install
yarn start
```
