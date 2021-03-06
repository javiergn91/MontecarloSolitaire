function BarajaObject()
{
	this.baraja = new Array(52);
}

BarajaObject.prototype.draw = function()
{
	if(this.numberOfCards() == 0) return null;

	var cardToReturn = this.baraja[this.baraja.length - 1];

	this.baraja.splice(this.baraja.length - 1, 1);

	return cardToReturn;
}

BarajaObject.prototype.topCard = function()
{
	return this.baraja[this.baraja.length - 1];
}

BarajaObject.prototype.shuffle = function()
{
	/*
	Fisher-Yates Shuffle Algorithm.
	To shuffle an array a of n elements (indices 0..n-1):
 	for i from 0 to n − 2 do
	     j ← random integer such that i ≤ j < n
	     exchange a[j] and a[i]
	*/
	
	var n = this.baraja.length;
	for(var i = 0; i <= (n - 2); i++)
	{
		var j = game.rnd.integerInRange(i, n - 1);
	
		var tmp = this.baraja[i];
		this.baraja[i] = this.baraja[j];
		this.baraja[j] = tmp;
	}
}

BarajaObject.prototype.numberOfCards = function()
{
	return this.baraja.length;
}
