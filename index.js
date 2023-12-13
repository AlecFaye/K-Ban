var cardIdCounter = 1;

const backlogTaskHolderId = "backlog-task-holder";
const doingTaskHolderId = "doing-task-holder";
const reviewTaskHolderId = "review-task-holder";
const doneTaskHolderId = "done-task-holder";

const backlogId = 1;
const doingId = 2;
const reviewId = 3;
const doneId = 4;

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

    var kanbanColumnId;
    switch (columnId)
    {
        case backlogTaskHolderId:
            kanbanColumnId = backlogId;
            break;
        case doingTaskHolderId:
            kanbanColumnId = doingId;
            break;
        case reviewTaskHolderId:
            kanbanColumnId = reviewId;
            break;
        case doneTaskHolderId:
            kanbanColumnId = doneId;
            break;
    }

    leftButton.onclick = function()
    {
        moveCardLeft(cardDiv.id.toString(), leftButton.id.toString(), rightButton.id.toString(), kanbanColumnId);
    }

    rightButton.onclick = function()
    {
        moveCardRight(cardDiv.id.toString(), rightButton.id.toString(), rightButton.id.toString(), kanbanColumnId);
    }

    cardIdCounter++;

    document.getElementById(columnId).appendChild(cardDiv);
}

function moveCardLeft(cardDivId, leftButtonId, rightButtonId, kanbanColumnId)
{
    kanbanColumnId--;
    if (kanbanColumnId < 1)
    {
        kanbanColumnId = 1;
    }

    updateKanbanColumn(cardDivId, kanbanColumnId);
    updateCardButtons(cardDivId, leftButtonId, rightButtonId, kanbanColumnId);
}

function moveCardRight(cardDivId, leftButtonId, rightButtonId, kanbanColumnId)
{
    kanbanColumnId++;
    if (kanbanColumnId > 4)
    {
        kanbanColumnId = 4;
    }

    updateKanbanColumn(cardDivId, kanbanColumnId);
    updateCardButtons(cardDivId, leftButtonId, rightButtonId, kanbanColumnId);
}

function updateCardButtons(cardDivId, leftButtonId, rightButtonId, kanbanColumnId)
{
    var leftButton = document.getElementById(leftButtonId);
    var rightButton = document.getElementById(rightButtonId);

    leftButton.onclick = function()
    {
        moveCardLeft(cardDivId, leftButtonId, rightButtonId, kanbanColumnId);
    }

    rightButton.onclick = function()
    {
        moveCardRight(cardDivId, leftButtonId, rightButtonId, kanbanColumnId);
    }
}

function updateKanbanColumn(cardDivId, kanbanColumnId)
{
    var cardDiv = document.getElementById(cardDivId);

    var newKanbanColumnId;
    switch (kanbanColumnId)
    {
        case backlogId:
            newKanbanColumnId = backlogTaskHolderId;
            break;
        case doingId:
            newKanbanColumnId = doingTaskHolderId;
            break;
        case reviewId:
            newKanbanColumnId = reviewTaskHolderId;
            break;
        case doneId:
            newKanbanColumnId = doneTaskHolderId;
            break;
    }

    document.getElementById(newKanbanColumnId).appendChild(cardDiv);
}
