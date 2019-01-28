# Galar

    O Galar será responsavel por obter e enviar o report do status da execução de testes de back-end para a API KVASIR.
    Atualmente ele obtém os dados de teste que são executados e fornecidos pelo NEWMAN em um diretório específico, que também pode ser parametrizado. Desta forma o Galar busca o ultimo report de testes executado e transforma os dados em um objeto.
    Esse objeto é enviado por meio de uma requisição 'POST' até a API do KVASIR, para que o dado seja persistido em banco.

## Informações que o Galar consegue obter para posteriormente envia-las ao KVASIR.

*   projectName > Nome do projeto
*   condictions > Conjunto de valores extraídos do report gerado pelos testes junto ao NEWMAN.
*   metric > Especifica o tipo de teste de back-end que está sendo executado no momento
*   op > Operação do SonarQube
*   warning > Nível de testes mínimo a ser considerado como Warning
*   error > Indicador de valor mínimo aceitável para o status de erro
*   actual > Número de testes com erro
*   level > Status do teste (ERROR || WARN || OK)

### Exemplo da estruturação do objeto:

{
    "projectName": "accounts",
    "conditions": [{
            "metric": "critical_path",
            "op": "LT",
            "warning": 1",
            "error": "1",
            "actual": "90",
            "level": "ERROR"
        }
    ]
}

#### Link do projeto Kvasir:

https://github.com/thiago-pessini/Kvasir
