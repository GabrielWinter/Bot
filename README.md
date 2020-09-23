
# Pré-requisitos

- Node.js
- ferramentas de linha de comando git
- Um editor de texto (eu recomendo [Notepad ++] (https://notepad-plus-plus.org))
- Uma conta Nike.com com um cartão de crédito já salvo na conta para pré-preenchimento

## Instale o Node.js

- Instale [Node.js (LTS)] (https://nodejs.org/en/download)
- Teste a instalação do Node.js: primeiro abra um terminal (no Windows, você pode fazer `WIN + R`, em seguida, digite` cmd` e pressione `ENTER`), em seguida, digite` node -v` e você deve ver algo como ` v10.16.0` (a versão atual a partir de agora).

2. Certifique-se de estar no diretório do bot dentro do terminal

`cd nike-buy-bot`

3. Instale as dependências do Node.js

`npm install`

4. Usando um editor de texto, edite o arquivo `bot.js` no diretório bot. Neste arquivo, procure a seção chamada `Parâmetros a serem definidos`. Estes são os parâmetros a serem alterados:

- do utilizador
- passe
- cv_code
- Tamanho
- url
- depurar
- Comprar

5. Execute o bot

Depois de configurar o bot, você pode executá-lo

`node bot.js

Idealmente, você o executaria bem na hora da queda.

# Screenshots

O bot funciona em uma série de 9 "rodadas", que incluem carregar a página do sapato, localizar e clicar no tamanho do sapato desejado, adicioná-lo ao carrinho, fazer login na sua conta Nike.com e enviar um pedido.

## Rodada 9 - Clicando no botão "Enviar pedido"
(não mostrado aqui)