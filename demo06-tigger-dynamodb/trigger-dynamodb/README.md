
invocando lambda local com serverless-offline:

`
sls invoke local -f "nome-handler" --path "caminho-do-json-com-body"
`

examplo de arquivo: 

```
{
  "body": "{\"nome\": \"Flash\", \"poder\": \"velocidade\"}"
}
```

verificar logs
sls logs -f hero-trigger -t  