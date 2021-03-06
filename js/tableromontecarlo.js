function TableroMontecarlo()
{
	this.cardWidth = 216 * 0.4;
	this.cardHeight = 308 * 0.4;

	this.posX = 10;
	this.posY = 10;

	this.largo = 5;
	this.ancho = 5;
	this.tablero = new Array(this.ancho);

	this.deckPosX = this.cardWidth * 6;
	this.deckPosY = 50;
	
	for(var i = 0; i < 5; i++) this.tablero[i] = new Array(this.largo);
}

TableroMontecarlo.prototype.setGamelogic = function(gameLogic)
{
	this.gameLogic = gameLogic;
}

TableroMontecarlo.prototype.llenarTablero = function(baraja)
{
	if(baraja.numberOfCards() < 25) return;

	for(var i = 0; i < this.ancho; i++)
	{
		for(var j = 0; j < this.largo; j++)
		{
			var posX = this.posX + j * this.cardWidth;
			var posY = this.posY + i * this.cardHeight;

			this.tablero[i][j] = new PosicionTablero();
			this.tablero[i][j].llenarPosicion(baraja.draw(), posX, posY, i, j);
		}
	}

	this.setSprite("facedown_blue");
}

TableroMontecarlo.prototype.setSprite = function(img_src)
{
	this.sprite = game.add.sprite(this.deckPosX, this.deckPosY, img_src);
	this.sprite.scale.setTo(.4, .4);
	this.sprite.inputEnabled = true;
	this.sprite.events.onInputDown.add(function()
	{
		this.consolidate();
		this.refill();
		if(this.checkLoseCondition())
		{
			this.gameLogic.text.text = "No more movements ):,\n cards remaining: " + gameLogic.remainingCards;
		}
	}, this);

	if(this.checkLoseCondition())
	{
		this.gameLogic.text.text = "No more movements ):,\n cards remaining: " + gameLogic.remainingCards;
	}
}

TableroMontecarlo.prototype.consolidate = function()
{
	for(var i = 0; i < this.ancho; i++)
	{
		for(var j = 0; j < this.largo; j++)
		{
			if(this.tablero[i][j] == null)
			{
				var next = this.findNextValid(i, j);
				if(next != null)
				{
					var posX = this.posX + j * this.cardWidth;
					var posY = this.posY + i * this.cardHeight;

					var sprite = this.tablero[next.idX][next.idY].sprite; 
					//var sprite = next;

					sprite.x = posX;
					sprite.y = posY;

					//this.tablero[i][j] = next;
					this.tablero[i][j] = this.tablero[next.idX][next.idY];
					this.tablero[next.idX][next.idY] = null;
					//next = null;					
					this.tablero[i][j].idX = i;
					this.tablero[i][j].idY = j;

					//console.log(this.tablero[i][j]);
				}
			}
		}
	}	
}

TableroMontecarlo.prototype.refill = function()
{
	for(var i = 0; i < 5; i++)
	{
		for(var j = 0; j < 5; j++)
		{
			if(this.tablero[i][j] == null)
			{
				var newCard = baraja.draw();
				if(newCard == null) 
				{
					this.sprite.destroy();
					this.setSprite("empty_deck");
					return;
				}

				var posX = this.posX + j * this.cardWidth;
				var posY = this.posY + i * this.cardHeight;
				this.tablero[i][j] = new PosicionTablero();
				this.tablero[i][j].llenarPosicion(newCard, posX, posY, i, j);
			}
		}
	}
}

TableroMontecarlo.prototype.checkLoseCondition = function()
{	
	var xArr = [-1, -1, 0, 1, 1, 1, 0, -1];
	var yArr = [0, -1, -1, -1, 0, 1, 1, 1];

	for(var i = 0; i < 5; i++)
	{
		for(var j = 0; j < 5; j++)
		{
			for(var k = 0; k < 8; k++)
			{
				var currValue = this.tablero[i][j].carta.valor; 
				var pairX = xArr[k] + j;
				var pairY = yArr[k] + i;
				if(pairX >= 0 && pairY >= 0 && pairX < 5 && pairY < 5)
				{
					var pairValue = this.tablero[pairY][pairX].carta.valor;
					if(pairValue == currValue) 
					{
						return false;
					}
				}
			}
		}
	}

	return true;
}

TableroMontecarlo.prototype.findNextValid = function(idX, idY)
{	
	var i = idX;
	var j = idY;

	while(i < 5)
	{
		if(this.tablero[i][j] != null) return this.tablero[i][j];
		
		j++;
		if(j >= 5)
		{ 
			j = 0;
			i++;
		}
	}

	return null;
}

TableroMontecarlo.prototype.removePosition = function(idX, idY)
{
	this.tablero[idX][idY].sprite.destroy();
	this.tablero[idX][idY] = null;
}
