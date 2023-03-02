let cards = [];
let card_states = [];
let card_deck = [];
let char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let indeck = 0;

let saved_deck;

function openSubmit()
{
    let editor = document.getElementsByClassName("editor")[0];

    if (editor.style.visibility == "visible")
    {
        document.getElementsByClassName("button")[1].innerHTML = "OPEN EDITOR";
        editor.style.visibility = "hidden";
    }
    else
    {
        document.getElementsByClassName("button")[1].innerHTML = "CLOSE EDITOR";
        editor.style.visibility = "visible";
    }
}

function updateDeck()
{
    for (let j = 0; j < card_deck.length; j++)
        card_deck[j] =  card_states.indexOf(j);

    let elm_card_container = document.getElementById("card_display");
    elm_card_container.innerHTML = "";

    for (let i = 0; i < 54; i++)
    {
        elm_card_container.appendChild( cards[card_deck[i]] );
        cards[i].innerHTML = "";
    }
}

function saveDeck()
{
    for (let j = 0; j < 54; j++)
        card_deck[j] =  card_states.indexOf(j, 0);
    
    saved_deck = [...card_deck];

    updateDeck();
}

function loadDeck()
{
    card_deck = [...saved_deck];

    for (let j = 0; j < 54; j++)
        card_states[j] =  card_deck.indexOf(j, 0);

    for (let j = 0; j < 54; j++)
        cards[j].innerHTML = card_states[j];

    updateDeck();  
}

function etape1()
{
    //ETAPE 1
    let j0_pos = card_states[53];

    if (j0_pos < 53)
        card_states[53]++;
    else
        card_states[53] = 1;

    let it = -1;
    while (it < card_states.length)
    {
        it++;
        if (card_states[it] == card_states[53] && it != 53)
            card_states[it] = j0_pos;
    }
}

function etape2()
{
    //ETAPE 2
    let j1_pos = card_states[52];

    for (let x = 0; x < 2; x++)
    {
        if (j1_pos < 52)
            card_states[52] = card_states[52] + 1;
        else
            card_states[52] = 1;
    }
    
    let it = -1;
    while (it < 54)
    {
        it++;
        if (card_states[it] === card_states[52] && it != 52)
            card_states[it] = j1_pos;
    }
}

function etape3()
{
    //ETAPE 3
    for (let j = 0; j < 54; j++)
        card_deck[j] = card_states.indexOf(j, 0);

    j0_pos = card_states[53];
    j1_pos = card_states[52];

    let f0 = Math.min(j0_pos, j1_pos);
    let f1 = Math.max(j0_pos, j1_pos);

    let d0 = card_deck.slice(0, f0);
    let d1 = card_deck.slice(f0, f1+1);
    let d2 = card_deck.slice(f1 + 1);

    card_deck = d2.concat(d1);
    card_deck = card_deck.concat(d0);
}

function etape4()
{
    //ETAPE 4
    f0 = Math.min(card_deck[53] + 1, 53 );

    d0 = card_deck.slice(0, f0);
    d1 = card_deck.slice(f0, 53);
    d2 = card_deck.slice(53, 54);  
    
    card_deck = d1.concat(d0);
    card_deck = card_deck.concat(d2);

    for (let j = 0; j < 54; j++)
        card_states[j] =  card_deck.indexOf(j, 0);

    for (let c = 0; c < 54; c++)
        cards[c].innerHTML = card_states[c];
}

function etape5()
{
    //ETAPE 5
    if ( card_deck[ (card_deck[0] + 1) % 53 ] < 52 )
        return card_deck[ (card_deck[0] + 1) % 53 ]%26;
    else
        return genFlux();
}

function genFlux()
{

    etape1();
    updateDeck();
    etape2();
    updateDeck();
    etape3();
    updateDeck();
    etape4();
    updateDeck();
    return etape5();

}

function encode()
{

    if (saved_deck == undefined)
        return;

    let word = document.getElementById("input").innerHTML;
    word = word.toLowerCase();
    let encoded = "";

    for (let i = 0; i < word.length; i++)
    {
        let k = genFlux();
        updateDeck();
        let p = char.indexOf(word[i], 0);
        if (p >= 0)
            encoded += char[ (k + p) % 26 ];
        else
            encoded += word[i];
    }

    document.getElementsByClassName("textarea")[1].innerHTML = encoded;
    return encoded;
}

function decode()
{
    if (saved_deck == undefined)
        return;

    let word = document.getElementById("input").innerHTML;
    let decoded = "";
    word = word.toLowerCase();

    for (let i = 0; i < word.length; i++)
    {
        let k = genFlux();
        updateDeck();
        let p = char.indexOf(word[i], 0);
        if (p >= 0)
            decoded += char[ (-k + p + 26) % 26 ];
        else
            decoded += word[i];
    }

    document.getElementsByClassName("textarea")[1].innerHTML = decoded;
    return decoded;
}

function genRandom()
{

    empty();

    while (indeck < 54)
    {
        let i = Math.floor(Math.random() * 54);

        if (card_states[i] === -1)
        {
            card_states[i] = indeck;
            indeck++;
        }
    }

    updateDeck();
}

function empty()
{
    for (let i = 0; i < 54; i++)
    {
        card_states[i] = -1;
        cards[i].innerHTML = "";
    }
    indeck = 0;
}

function cardClick()
{
    let i = 0
    while (this != cards[i])
    {
        i++;
    }

    if (card_states[i] === -1)
    {
        card_states[i] = indeck;
        indeck++;
        this.innerHTML = card_states[i];
    }
    else
    {
        this.innerHTML = "";
        for (let a = 0; a < 54; a++)
        {
            if ( card_states[a] > card_states[i] )
            {
                card_states[a]--;
                cards[a].innerHTML = card_states[a];
            }
        }
        card_states[i] = -1;
        indeck--;
    }

}

function loadCards()
{
    let elm_card_container = document.getElementById("card_display");

    for (let i = 0; i < 54; i++)
    {
        cards.push( document.createElement("div") );
        card_states.push(i);
        card_deck.push(i);
        indeck = i;
        cards[i].setAttribute("class", "card");

        let url = "assets/";

        if (i < 13)
            url += "T" + (i + 1);
        
        if (i >= 13 && i < 26)
            url += "C" + ( (i % 13) + 1 );
        
        if (i >= 26 && i < 39)
            url += "H" + ( (i % 13) + 1 );

        if (i >= 39 && i < 52)
            url += "P" + ( (i % 13) + 1 );
        
        if (i >= 52)
            url += "J" + (i - 51);

        cards[i].style.backgroundImage = "url('" + url + ".jpg')";
        elm_card_container.appendChild(cards[i]);

        cards[i].addEventListener("click", cardClick );

    }
}

function load()
{
    loadCards();

    input = document.getElementsByClassName("textarea")[0];
    input.contentEditable = "true";
}

function copyOutput()
{
    let text = document.getElementsByClassName("textarea")[1].innerHTML;
    // Copy the text inside the text field
    navigator.clipboard.writeText(text);
}
