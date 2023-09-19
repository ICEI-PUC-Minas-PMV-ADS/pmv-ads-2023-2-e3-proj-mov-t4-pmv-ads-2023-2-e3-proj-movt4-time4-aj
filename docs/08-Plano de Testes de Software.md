# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Não deixe de enumerar os casos de teste de forma sequencial e de garantir que o(s) requisito(s) associado(s) a cada um deles está(ão) correto(s) - de acordo com o que foi definido na seção "2 - Especificação do Projeto". 

Por exemplo:
 
| **Caso de Teste** 	| **CT-01 – Cadastrar perfil** 	|
|:---:	|:---:	|
|	Requisito Associado 	|RF-01 - A aplicação deve apresentar, na página principal, a cadastro de uma página personalizada para um serviço|
| Objetivo do Teste 	| Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos 	|- Acessar a aplicação - Clicar em "Criar conta" - Preencher os campos obrigatórios (e-mail, nome, sobrenome, celular, senha, confirmação de senha) - Aceitar os termos de uso - Clicar em "Registrar" |
|Critério de Êxito | - O cadastro foi realizado com sucesso. |
|  	|  	|
| **Caso de Teste**  	| **CT-02 – Efetuar login**	|
|Requisito Associado | RF-02	- A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail e senha cadastrado  . |
| Objetivo do Teste 	| Verificar se o usuário consegue realizar login. |
| Passos 	| - Acessar a aplicação - Clicar no botão "Entrar" - Preencher o campo de e-mail - Preencher o campo da senha - Clicar em "Login" |
|Critério de Êxito |  O login foi realizado com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-03 – Pagamento antecipado** |
|	Requisito Associado 	| RF-03 - A aplicação deve permitir que o cliente realize o pagamento antecipado pelo serviço selecionado |
| Objetivo do Teste 	|Verificar se o usuário consegue realizar o pagamento antecipadamente. |
| Passos 	| - Acessar a aplicação - Acessar pagnina de serviços - Selecionar o serviço desejado - Clicar em pagamento - Informar metodo de pagamento - Realizar o pagamento.
|Critério de Êxito | - Antecipação do pagamento realizada com sucesso. |
|  	|  	|
| **Caso de Teste** 	| **CT-04 –Notificação de agendamentos** 	|
|	Requisito Associado 	| RF-04 - A aplicação deve notificar o usuário sobre atualizações no agendamento contratado|
| Objetivo do Teste 	| Verificar se a aplicação fornece notificações de atualizações dos serviços solicitados.|
|Critério de Êxito |  Notificações a cada atualização realizada. |
|  	|  	|
| **Caso de Teste** 	| **CT-05 – Acompanhamento das reservas em tempo real** 	|
|	Requisito Associado 	| RF-05 - A aplicação deve apresentar, na página de serviços contratados o acopanhamento das reservas contratadas em tempo real |
| Objetivo do Teste 	| Verificar o andamento do serviço contratado em tempo real. |
|  	|  	|
| **Caso de Teste** 	| **CT-06 - Criação de promoções** 	|
|	Requisito Associado 	| RF-06 - A aplicação deve permitir a criação de promoções por parte dos prestadores de serviços. |
| Objetivo do Teste 	| Verificar se o usuário consegue realizar a criação de promoções. |
|  	|  	|
| **Caso de Teste** 	| **CT-07 - Agendar e gerar rotas para serviços de entrega** |
| Requisitos Associados | RF-07 -  O aplicativo deve agendar e gerar rotas para serviços de entrega.|
| Objetivo do teste     | Verificar se a aplicação agende e gere a rota para o endereço dos serviços contratados.|
|  	|  	|
| **Caso de Teste** 	| **CT-08 - Dashboard** 	|
|	Requisito Associado 	| RF-08 -  O aplicativo deve exibir um dashboard. |
| Objetivo do Teste 	| Verificar se a aplicação possui um dashboard interativo com informações importantes e que seja de facil vizualiação para o usuário.|
|  	|  	|
| **Caso de Teste** 	| **CT-09 - O aplicativo deve emitir relatórios.** 	|
|	Requisito Associado 	|RF-09 -  O aplicativo deve emitir relatórios. |
| Objetivo do Teste 	| Verificar se a aplicação emite os relaatórios solicitados pelo usuário. |
