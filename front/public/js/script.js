function addItem(value) {
    fetch('/list/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
    .then(response => response.json())
    .then(data => {
        updateListVisualization(data);
    });
}

function removeItem(value) {
    fetch('/list/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
    .then(response => response.json())
    .then(data => {
        updateListVisualization(data);
    });
}

function getList() {
    fetch('/list')
        .then(response => response.json())
        .then(data => {
            updateListVisualization(data);
        });
}

function updateListVisualization(data) {
    console.log(data); // הכנס לוגיקה כאן כדי להציג את הרשימה
}
