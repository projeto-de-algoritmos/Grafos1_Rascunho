
# Rascunho

**Conteúdo da Disciplina**: Grafos 1

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 19/0085291  | Caio César Oliveira |
| 19/0091703  |  Lucas Henrique Lima de Queiroz |

## Sobre 
​	O Rascunho é uma aplicação web cujo intuito é servir como uma ferramenta para desenhos minimalistas. Por isso o nome: não temos o intuito de dar aos usuários uma ferramenta completa de desenho, como o Microsoft Paint ou o LibreOffice Draw, mas sim uma forma de fazer desenhos simples, i.e., rascunhos. Isso tudo sem ter a necessidade de sair do navegador.

​	O "quadro" que o usuário desenha é uma grid quadrada, representada por um grafo (cujas adjacências são representadas por uma lista de adjacências). A aplicação dá diversos modos de uso: "Pincel", "Borracha", "Arco-íris" (cores aleatórias) e "Preencher área". Para os três primeiros modos, o usuário pode escolher a área da grid que quer modificar, isto é, o tamanho da borracha, pincel e arco-íris. Além disso, o usuário tem a liberdade de escolher a cor com a qual ele quer pintar seu rascunho.

​	O modo "Preencher área" é implementado por meio do algoritmo Flood Fill. Trazemos a opção para o usuário de ativar/desativar o efeito do preenchimento, ou seja, de ver ou não o Flood Fill agindo com um intervalo de tempo entre as pinturas. Por padrão, esse efeito está desativado.

​	Como o quadro é uma matriz quadrada, decidimos adicionar a possibilidade de ver as células dessa matriz. Além disso, o usuário tem a opção de exportar o seu rascunho para .png. O usuário também pode apagar o seu rascunho.

​	Por fim, também pensamos nas opções de desfazer/refazer alterações no rascunho. No entanto, por falta de tempo, não conseguimos implementar essas funcionalidades. Os botões que as ativariam estão lá, mas apenas trazem um aviso de que a funcionalidade não está implementada.

## Screenshots

https://user-images.githubusercontent.com/54439337/235524118-618b307d-1975-4428-90a5-24787ef25a93.mp4

https://user-images.githubusercontent.com/54439337/235524435-9df3ac70-9c4a-432f-af39-1f81894c4c01.mp4

https://user-images.githubusercontent.com/54439337/235524623-064edf2b-1f09-4a82-a28c-8f7c7603570b.mp4

https://user-images.githubusercontent.com/54439337/235525073-88b18f7e-c982-404d-8748-2018f22e9ddf.mp4

## Tecnologias 

**Linguagens**: HTML, CSS e Javascript.

## Uso 
O software pode ser utilizado na máquina local ou via Gitpages.

### Gitpages

Acesse o Gitpages do projeto: [https://projeto-de-algoritmos.github.io/Grafos1_Rascunho/](https://projeto-de-algoritmos.github.io/Grafos1_Rascunho/).

### Máquina local

1.  Clone o repositório: 

   `git clone git@github.com:projeto-de-algoritmos/Grafos1_Rascunho.git`

2. Abra o arquivo `index.html` no navegador utilizando um servidor local (como o [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)). Abrir o arquivo diretamente no navegador não funcionará. Isso é porque o navegador aponta um erro do CORS.

## Vídeo de Apresentação

- [Link para vídeo de apresentação do projeto](https://youtu.be/pno71yiAdTo)
- O vídeo de apresentação também pode ser encontrado no arquivo `presentation-video.mp4`, na pasta `presentation_video`. 

Obs: Como o vídeo ficou grande, não conseguimos fazer o upload do arquivo inteiro no git, entáo cortamos o final para fazer o upload.
