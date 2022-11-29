# instalar
npm i -g serverless@3.16.0

# sls ou serverless para inicializar
sls
# escolhi o HTTP API TEMPLATE
# nao use org
# Deploy - Yes

# sempre que mudou o código, usa o 
sls deploy

# traz os enderecos e informacoes sobre as funcoes
sls info

# invocar local
sls invoke local -f hello # nao precisa do --logs pq ele ja mostra os logs

# invocar em prd
sls invoke-f hello

# configurar o serverless dashboard
sls
#Deploy yes

# ver o serverless console
sls --console

# matar todo mundo!!
sls remove