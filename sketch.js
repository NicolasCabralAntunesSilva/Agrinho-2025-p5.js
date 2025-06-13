// pre-load variables
let idle; let walk1; let walk2; let grass; let water; let mapa; let fonte;
let arvore; let girassol;
// pre-load numbers
let posX = 0; let posY = 0; let movendo = 0; movendoOsec = 0; let moedas = 5
// pre-load tables & arrays
let items = []
let fases = []

function preload() {
  idle = loadImage("idle.png")
  walk1 = loadImage("walk1.png")
  walk2 = loadImage("walk2.png")
  //grass = loadImage("grass.png")
  //water = loadImage("water.png")
  mapa = loadImage("mapa.png")
  fonte = loadFont("fonte.ttf")
  arvore = loadImage("arvore.png")
  girassol = loadImage("girassol.png")
  for (let i = 1; i != 10; i++) {
    fases[i] = loadImage("fase" + i + ".png")
  }
}
function setup() {
  createCanvas(600, 600);
}

function animation() {
  if (keyIsDown('w') && posY >= 0) {
    movendo = 1
    posY = posY - 5
  } if (keyIsDown('s') && posY <= 450) {
    movendo = 2
    posY = posY + 5
  } if (keyIsDown('a') && posX >= -5) {
    movendo = 3
    posX = posX - 5
  } if (keyIsDown('d') && posX <= 555) {
    movendo = 4
    posX = posX + 5
  }
  if(!keyIsDown('w') && !keyIsDown('s') && !keyIsDown('d') && !keyIsDown('a') ||
    (keyIsDown('w') && keyIsDown('s') && !keyIsDown('d') && !keyIsDown('a')) ||
    (keyIsDown('d') && keyIsDown('a') && !keyIsDown('w') && !keyIsDown('s')))
  {movendo = 0}
  
  if (movendo == 0) {
    image(idle, posX, posY, idle.width / 2, idle.height / 2)
  } else if (movendo >= 1) {
    if (movendoOsec <= 50) {
      movendoOsec++
      if (movendoOsec >= 25) {
        image(walk1, posX, posY, walk1.width / 2, walk1.height / 2)
      } else {
        image(walk2, posX, posY, walk2.width / 2, walk2.height / 2)
      }
    } else if (movendoOsec >= 50) {
      movendoOsec = 0
      image(walk2, posX, posY, walk2.width / 2, walk2.height / 2)
    }
  }
}

function draw() {
  background('#FFFFFF');
  image(mapa, 0, 0, 600, 600)
  animation() // Personagem com animação
  // moeda
  textFont(fonte)
  textSize(20)
  textAlign(CENTER, TOP)
  fill(255, 255, 0)
  stroke(0)
  strokeWeight(3)
  text("Moedas da colheita: " + moedas, width/2, 10); // texto de moedas
  // items
  for (let index in items) {
    image(items[index][0], // imagem
          items[index][1], items[index][2], // posição X e Y
          items[index][0].width / 2, items[index][0].height / 2) // escala X e Y
    items[index][3]++
    if (items[index][3] > items[index][6]) {
      items[index][3] = 0; items[index][4]++
    }
    
    if (items[index][4] >= 10) {
      moedas = moedas + items[index][5]
      items.splice(index, 1)
    } else {
    image(fases[items[index][4]], // imagem
          items[index][1]+items[index][0].width/8, items[index][2] - 20, // posição X e Y
          items[index][0].width / 4, items[index][0].height / 4) // escala X e Y
    }
  } // items de compra
  textSize(15)
  fill(139, 69, 19)
  // girassol compra
  square(550, 100, 50)
  text("Girassol", 500, 105);
  text("3 Moedas", 500, 120);
  image(girassol, 550, 98, girassol.width / 2, girassol.height / 2)
  // arvore compra
  square(550, 175, 50)
  text("Árvore", 500, 180);
  text("10 Moedas", 500, 195);
  image(arvore, 550, 173, arvore.width / 2, arvore.height / 2)
}

function mouseClicked() {
  if 
  (mouseX >= 550 && mouseX <= 600 &&
  mouseY >= 100 && mouseY <= 150 && moedas >= 3 ) {
    moedas = moedas - 3;
    items.push([girassol, posX, posY, 0, 1, 6, 100, 3]) // comprar girassol
    //3:tempo atual 4:estagio anim 5:ganho de moedas 6:tempo de espera 7:custo de moedas
  } else if
 (mouseX >= 550 && mouseX <= 600 &&
  mouseY >= 175 && mouseY <= 225 && moedas >= 10 ) {
    moedas = moedas - 10
    items.push([arvore, posX, posY, 0, 1, 25, 140, 10]) // comprar arvore
    //3:tempo atual 4:estagio anim 5:ganho de moedas 6:tempo de espera 7:custo de moedas
  }
 
}


