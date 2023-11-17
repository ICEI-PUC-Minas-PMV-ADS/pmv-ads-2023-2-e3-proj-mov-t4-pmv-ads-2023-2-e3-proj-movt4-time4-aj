# Especificações do Projeto

A definição exata do problema e os pontos mais relevantes a serem tratados neste projeto foi consolidada com a participação dos usuários em um trabalho de imersão feita pelos membros da equipe a partir da observação dos usuários em seu local natural e por meio de entrevistas. Os detalhes levantados nesse processo foram consolidados na forma de personas e histórias de usuários. 

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

| ![mulher 35 anos](https://github.com/DevosAlliance/Agendamento/assets/111004815/0ef5e1dd-7bc7-4953-af7a-cb59ff1dff53) | <h2 align="right"><b>Carla Soares</b></h2></br></br></br> <p align="left">Idade: 35 anos <br/><br/> Ocupação: Empresa Prestadora de Serviços. |
| --- | --- |
| Motivações <ul><li>Carla é proprietária de um salão de beleza de médio porte e está em busca de uma solução que facilite a marcação de horários para seus clientes. Ela deseja um aplicativo que ofereça uma página personalizada para seu salão, onde possa exibir informações sobre os serviços, disponibilidade de horários e preços. Além disso, ela quer uma plataforma que permita receber os pagamentos antecipados para evitar cancelamentos de última hora.</li></ul> | Frustrações <br/> <ul><li>Carla já tentou usar outros aplicativos de agendamento, mas enfrentou dificuldades com a personalização das páginas e a falta de integração com sistemas de pagamento. Ela também teve problemas com notificações automáticas que não foram entregues aos clientes, resultando em faltas e atrasos.</ul> |
| ![homem 28 anos](https://github.com/DevosAlliance/Agendamento/assets/111004815/4a2c1f4c-0f07-44c7-b07f-6d04f8072bfb) | <h2 align="right"><b>Lucas Silva</b></h2></br></br></br> <p align="left">Idade: 28 anos <br/><br/> Ocupação: Profissional Autônomo. <br/>|
| Motivações <ul><li>Lucas é um personal trainer que trabalha por conta própria e está procurando uma maneira eficiente de agendar as sessões de treinamento com seus clientes. Ele deseja um aplicativo que o ajude a organizar seus horários e que ofereça a possibilidade de receber feedback e avaliações dos clientes para melhorar sua reputação profissional.</li></ul> | Frustrações <br/> <ul><li> Lucas já tentou utilizar planilhas e aplicativos genéricos de calendário, mas eles não atendiam suas necessidades específicas como profissional autônomo. Ele também encontrou dificuldades para receber pagamentos de forma antecipada, o que resultou em algumas faltas de clientes.</ul> |
| ![mulher 30 anos](https://github.com/DevosAlliance/Agendamento/assets/111004815/c8af415a-f016-49cb-be46-5d7257259741) | <h2 align="right"><b>Isabela Rodrigues</b></h2></br></br></br> <p align="left">Idade: 30 anos <br/><br/> Ocupação: Cliente Individual</p> |
| Motivações <ul><li>Isabela é uma profissional com uma agenda agitada e está sempre buscando maneiras de otimizar seu tempo. Ela precisa agendar consultas médicas, sessões de fisioterapia e aulas de idiomas, além de reservar ingressos para eventos culturais. Ela deseja um aplicativo que reúna todas essas possibilidades em uma única plataforma, com lembretes automáticos para evitar esquecimentos.</li></ul> | Frustrações <br/> <ul><li>Isabela já enfrentou dificuldades para encontrar informações atualizadas sobre horários disponíveis em outros aplicativos e sites de empresas. Além disso, algumas vezes teve problemas para realizar pagamentos online de forma segura, o que a deixou receosa em usar determinados serviços.</ul> |
| ![homem 40 anos](https://github.com/DevosAlliance/Agendamento/assets/111004815/9e77780d-4f38-49d5-bfaf-648e46cf90aa) | <h2 align="right"><b>Rafael Almeida</b></h2></br></br></br> <p align="left">Idade: 40 anos <br/><br/> Ocupação: Estabelecimento Comercial</p> |
| Motivações <ul><li>Rafael é gerente de um restaurante movimentado e precisa gerenciar as reservas de mesas para o almoço e jantar. Ele procura uma solução que permita acompanhar as reservas em tempo real, com a possibilidade de receber feedback dos clientes e oferecer promoções especiais para atrair mais reservas durante horários menos concorridos.</li></ul> | Frustrações <br/> <ul><li>Rafael já tentou utilizar sistemas de reservas em papel e em outros aplicativos, mas enfrentou problemas de overbooking e dificuldades para gerenciar as reservas com precisão. Ele também teve experiências negativas com aplicativos que não ofereciam um suporte ao cliente adequado quando surgiam problemas técnicos.</ul> |
| ![homem 32 anos](https://github.com/DevosAlliance/Agendamento/assets/111004815/2fbcebae-b308-4c52-bac0-5e179a19c9b7) | <h2 align="right"><b>André Oliveira</b></h2></br></br></br> <p align="left">Idade: 32 anos <br/><br/> Ocupação: Cliente com Mão de Obra Remota.</p> |
| Motivações <ul><li>André é dono de uma empresa de entregas e precisa coordenar os horários de sua equipe de entregadores. Ele busca um aplicativo que permita agendar rotas de forma eficiente, otimizando o tempo de seus funcionários e melhorando a qualidade do serviço prestado aos clientes.</li></ul> | Frustrações <br/> <ul><li>André já tentou utilizar aplicativos de mapas e rotas, mas eles não ofereciam recursos específicos para agendamento de mão de obra remota. Ele também teve dificuldades para integrar o sistema de pagamento com os entregadores, o que causou atrasos nos pagamentos.</ul> |
| ![Gabriel Fiuza](https://github.com/DevosAlliance/Agendamento/assets/114194318/e702d486-561a-44af-8eb6-f83e81fe8a75) | <h2 align="right"><b>Gabriel Fiuza</b></h2></br></br></br> <p align="left">Idade: 25 anos <br/><br/> Ocupação: Barbeiro.<br/>Gabriel tem uma barbearia e utiliza um aplicativo genérico para agendamento.</p>|
| Motivações <ul><li>Gabriel gostaria de visualizar (dashboard) e emitir relatórios para mensurar a sua produtividade em um aplicativo de reserva de horário para seu serviço. E ainda poder receber pagamentos de forma antecipada para as reservas realizadas.</li></ul> | Frustrações <br/> <ul><li>Gabriel utiliza um aplicativo que realiza agendamentos mas não contém um dashboard e não recebe pagamentos</ul> |

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE` | PARA ... `MOTIVO/VALOR` |
|----------------------|----------------------------------|------------------------|
| Carla Soares         | Um aplicativo com página personalizada para meu salão de beleza, exibindo informações sobre serviços, horários e preços | Facilitar a marcação de horários para meus clientes e oferecer atendimento personalizado |
| Carla Soares         | Receber pagamentos antecipados para evitar cancelamentos de última hora | Diminuir o número de faltas e otimizar a agenda do salão |
| Lucas Silva          | Um aplicativo que organize meus horários e permita receber feedback dos clientes | Melhorar minha reputação profissional e oferecer um serviço eficiente |
| Lucas Silva          | Receber pagamentos antecipados pelas sessões de treinamento | Evitar faltas de clientes e garantir minha renda |
| Isabela Rodrigues    | Um aplicativo que reúna agendamento de consultas médicas, fisioterapia, aulas de idiomas e reserva de eventos | Otimizar meu tempo e evitar esquecimentos |
| Isabela Rodrigues    | Informações atualizadas sobre horários disponíveis e método seguro para pagamentos | Tornar o processo de agendamento mais confiável e prático |
| Rafael Almeida       | Acompanhar reservas em tempo real e receber feedback dos clientes | Melhorar o atendimento e atrair mais reservas em horários menos concorridos |
| Rafael Almeida       | Evitar problemas de overbooking e gerenciar reservas com precisão | Garantir um fluxo adequado de clientes no restaurante |
| André Oliveira       | Agendar rotas de forma eficiente e otimizar o tempo dos entregadores | Melhorar a qualidade do serviço prestado aos clientes |
| André Oliveira       | Facilitar a integração do sistema de pagamento com os entregadores | Evitar atrasos nos pagamentos e garantir a satisfação da equipe |
| Gabriel Fiuza        | Um aplicativo de reserva de horário com dashboard e relatórios de produtividade | Ter melhor controle sobre o negócio e identificar oportunidades de melhoria |
| Gabriel Fiuza        | Receber pagamentos antecipados para as reservas | Garantir comprometimento dos clientes e reduzir o número de faltas |

## Modelagem do Processo de Negócio 

## Análise da Situação Atual e Proposta de Solução

Atualmente, os agendamentos para os diversos profissionais abordados, como Carla Soares, proprietária de um salão de beleza, Lucas Silva, personal trainer autônomo, Isabela Rodrigues, cliente com uma agenda ocupada, Rafael Almeida, gerente de restaurante, e André Oliveira, empresário de entregas, são conduzidos manualmente através de comunicações por telefone ou presencialmente. Essa abordagem consome considerável tempo e esforço tanto para os profissionais quanto para seus clientes, resultando em ineficiências e desgastes desnecessários.

A solução proposta, o **AgendeJá**, visa resolver esses desafios ao introduzir um sistema automatizado e dinâmico de agendamento. Ao adotar essa solução, os seguintes benefícios serão alcançados:

1. **Agilização do Agendamento:** O AgendeJá eliminará a necessidade de agendamentos manuais via telefone ou pessoalmente. Os profissionais, como Carla, Lucas, Rafael e André, poderão gerenciar suas agendas de forma eficiente através da plataforma, economizando tempo precioso.

2. **Facilitação para Clientes:** Clientes, como Isabela, terão acesso a uma plataforma intuitiva que lhes permitirá agendar compromissos de maneira rápida e conveniente, evitando a espera em filas de telefone e permitindo uma visão clara das disponibilidades.

3. **Personalização e Informações Detalhadas:** O aplicativo fornecerá uma página personalizada para profissionais, como Carla e Gabriel, onde eles poderão exibir detalhes de seus serviços, preços e horários disponíveis. Isso permite uma experiência mais informativa para os clientes.

4. **Notificações e Lembretes Automatizados:** O sistema enviará lembretes e notificações automáticas aos clientes, como Isabela, para ajudá-los a lembrar de compromissos agendados. Isso reduzirá as chances de esquecimentos e atrasos.

5. **Sincronização e Acesso Multiplataforma:** A sincronização automática entre dispositivos permitirá que os profissionais, como André, gerenciem suas agendas de qualquer lugar. A compatibilidade multiplataforma também garante que clientes de diferentes sistemas operacionais possam acessar o serviço.

6. **Pagamentos Antecipados:** O AgendeJá oferecerá a funcionalidade de receber pagamentos antecipados, algo que Carla, Lucas e Gabriel valorizam. Isso ajudará a minimizar as faltas de última hora e garantir a receita esperada.

7. **Feedback e Avaliações:** Profissionais, como Lucas e Rafael, terão a oportunidade de receber feedback e avaliações dos clientes diretamente na página da google play ou app store. Isso permitirá melhorias contínuas nos serviços e o fortalecimento da reputação profissional.

A solução AgendeJá visa transformar a maneira como os agendamentos são feitos, otimizando a eficiência tanto para os profissionais quanto para seus clientes, como também fornecendo um ambiente seguro e conveniente para transações e interações. Ao atender às necessidades específicas de diversas personas, a aplicação se posiciona como uma solução abrangente para a gestão de agendamentos em várias esferas profissionais.
 
### PROCESSO DE AGENDAMENTO

Oportunidade de melhoria no processo de agendamento: Poderíamos agilizar o processo, diminuindo a quantidade de clicks e telas necessárias para consluir a tarefa.

![Processo 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-movt4-time4-aj/blob/main/docs/img/modelagem_do_processo_de_negocio.jpeg)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-movt4-time4-aj/blob/main/docs/img/indicadores_de_desempenho.png) 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
| --- | --- | --- |
| RF-01 | O aplicativo deve permitir o cadastro de uma página personalizada para um serviço. | ALTA |
| RF-02 | O aplicativo deve permitir o agendamento de horário na página do serviço. | ALTA |
| RF-03 | O aplicativo deve permitir que os clientes escolha a forma de pagamento . | ALTA |
| RF-04 | O aplicativo deve enviar notificações sobre seus agendamentos. | BAIXA |
| RF-05 | O aplicativo deve permitir o acompanhamento das reservas em tempo real. | ALTA |

### Requisitos não Funcionais

| ID | Descrição do Requisito | Prioridade |
| --- | --- | --- |
| RNF-01 | O sistema deve ser fácil de usar e intuitivo para todos os usuários, independentemente de sua experiência com tecnologia. | ALTA |
| RNF-02 | O sistema deve ter desempenho rápido e responsivo, garantindo uma experiência fluída para os usuários. | ALTA |
| RNF-03 | A segurança dos dados dos clientes deve ser garantida, protegendo informações pessoais e de pagamento. | ALTA |
| RNF-04 | O sistema deve estar disponível em múltiplas plataformas, como smartphones, tablets e computadores. | ALTA |
| RNF-05 | O sistema deve oferecer suporte ao cliente eficiente para resolver problemas técnicos e questões relacionadas ao serviço. | ALTA |
| RNF-06 | O sistema de pagamento integrado deve ser seguro e confiável, garantindo que transações sejam realizadas corretamente. | ALTA |
| RNF-07 | O sistema deve ter uma interface amigável e atraente para os usuários, tornando a experiência de uso mais agradável. | ALTA |
| RNF-08 | O sistema deve aderir aos padrões de acessibilidade da Web para garantir que pessoas com deficiências visuais possam usar leitores de tela e outras tecnologias assistivas | ALTA |
| RNF-09 | O sistema deve ser compatível com diferentes navegadores web populares, como Chrome, Firefox, Safari e Edge, garantindo uma experiência consistente para os usuários. | MÉDIA |
| RNF-010 |O tempo de carregamento inicial do sistema, após o usuário iniciar a aplicação, não deve exceder 15 segundos, garantindo uma experiência inicial rápida. | ALTA |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
| 01 | O sistema de pagamento integrado ao aplicativo deve utilizar provedores de pagamento aprovados e seguros. |
| 02 | O aplicativo deve estar em conformidade com as leis e regulamentações de proteção de dados e privacidade do país onde será utilizado.|
| 03 | O aplicativo deve ser testado rigorosamente antes do lançamento para garantir sua estabilidade e segurança. |
| 04 | Todas as informações e dados dos clientes devem ser tratados de forma confidencial e não devem ser compartilhados com terceiros sem autorização prévia. |
| 05 | O aplicativo deve ser escalável, permitindo futuras melhorias e atualizações conforme necessário. |
| 06 | O aplicativo deve ser hospedado em servidores confiáveis e com alta disponibilidade para garantir o acesso contínuo dos usuários. |
| 07 | Todas as comunicações entre o aplicativo e os servidores devem ser criptografadas para garantir a segurança das informações transmitidas. |
Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

Definidos os requisitos funcionais, não funcionais e restrições foi elaborado o diagrama de casos de uso apresentado abaixo. A tabela que vem a seguir exibe, de maneira sucinta, uma descrição de cada casos de usos. 

<img src="/docs/img/02-caso-uso-b.png" width=80% height=80%>

| CASO DE USO | ATOR | DESCRIÇÃO |
|----------------------|----------------------------------|------------------------|
|Realizar Cadastro | Usuário | O usuário interessado na contratação de serviços se cadastra no App. Deverão ser fornecidos nome, email, cell de contato e endereço do usuário, alem de definidos o login e senha de acesso.|
| Fazer Login | Usuário	| Para acessar o App o usuário cadastrado realiza login a partir de login e senha. |
| Selecionar Profissional	| Usuário |O usuário seleciona o profissional da sua preferência para realização dos serviços.|
| Selecionar Serviço | Usuário |O usuário seleciona quais os serviços oferecidos pelo salão que deseja realizar.|
| Realizar Agendamento | Usuário |O usuário seleciona a opção de horário da sua preferência dentre as opções apresentadas pelo App.|
| Realizar Pagamento | Usuário |O usuário realiza o pagamento antecipado do serviço escolhido. |
| Atualizar Profissional | Gerente |A gerente cadastra ou remove profissional que presta serviço no salão. |
| Atualizar Serviço | Gerente |A gerente cadastral ou remove serviços atribuído a determinado profissional cadastrado.|
| Gerenciar Agendamentos |Gerente |A gerente acompanha os agendamentos, desbloqueando os horários dos clientes que cancelaram o serviço ou bloqueando horário de profissional que não poderá atender determinado dia.|

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

|  | RF-001 | RF-002 | RF-003 | RF-004 | RF-005 | RF-006 | RF-007 | RF-008 | RF-009 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RF-001 | x | x | x | x | x | x | x | x | x |
| RF-002 | x |  |  |  |  |  |  |  |  |
| RF-003 | x |  |  |  |  |  |  |  |  |
| RF-004 | x |  |  |  |  |  |  |  |  |
| RF-005 | x |  |  |  |  |  |  |  |  |
| RF-006 | x |  |  |  |  |  |  |  |  |
| RF-007 | x |  |  |  |  |  |  |  |  |
| RF-008   | x |  |  |  |  |  |  |  |  |
| RF-009 | x |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

Utilizando o modelo de gráfio de Gantt, conforme a figura a seguir definimos o planejamento de tempo para o projeto:

<img src="/docs/img/02-gerenciamento-tempo-b.png" width=100% height=100%>


## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

Conforme a figura a seguir definimos o gerenciamento de equipe para o projeto:

<img src="/docs/img/02-gerenciamento-equipe-b.png" width=100% height=100%>


## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

Conforme a figura a seguir definimos o orçamento necessário para produção do projeto:

<img src="/docs/img/02-gestao-orcamento-b.png" width=50% height=50%>



