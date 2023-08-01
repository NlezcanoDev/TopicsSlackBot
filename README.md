# TopicsSlackBot

Se trata de un bot que genera temáticas aleatorias para reuniones virtuales generadas por IA.

## Contenido

1. [Desarrollo](#desarrollo)
2. [Tecnologías](#tecnologías)
3. [Comandos](#comandos)
4. [Proceso](#proceso)

## Desarrollo

El objetivo del desarrollo es generar un bot capaz de asignar temáticas diarias durante uno o varios momentos programados durante la jornada laboral.
La idea como proyecto de aprendizaje y desarrollo de tecnologías de IA como un proceso utilizable.

El proceso comienza desde la instalación del bot en el entorno de trabajo, asignándole un canal de trabajo para enviar notificaciones periodicamente. Este proceso puede ser alterado parcialmente por los usuarios para tener una experiencia amigable y no tan invasiva por parte del bot.

## Tecnologías

-   [Node js](https://nodejs.org/es/docs)
-   [Express js](https://expressjs.com/es/)
-   [Slack Api](https://api.slack.com/)
-   [Open AI Api](https://openai.com/)
-   [Cronjobs](https://github.com/kelektiv/node-cron)

## Comandos

-   `/prefiero [temática]` : Cambia la última temática asignada por Topic-bot para personalizar la experiencia y entrenar a la IA para futuras recomendaciones

-   `/omitir` : Omite la próxima daily/reunión programada para evitar notificaciones y consumo extra.

-   `/posponer-meet [hh:mm]` : Pospone el horario para la próxima reunión respetando horarios laborales

-   `/volvemos-el [dd]` : Indica el dia de retorno. Pensado para usos de feriados o dias donde no se trabaja. Se busca omitir notificaciones y temáticas hasta la fecha (en dias) establecida

-   `/seleccionar-canal [#canal]` : Modifica el canal donde se realizan las alertas

> Todos estos comandos pueden realizarse desde el chat privado con Topic-bot o desde el canal establecido para el funcionamiento

## Proceso

[ X ] &emsp;Integración con Apis de Slack y OpenAi

[ X ] &emsp;Creación de comandos

[ X ] &emsp;Captura de logs de error

[&emsp;]&emsp;Customización de cronjob mediante comandos

[&emsp;]&emsp;Integración hacía mas de un canal
