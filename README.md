## fiap-personal-finances-server
Trabalho finalização de módulo Técnicas de Design Responsive Web aplicando Design Thinking.

## Instalação do MYSQL (Ubuntu)

```bash
apt-get install mysql-server
```
Obs: Para outros sistemas https://www.mysql.com/downloads/
 

## Import database do projeto

```bash
mysql -uroot -p -D gastos < db/database.sql
```


## Instalação projeto

```bash
npm install
```

## Configurações

Copie o contéudo do arquivo **.env.js.dist** (template de configuração) e colar em um arquivo chamado **.env.js**. Configure o banco de dados, o domínio e porta do servidor nodejs / express. O arquivo contém explicações de como deve ser configurado.

## Compilar o projeto

```bash
npm run build
```

Se estiver desenvolvendo compile em modo watch, dessa forma sempre que ouver modificação em um arquivo o compilador entrará em ação.

```bash
npm run tsc:w
```

## Iniciar a aplicação

```bash
npm run serve
```

A aplicação ficará disponível na porta informada no arquivo .env.js

Para testar acesse http://localhost:3001/api/v1/