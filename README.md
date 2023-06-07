&nbsp;

&nbsp;
<div align="center">
	<img src="./public/fw.svg" alt="Your image title" width="300"/>
</div>
&nbsp;

&nbsp;

&nbsp;
# FreeWeather
O FreeWeather foi criado para suprir a necessidade de ter na palma da mão todas as informações de clima e previsões de qualquer local, matendo o usuário atualizado a todo momento das previsões da sua cidade e do mundo. O mesmo pede a localização atual do usuário para se ajustar e mostrar as previsões de acordo o local disponibilizado pelo GPS do dispositivo.

## Como foi feito?
Foi projetado utilizando a linguagem Javascript com a biblioteca React. Para a estilização foi utilizado o framework de CSS TailwindCSS, exceto algumas estilizações mais específicas que para serem alcançadas foi utilizado o CSS3. Todo o layout segue o padrão de responsividade do TailwindCSS, o tornando inteiramente responsivo, desde a tela do smartphone, tablet, até a tela do monitor.

## Quais bibliotecas foram usadas para compor o projeto?

- ApexCharts:
O ApexCharts é uma biblioteca de gráficos interativos em JavaScript que permite criar visualizações de dados dinâmicas e atrativas em páginas da web. Essa biblioteca compõe o gráfico de temperaturas mínimas e máximas onde leva o título de "Average Temperature".

- React Icons:
O React Icons é uma biblioteca popular que fornece um conjunto abrangente de ícones prontos para uso em aplicativos React. Foi usada para suprir a necessidade de icones na tabela de previsões, tornando a visualização mais interativa e de fácil compreensão.

- Axios:
O Axios é uma biblioteca JavaScript usada para fazer requisições HTTP em aplicativos web. A sua utilização fez com que fosse possível fazer requisições GET à API do OpenWeatherMap.org.

## Qual o seu fluxo de funcionamento?
Ao primeiro acesso o usuário será questionado pelo próprio navegador se deseja compartilhar a sua localização, assim poderemos fornecer informações com base em sua localização atual dada pelo GPS.

Em seguida é executada a requisição GET na API do OpenWeatherMap para obter os dados de clima e previsões mais recentes (nesse momento o usuário verá uma tela de carregamento para aguardar a requisição se completar). 

Então toda a interface é alimentada com informações obtidas da API, logo a frente temos dois painels, um com o clima atual e gráfico com as máximas e mínimas durante o dia:
<div align="start">
	<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/37283938/242313110-e913f4fa-ea05-439a-85f4-13de0afa2176.png" height="400px" alt="Weather Dashboard">
</div>


Outro com uma tabela das previsões pros próximos dias:
<div align="start">
	<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/37283938/242310564-45414a77-8a58-44bc-b558-4def68365c0c.png" height="400px" alt="Weather Table">
</div>

A barra de pesquisa no topo permite buscar qualquer local, bairro ou cidade do mundo. Sua forma de pesquisa é realizada através de uma requisição na API de geolocalização do OpenWeatherMap (valores de latitude e longitude são obtidos nesse processo), retornando 5 locais que mais se assemelham as palavras chaves pesquisadas (se limitando a no mínimo 4 caracteres para iniciar uma pesquisa, para evitar chamadas muito ambíguas e desnecessárias à API, reduzindo sua carga). Ao clicar no local é carregado na página todas as informações climáticas daquele local em específico.

Na parte inferior da página contém um botão (Next), sua função é a de exibir no painel principal as informações de previsão dos próximos dias. A cada clique é avançado um dia.

Tudo isso compõe o FreeWeather o tornando uma opção simples, objetiva, e de fácil leitura para acompanhar as condições climáticas mais recentes e futuras.

## Atualizações futuras (WIP):
- [ ] Documentar todo o código
- [ ] Implementar funcionalidades do menu lateral
- [ ] Página de boas vindas
- [ ] Tradução da página com base no idioma padrão do usuário
- [ ] Notificações flutuantes



<div align="center"><i> <br>Made with ❤️ by <strong>A. C. Pereira</strong>.<i></div>
