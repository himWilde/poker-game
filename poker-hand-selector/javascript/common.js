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
	
	var cards = finalCards(player,river);
	
	console.log('Of a Kind: ' + checkForAKind(cards));
	console.log('Flush: ' + checkForFlush(cards));
	console.log('Straight: ' + checkForStraight(cards));
	console.log('High Card: ' + findHighCard(cards));
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
	
	document.getElementById(position).appendChild(img);
}

function findHighCard(cards)
{
	var highCard = 0;
	
	if(cards[0].value == 1) highCard = cards[0].value + cards[0].suit;
	else highCard = cards[6].value + cards[6].suit;
	
	return highCard;
}

function checkForAKind(cards)
{	
	var ofAKind = 'false';
	var three = false;
	var two = 0;
	var fullHouse = false;
	
	for(var i = 0; i < cards.length; i++)
	{		
		if(cards.length - i > 3 && cards[i].value == cards[i+1].value && cards[i].value == cards[i+2].value && cards[i].value == cards[i+3].value)
		{
			ofAKind = 'Four ' + cards[i].value + 's';
			break;
		}
		
		if(cards.length - i > 2 && cards[i].value == cards[i+1].value && cards[i].value == cards[i+2].value)
		{
			ofAKind = 'Three ' + cards[i].value + 's';
			three = true;
		}
		
		if(cards.length - i > 1 && three == false && two == 2 && cards[i].value == cards[i+1].value)
		{
			ofAKind = ofAKind + ' & Two ' + cards[i].value + 's';
			two = 3;			
		}
		
		if(cards.length - i > 1 && three == false && two == 1 && cards[i].value == cards[i+1].value)
		{
			ofAKind = ofAKind + ' & Two ' + cards[i].value + 's';
			two = 2;			
		}
		
		if(cards.length - i > 1 && three == false && two == 0 && cards[i].value == cards[i+1].value)
		{
			ofAKind = 'Two ' + cards[i].value + 's';
			two = 1;			
		}
		
	}
	
	//CHECK FOR FULL HOUSE
	if(three == true && two >= 1)
	{
		fullHouse = true;
		ofAKind = 'Full House!'
	}
	
	return ofAKind;
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
	
	//CHECK FOR STRAIGHT FLUSH HERE
	if(h >= 5 || s >= 5 || d >= 5 || c >= 5) return true;
	else return false;
}

function checkForStraight(cards)
{	
	var highCard = 0; 
    var count = 0;
    
    for(var i = 0; i < cards.length - 1; i++)
    {
        if(cards[i].value == cards[i+1].value - 1)
        {
        	count++;
        	highCard = cards[i+1].value;
        } 
        else if(cards[i+1].value - 1 > cards[i].value && count < 4)
        {
        	count = 0;
        }
        
        if(cards[0].value == 1 && cards[6].value == 13 && count >= 3)
        {
        	count++;
        	highCard = cards[0].value;
        }
    }
    
    if(count >= 4)return true
    else return false;
}

function finalCards(p,r)
{
	var c = [ p.cards[0], p.cards[1], r[0], r[1], r[2], r[3], r[4] ];
	
	//SORT NUMERICALLY
    for(var i = 1; i < c.length; i++)
    {
        var a = i;
        while(a != 0){
            if(c[a].value < c[a-1].value){
                temp = c[a];
                c[a] = c[a-1];
                c[a-1] = temp;
            }
            a--;
        }
    }
	
	console.log(
		"|" + c[0].value + c[0].suit + "|",
		"|" + c[1].value + c[1].suit + "|",
		"|" + c[2].value + c[2].suit + "|",
		"|" + c[3].value + c[3].suit + "|",
		"|" + c[4].value + c[4].suit + "|",
		"|" + c[5].value + c[5].suit + "|",
		"|" + c[6].value + c[6].suit + "|"
	);
	
	return c;
}

$(document).ready(function()
{
	initCardGame();
});
