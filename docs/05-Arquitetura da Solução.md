# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-movt4-time4-aj/assets/111004815/4a84aa06-3b7f-45d6-8b3d-5ec809dc1c80)


## Modelo ER
![Diagrama MER](https://raw.githubusercontent.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-movt4-time4-aj/0dd16b1891bf310944ac4aee971dfb76a98cf3a8/docs/img/MER%20AGENDAMENTO.drawio.svg)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

|**Linguagens de programação utilizadas**|
|----------------------------------------|
|Javascript|

|**Frameworks utilizados**|
|----------------------------------------|
|React|
|React-native|
|Node.js|

|**Banco de dados**|
|------------------|
|MongoDB|

|**Hospedagem**|
|------------------|
|Localhost|

|**Design**|
|------------------|
|Figma|


## Hospedagem

Definimos que para esta etapa iremos utilizar a hospedagem em local host.

## Qualidade de Software

|**Características**|**Subcaracterísticas**|**Justificativas**|
|-------------------|----------------------|------------------|
| Funcionalidade | Adequação - Acurácia - Segurança de acesso | A aplicação possibilitará ao usuário que veja se haverá disponibilidade no horário desejado, sendo assim possibilitando a agenda do horário préviamente. A aplicação tambem contará com autenticação do usuário através de email cadastrado e senha.|
| Usabilidade | Inteligibilidade - Apreesibilidade - Comportamento em relação ao tempo  | A aplicação será fácil de usar e intuitiva para todos os usuários, independentemente de sua experiência com tecnologia. Tambem definimos que a aplicação deve ter desempenho rápido e responsivo, garantindo uma experiência fluída para os usuários.|
| Portabilidade | Adaptabilidade - Facilidade para ser instalado | Aplicação deverá ser compativel com diferente dispositivos movéis, reolução de tela e que haja facilidade na instalação assim conteplando o maior número de usuários. |
| Manutenabilidade | Modificabilidade - Estabilidade - Testabilidade | Aplicação deverá ser testada frequentemente em busca de possiveis falhas e erros, que deverão ser corrigidos via atualizações para manter a estabilidade da aplicação. |
|

