function PosicionTablero()
{
	this.carta = "";
	this.posX = "";
	this.posY = "";
	this.imgName = "";
	this.sprite = "";
	this.idX = "";
	this.idY = "";
}

PosicionTablero.prototype.llenarPosicion = function(objetoBaraja, posX, posY, idX, idY)
{
	this.carta = objetoBaraja;
	this.posX = posX;
	this.posY = posY;
	this.imgName = objetoBaraja.img_src;
	this.sprite = game.add.sprite(posX, posY, this.imgName);
	this.sprite.scale.setTo(.4, .4);
	this.sprite.inputEnabled = true;
	this.idX = idX;
	this.idY = idY;

	this.sprite.events.onInputDown.add(function() 
	{
		gameLogic.markPosition(this);
		//console.log(this.idX + " " + this.idY);
	}, 
	this);
}


