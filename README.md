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

Você precisará copiar o contéudo do arquivo **.env.js.dist** (template de configuração) e colar em um arquivo chamado **.env.js**
Feito você precisará informar dados do banco de dados e seu domínio. O arquivo contém explicações de como deve ser configurado.