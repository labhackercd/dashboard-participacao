# Dashboard estatísticas de partipação
>  Dashboard experimental responsável por trazer uma melhor visualização dos dados estatísticos das ferramentas de partipação pública da Câmara dos Deputados.


## Como executar o projeto
Este projeto pode ser executado de forma direta usando scripts react ou por meio do docker. A seguir será explicado como executar o projeto por meio do docker.
Caso não tenha docker instalado, acesse [o manual de instalação correspondente ao seu sistema operacional](https://docs.docker.com/engine/install/) disponível no site oficial do docker para realizar a instalação.

### Desenvolvimento
Para executar o container do projeto em modo de desenvolvimento, execute o seguinte comando na raiz do projeto:
```
docker-compose up dev
```
Após o container ter sido criado, o projeto poderá ser acessado no localhost:3000.

### Produção
Para executar o container do projeto em modo de produção, o projeto de forma otimizado, execute o seguinte comando na raiz do projeto:
```
docker-compose up prod
```
Após o container ter sido criado, o projeto poderá ser acessado no localhost:5000.

## Suporte e outras dúvidas

Fique a vontade para criar qualquer issue nesse repositório e para entrar em contato com o time responsável por manter esse projeto no GitHub(@erivanio, @thiagong, @teogenesmoura, @joaopaulonsoares) ou pelo email: labhacker@camara.leg.br.

## Como contribuir
1. Faça um fork desse repositório;
2. Escreva seu código;
3. Crie um pull request para esse repositório;
4. Nosso time irá revisar o seu pull request o mais rápido possível.

## Licença
Esse projeto esta regido pela licença GPLv3.

