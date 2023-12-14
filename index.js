const backlogTaskHolderId = "backlog-task-holder";
const doingTaskHolderId = "doing-task-holder";
const reviewTaskHolderId = "review-task-holder";
const doneTaskHolderId = "done-task-holder";

const backlogId = 1;
const doingId = 2;
const reviewId = 3;
const doneId = 4;

var cardIdCounter = 1;

function addCard(columnId)
{
    var cardDiv = document.createElement("div");
    var cardHeaderDiv = document.createElement("div");
    var rowDiv = document.createElement("div");
    var cardHeaderTextDiv = document.createElement("div");
    var cardHeaderButtonGroupDiv = document.createElement("div");
    var leftButton = document.createElement("button");
    var rightButton = document.createElement("button");
    var leftIcon = document.createElement("i");
    var rightIcon = document.createElement("i");
    var cardBodyDiv = document.createElement("div");
    var cardText = document.createElement("p");

    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardBodyDiv);
    cardHeaderDiv.appendChild(rowDiv);
    rowDiv.appendChild(cardHeaderTextDiv);
    rowDiv.appendChild(cardHeaderButtonGroupDiv);
    cardHeaderButtonGroupDiv.appendChild(leftButton);
    leftButton.appendChild(leftIcon);
    cardHeaderButtonGroupDiv.appendChild(rightButton);
    rightButton.appendChild(rightIcon);
    cardBodyDiv.appendChild(cardText);
    
    cardDiv.className = "card mb-2";
    cardHeaderDiv.className = "card-header";
    rowDiv.className = "row";
    cardHeaderTextDiv.className = "col-lg-9 col-sm-12 text-center";
    cardHeaderButtonGroupDiv.className = "col-lg-3 col-sm-12 btn-group justify-content-center";
    leftButton.className = "btn btn-sm btn-primary mx-1";
    rightButton.className = "btn btn-sm btn-primary mx-1";
    leftIcon.className = "fa-solid fa-arrow-left";
    rightIcon.className = "fa-solid fa-arrow-right";
    cardBodyDiv.className = "card-body";
    cardText.className = "card-text";
    
    cardHeaderButtonGroupDiv.role = "group";

    leftButton.type = "button";
    rightButton.type = "button";

    cardHeaderTextDiv.innerHTML = "Task Title";
    cardText.innerHTML = "Some quick example text to build on the card title and make up the bulk of the card's content.";

    cardDiv.id = cardIdCounter;
    leftButton.id = cardIdCounter * 10 + 1;
    rightButton.id = cardIdCounter * 10 + 2;

    var kanbanColumnIndex = getKanbanColumnIndexByStringId(columnId)

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
