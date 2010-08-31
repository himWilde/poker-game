function initCardGame()
{
	var deck = newDeck();	
	var river = new Array();
	var player = newPlayer("Kevin");
	
	for(var i = 0; i < 2; i++){		
		player.cards[i] = deck.pop();
		addCardToStage(player.cards[i], 'player-cards');
	};
	
	for(var i = 0; i < 5; i++)
	{
		river.push(deck.pop());		
		addCardToStage(river[river.length - 1], 'river');
	}	
	
	var cards = finalCards(river,player);
	
	console.log(checkForFlush(cards));
	console.log(checkForStraight(cards));
}

function newPlayer(name)
{
	var p = {
		name: name,
		cards: new Array()
	}
	
	return p;
}

function newDeck()
{
    var values = 14;
    //var suits = ["h", "h", "h", "h"];
    var suits = ["s", "h", "c", "d"];
    
    var deck = new Array();
    var shuffledDeck = new Array();
	
    //MAKE DECK
    for(var s = 0; s < suits.length; s++)
    {    	
        for(var v = 1; v < values; v++)
        {
            deck.push({value: v, suit: suits[s]});
        }
    }
    
    //SHUFFLE DECK
    for(var i = 0; deck != i;)
    {
    	var random = Math.floor(Math.random()*(deck.length));
		var card = deck[random];
		deck.splice(random,1);
		
		shuffledDeck.push(card);
    }

    return shuffledDeck;
}

function addCardToStage(card, position)
{
	var img = document.createElement('img');	

	img.setAttribute('src',"images/" + card.value + card.suit + ".gif");
	img.setAttribute('width','71');
	img.setAttribute('height','96');
	
	//document.getElementById(position).appendChild(img);
}

function findHighCard()
{
	//EASY
}

function checkForFlush(cards)
{	
	var h = 0;
	var s = 0;
	var d = 0;
	var c = 0;
	
	for(var i = 0; i < cards.length; i++)
	{
		if(cards[i].suit == 'h') h++;
		if(cards[i].suit == 's') s++;
		if(cards[i].suit == 'd') d++;
		if(cards[i].suit == 'c') c++;
	}
	
	if(h >= 5 || s >= 5 || d >= 5 || c >= 5) return true;
	else return false;
}

function checkForStraight(cards)
{	
	cards[0].value = 1;
	cards[1].value = 2;
	cards[2].value = 3;
	cards[3].value = 4;
	cards[4].value = 5;
	cards[5].value = 6;
	cards[6].value = 10;
	
	var highCard = 0;
	//Sort Numerically
    for(var i = 1; i < cards.length; i++)
    {
        var pos = i;
        while(pos != 0){
            if(cards[pos].value < cards[pos-1].value){
                temp = cards[pos].value;
                cards[pos].value = cards[pos-1].value;
                cards[pos-1].value = temp;
            }
            pos--;
        }
    }

    //Test for Straight    
    var count = 0;
    
    for(var i = 0; i < cards.length - 1; i++)
    {
        if(cards[i].value == cards[i+1].value - 1)
        {
        	count++;
        	highCard = cards[i].value;
        }
    }
    
    console.log(highCard);
    
    if(count >= 4)return true
    else return false;
}

function finalCards(r,p)
{
	var c = [ p.cards[0], p.cards[1], r[0], r[1], r[2], r[3], r[4] ];
	
	for(var i = 0; i < c.length; i++)
	{
		console.log(c[i].value, c[i].suit);
	}
	
	return c;
}

$(document).ready(function()
{
	initCardGame();
});
