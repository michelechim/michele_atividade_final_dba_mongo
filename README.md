# Atividade Final da Disciplina de BDA - MongoDB

Este repositório possui um projeto fullstack com servidor e cliente, separados nas respectivas pastas, **server** e **client**. A atividade consiste no desenvolvimento da camada de modelo do servidor, localizada na pasta ***server/app/models***. 

Um arquivo inicial chamado [***produtosDao.js***](https://github.com/g1ll/atividade_final_dba_mongo/blob/main/server/app/models/produtosDao.js) possui os métodos a serem implementados. Não altere a assinatura destes métodos e retorne exatamente o tipo de dados indicados no retorno.

A aplicação possui uma API e um front-end que consome algumas rotas, onde será possível testar o funcionamento dos métodos da camanda de modelo. No entanto, a API também possui outras rotas que deverão ser testadas através de um cliente HTTP.

## Instalação

Faça o download do repositório manualemente ou clone com o seguinte comando:

```shell
git clone git@github.com:g1ll/atividade_final_dba_mongo.git
```
Após baixar os arquivos, entre na pasta do projeto e execute o comando do npm para a instalação das dependências:

```shell
npm install
```

Entre na pasta ***client*** do projeto e execute novamente o comando anterior para instalar as dependências do front-end.

```shell
cd client
npm install
```

Após, volte para a raiz do projeto para executar os comandos de inicialização do servidor de desenvolvimento.

Linux/Macs:
```shell
cd ..
npm run dev
```

Windows:
```shell
cd ..
npm run win-dev
```

## Documentação da API

### Retornar todos os produtos

```http
  GET /produtos
```
Obs: resultados ornedados pelo identificador padrão do banco de dados, gerados automaticamente no registro dos mesmos.

### Filtrar produtos ordenados por campo específico

```http
  GET /produtos?order=${campo}&reverse=${valor}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `order`     | `string`   | Campo a ser usado para a ordenação na busca, padrão é o `id_prod`|
| `reverse`   | `string`   | Opcao {0:1} para buscar em orden reversa ou não, padrão é o valor `0`|

### Filtrar produtos por palavras em campos de texto

```http
  GET /produtos?field=${campo}&search=${termo}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `field`     | `string`   | Campo a ser usado para a busca textual, padrão é o `nome`. Os valores possíveis são `nome` ou `descricao`|
| `search`    | `string`   | Termo de busca a ser usando para filtrar os campos de texto.|
Obs: a busca é realizada por palavras, não é possível buscar por partes de uma palavra, ou seja, o termo `SS` não resultará em conteúdos com a palavra `SSD`.

### Retornar produto por ID

```http
  GET /produtos/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `number`   | **Obrigatório**. Identificador do produto, valor do campo `id_prod` no banco|

### Retorna produtos filtrados por preço

```http
  GET /produtos/filter_price/?greater=${min}&less=${max}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `min`       | `number`   | **Obrigatório**. Limite inicial da faixa de preços|
| `max`       | `number`   | **Obrigatório**. Limite final da faixa de preços|
Obs: os limites não são inclusos na resposta.

### Registrar um novo produto

```http
  POST /produtos
```
Parâmetros:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id_prod`| `number`   | **Obrigatório**. Um identificador numérico para o produto|
| `nome`| `string`   | **Obrigatório**. Nome do produto, sem limite de tamanho|
| `descricao`| `string`   | **Obrigatório**. Descrição do produto, sem limite de tamanho |
| `qtd_estoque`| `number`   | **Obrigatório**. Número inteiro positivo|
| `preco`| `number`   | **Obrigatório**. Definição do preço, armazenado como *Number*|
| `importado`| `boolean`   | Parâmetro opcional do tipo booleano, padrão é falso|
| `desconto`| `number`   |  Parâmetro opcinal da porcentagem de desconto, padrão é *NULO*|
Obs: enviar parâmetros no corpo da requisição no formato **form-url-encode**

### Atualizar um produto passando o id

```http
  PUT /produtos/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Um identificador numérico para o produto, valor do campo `id_prod` no banco|

No corpo da requisição deverão ser passados os seguintes parâmetros a serem atualizados no formato **form-url-encode**:
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`| `string`   | Nome do produto, sem limite de tamanho|
| `descricao`| `string`   | Descrição do produto, sem limite de tamanho |
| `qtd_estoque`| `number`   |  Número inteiro positivo|
| `preco`| `number`   | Definição do preço, armazenado como *Number*|
| `importado`| `boolean`   | Parâmetro opcional do tipo booleano, padrão é falso|
| `desconto`| `number`   |  Parâmetro opcinal da porcentagem de desconto, padrão é *NULO*|
Obs: Nenhum parâmetro é **Obrigatório**, os parâmetros  não enviados não serão alterados.

### Remover um produto por ID

```http
  DELETE /produtos/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Um identificador numérico para o produto, valor do campo `id_prod` no banco|


### Remover varios produtos

```http
  DELETE /produtos/many
```
No corpo da requisição deverão ser passados os seguintes parâmetros a serem atualizados no formato **form-url-encode**:
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ids`| `array`   | **Obrigatório**. Array de valores numéricos representando os ids dos produtos a serem alterados|
