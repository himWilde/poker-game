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
	
	checkScore(player,river);
}

function checkScore(p,r)
{
	var cards = finalCards(p,r);
	
	p.score.flush = checkForFlush(cards);
	p.score.straight = checkForStraight(cards);
	p.score.fourKind = checkForAKind(cards,4);
	p.score.threeKind = checkForAKind(cards,3);
	p.score.pair = checkForAKind(cards,2);
	p.score.highCard = findHighCard(cards);
	
	console.log(p.score);
	console.log('High Card: ' + p.score.highCard.value + p.score.highCard.suit);
	console.log('Pair: ' + p.score.pair.hit);
	console.log('Three of a Kind: ' + p.score.threeKind.hit);
	console.log('Four of a Kind: ' + p.score.fourKind.hit);
	console.log('Straight: ' + p.score.straight.hit);
	console.log('Flush: ' + p.score.flush.hit);
}

function newPlayer(name)
{
	var p = {
		name: name,
		cards: new Array(),
		score: scoreHolder()
	}
	
	return p;
}

function scoreHolder()
{
	var score = {		
		royalFlush: false,
		straightFlush: false,		
		fourKind: false,
		fullhouse: false,
		flush: false,
		straight: false,
		threeKind: false,
		twoPair: false,
		pair: false,
		highCard: false
	}
	
	return score;
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
	
	cards[0].value == 1 ? highCard = cards[0] : highCard = cards[6];
	
	return highCard;
}

function checkForAKind(cards,num)
{		
	var obj = Object;
	var value = 0;
	var count = 0;
	
	for(var i = 0; i < cards.length - (num-1); i++)
	{	
		for (var j = i+1; j <= i+(num-1); j++)
		{
			if(cards[i].value == cards[j].value)
			{
				count++;
				value = cards[i].value;
				
				console.log(count);
				
				if(count == num) 
				{
					console.log('eh!');
					return obj = { hit:true, value: value };
				} 
			}
		}	
	}
	
	return false;
}

function checkForTwoPair(cards)
{
	//TO DO
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
	
	var obj = Object;
	
	if(h >= 5) return obj = { hit: true, suit: 'h' };
	else return false;
	
	if(s >= 5) return obj = { hit: true, suit: 's' };
	else return false;
	
	if(d >= 5) return obj = { hit: true, suit: 'd' };
	else return false;
	
	if(c >= 5) return obj = { hit: true, suit: 'c' };
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
    
    var obj = Object;
    
    if(count >= 4) return obj = { hit: true, value: highCard };
    else return false;
}

function finalCards(p,r)
{
	var c = [ p.cards[0], p.cards[1], r[0], r[1], r[2], r[3], r[4] ];
	
	//SORT NUMERICALLY
    for(var i = 1; i < c.length; i++)
    {
        var a = i;
        while(a != 0)
        {
            if(c[a].value < c[a-1].value)
            {
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
