function AddCard(id)
{
    var cardDiv = document.createElement("div");
    var cardHeaderDiv = document.createElement("div");
    var cardBodyDiv = document.createElement("div");
    var cardText = document.createElement("p");

    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(cardText);
    
    cardDiv.className = "card mb-2";
    cardHeaderDiv.className = "card-header";
    cardBodyDiv.className = "card-body";
    cardText.className = "card-text";
    
    cardHeaderDiv.innerHTML = "Task Title";
    cardText.innerHTML = "Some quick example text to build on the card title and make up the bulk of the card's content.";

    document.getElementById(id).appendChild(cardDiv);
}
