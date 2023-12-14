const backlogTaskHolderId = "backlog-task-holder";
const doingTaskHolderId = "doing-task-holder";
const reviewTaskHolderId = "review-task-holder";
const doneTaskHolderId = "done-task-holder";

const backlogId = 1;
const doingId = 2;
const reviewId = 3;
const doneId = 4;

let cardIdCounter = 1;

const cards = [];

class Card
{
    constructor(id, title, text)
    {
        this.id = id,
        this.title = title,
        this.text = text
    }
}

function addCard(columnId)
{
    const newCard = new Card(cardIdCounter, "Task Title", "Some quick example text to build on the card title and make up the bulk of the card's content.");
    cards.push(newCard);

    let cardDiv = document.createElement("div");
    let cardBodyDiv = document.createElement("div");

    let titleRow = document.createElement("div");
    let titleColumn = document.createElement("div");
    let titleP = document.createElement("p");

    let buttonRow = document.createElement("div");
    let buttonColumn = document.createElement("div");
    let buttonGroup = document.createElement("div");
    let leftButton = document.createElement("button");
    let rightButton = document.createElement("button");
    let editButton = document.createElement("button");

    let leftButtonIcon = document.createElement("i");
    let rightButtonIcon = document.createElement("i");
    let editButtonIcon = document.createElement("i");

    cardDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(titleRow);
    titleRow.appendChild(titleColumn);
    titleColumn.appendChild(titleP);

    cardBodyDiv.appendChild(buttonRow);
    buttonRow.appendChild(buttonColumn);
    buttonColumn.appendChild(buttonGroup);
    buttonGroup.appendChild(leftButton);
    buttonGroup.appendChild(rightButton);
    buttonGroup.appendChild(editButton);

    leftButton.appendChild(leftButtonIcon);
    rightButton.appendChild(rightButtonIcon);
    editButton.appendChild(editButtonIcon);

    cardDiv.className = "card my-2";
    cardBodyDiv.className = "card-body";

    titleRow.className = "row text-center";
    titleColumn.className = "col-sm-12";
    titleP.className = "h5";

    buttonRow.className = "row text-center";
    buttonColumn.className = "col-sm-12";
    buttonGroup.className = "btn-group";

    leftButton.className = "btn btn-sm btn-primary";
    rightButton.className = "btn btn-sm btn-primary";
    editButton.className = "btn btn-sm btn-primary";

    leftButtonIcon.className = "fa-solid fa-arrow-left";
    rightButtonIcon.className = "fa-solid fa-arrow-right";
    editButtonIcon.className = "fa-solid fa-pencil";

    buttonGroup.role = "group";

    leftButton.type = "button";
    rightButton.type = "button";
    editButton.type = "button";

    titleP.innerHTML = "Task Title";
    
    cardDiv.id = cardIdCounter;
    leftButton.id = cardIdCounter * 10 + 1;
    rightButton.id = cardIdCounter * 10 + 2;

    let kanbanColumnIndex = getKanbanColumnIndexByStringId(columnId)

    leftButton.onclick = function()
    {
        moveCardLeft(cardDiv.id.toString(), leftButton.id.toString(), rightButton.id.toString(), kanbanColumnIndex);
    }

    rightButton.onclick = function()
    {
        moveCardRight(cardDiv.id.toString(), leftButton.id.toString(), rightButton.id.toString(), kanbanColumnIndex);
    }

    cardIdCounter++;

    document.getElementById(columnId).appendChild(cardDiv);
}

function moveCardLeft(cardDivId, leftButtonId, rightButtonId, kanbanColumnIndex)
{
    var newIndex = kanbanColumnIndex - 1;
    if (newIndex < 1)
    {
        newIndex = 1;
    }

    updateKanbanColumn(cardDivId, newIndex);
    updateCardButtons(cardDivId, leftButtonId, rightButtonId, newIndex);
}

function moveCardRight(cardDivId, leftButtonId, rightButtonId, kanbanColumnIndex)
{
    var newIndex = kanbanColumnIndex + 1;
    if (newIndex > 4)
    {
        newIndex = 4;
    }

    updateKanbanColumn(cardDivId, newIndex);
    updateCardButtons(cardDivId, leftButtonId, rightButtonId, newIndex);
}

function removeCard(cardDivId)
{
    const cardToRemove = document.getElementById(cardDivId);
    cardToRemove.remove();
}

function updateCardButtons(cardDivId, leftButtonId, rightButtonId, kanbanColumnIndex)
{
    var leftButton = document.getElementById(leftButtonId);
    var rightButton = document.getElementById(rightButtonId);

    leftButton.onclick = function()
    {
        moveCardLeft(cardDivId, leftButtonId, rightButtonId, kanbanColumnIndex);
    }

    rightButton.onclick = function()
    {
        moveCardRight(cardDivId, leftButtonId, rightButtonId, kanbanColumnIndex);
    }
}

function updateKanbanColumn(cardDivId, kanbanColumnIndex)
{
    var cardDiv = document.getElementById(cardDivId);

    var kanbanColumnStringId = getKanbanColumnStringIdByIndex(kanbanColumnIndex);

    document.getElementById(kanbanColumnStringId).appendChild(cardDiv);
}

function getKanbanColumnIndexByStringId(kanbanColumnId)
{
    switch (kanbanColumnId)
    {
        case backlogTaskHolderId:
            return backlogId;
        case doingTaskHolderId:
            return doingId;
        case reviewTaskHolderId:
            return reviewId;
        case doneTaskHolderId:
            return doneId;
    }
    return null;
}

function getKanbanColumnStringIdByIndex(kanbanColumnIndex)
{
    switch (kanbanColumnIndex)
    {
        case backlogId:
            return backlogTaskHolderId;
        case doingId:
            return doingTaskHolderId;
        case reviewId:
            return reviewTaskHolderId;
        case doneId:
            return doneTaskHolderId;
    }
    return null;
}
