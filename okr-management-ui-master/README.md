# OkrManagementUi

## Rodando local

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


