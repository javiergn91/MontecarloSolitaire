var pintas = ["Corazones", "Treboles", "Picas", "Diamantes"];
var valores = ["as", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jota", "quina", "kaiser"];

function allocateMemoryAndLoadAssets(baraja, tablero)
{
	var cnt = 0;
	
	for(var i = 0; i < pintas.length; i++)
	{
		for(var j = 0; j < valores.length; j++)
		{
			baraja[cnt] = new Carta();
			
			game.load.image(pintas[i] + "_" + valores[j], "assets/Cartas/" + pintas[i] + "/" + valores[j] + ".png");

			baraja[cnt].img_src = pintas[i] + "_" + valores[j];
			baraja[cnt].pinta = pintas[i];
			baraja[cnt].valor = valores[j];
			baraja[cnt].faceup = true;
			
			cnt++;
		}
	}
	
	game.load.image("facedown_blue", "assets/Cartas/FaceDown_Blue.png");
	game.load.image("empty_deck", "assets/Cartas/empty_deck.png");
}
