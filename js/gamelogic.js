function GameLogic(tablero)
{
	this.firstPair = -1;
	this.secondPair = -1;
	this.tablero = tablero;
	this.remainingCards = 52;
}

GameLogic.prototype.setText = function(text)
{
	this.text = text;
}

GameLogic.prototype.markPosition = function(position)
{
	if(this.firstPair == -1) 
	{
		this.firstPair = position;
		//console.log(position.carta);
	}
	else if(this.secondPair == -1) 
	{
		//console.log(position.carta);
		this.secondPair = position;

		var xDiff = Math.abs(this.firstPair.idX - this.secondPair.idX);
		var yDiff = Math.abs(this.firstPair.idY - this.secondPair.idY);

		//console.log(xDiff + ", " + yDiff);

		if(xDiff <= 1 && yDiff <= 1 && (xDiff + yDiff) > 0)
		{
			if(this.firstPair.carta.valor == this.secondPair.carta.valor)
			{
				tablero.removePosition(this.firstPair.idX, this.firstPair.idY);
				tablero.removePosition(this.secondPair.idX, this.secondPair.idY);

				this.remainingCards -= 2;
				this.text.text = "Remaining cards: " + this.remainingCards;

				if(this.remainingCards <= 0)
				{
					this.text.text = "You win!, \nSolitaire master :)";
				}
			}
		}

		this.firstPair = this.secondPair = -1;
	}
}



