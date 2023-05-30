# OkrManagementUi

## Para Rodar o Projeto
 -Após fazer a clonagem do repositório no github, o usuário deve abrir o terminal integrado com as pastas do projeto por exemplo: "(a pasta que clonou o repositório)/ilg-portal-ui/okr-management-ui-master".

 -Dar o comando npm install;

 -Em seguida, deve executar o comando npm start;

 -Após isso, basta clicar na porta que aparecera no terminal. Normalamente deve apresentar o seguine caminho http://localhost:3000/.

 -Logo em seguida o seu browser será aberto e o programa estará rodando.

 

> Processo para rodar e atualizar o projeto localmente, (e que precisaremos automatizar em algum momento)

>Início processo de deploy:
- Acessando o server
```bash
sudo ssh -i ilegra-okr.cer centos@3.224.248.227
```

- Atualizar o código do servidor com github

```bash
 cd /home/ilegra/okr-ilegra.com/okr-management-ui
 ```
 
 - Baixar o novo código
 
 ```bash
 git pull origin main
 ```
 
 - Build
 
 ```bash
 npm run build
 ```
> Fim do processo de deploy

- Salvar e atualizar

É só voltar para o nginx e rodar o comando

```bash
cd /etc/nginx
```

 ```bash
nginx -s reload
```


