// Función para compartir pensamientos
function shareThought(event) {
    var thoughtInput = document.getElementById('thought-input').value.trim();

    if ((event.key === 'Enter' || event.type === 'click') && thoughtInput !== "" && /[a-zA-Z0-9]/.test(thoughtInput)) {
        var thoughtContainer = document.getElementById('thought-feed');
        var thoughtElement = document.createElement('div');
        thoughtElement.className = 'thought';

        var thoughtPrefix = document.createElement('span');
        thoughtPrefix.className = 'thought-prefix';
        thoughtPrefix.innerHTML = '<strong>Pienso que:</strong>';

        var thoughtContent = document.createElement('div');
        thoughtContent.className = 'thought-content';
        thoughtContent.textContent = thoughtInput;

        thoughtElement.appendChild(thoughtPrefix);
        thoughtElement.appendChild(thoughtContent);

        thoughtContainer.appendChild(thoughtElement);

        // Guardar el pensamiento en el almacenamiento local
        var thoughts = JSON.parse(localStorage.getItem('thoughts')) || [];
        thoughts.push(thoughtInput);
        localStorage.setItem('thoughts', JSON.stringify(thoughts));

        document.getElementById('thought-input').value = "";
        event.preventDefault();
    } else if (event.key === 'Enter' || event.type === 'click') {
        alert("Por favor, ingresa un pensamiento válido antes de compartirlo.");
        event.preventDefault();
    }
}

// Función para abrir/cerrar la pestaña lateral
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
}

// Funciones para cargar diferentes secciones
function loadProfile() {
    // Cargar el perfil desde el almacenamiento local si es necesario
}

function loadThoughtFeed() {
    document.getElementById('main-content').innerHTML = '<section id="thought-form">' +
        '<h2>Comparte tu pensamiento</h2>' +
        '<textarea id="thought-input" placeholder="Pienso que" onkeydown="shareThought(event)"></textarea>' +
        '<button id="share-button">Compartir</button>' +
        '</section>' +
        '<section id="thought-feed" class="thought-container">' +
        '</section>';

    // Cargar pensamientos desde el almacenamiento local al inicio
    var thoughts = JSON.parse(localStorage.getItem('thoughts')) || [];
    var thoughtContainer = document.getElementById('thought-feed');

    thoughts.forEach(function (thought) {
        var thoughtElement = document.createElement('div');
        thoughtElement.className = 'thought';

        var thoughtPrefix = document.createElement('span');
        thoughtPrefix.className = 'thought-prefix';
        thoughtPrefix.innerHTML = '<strong>Pienso que:</strong>';

        var thoughtContent = document.createElement('div');
        thoughtContent.className = 'thought-content';
        thoughtContent.textContent = thought;

        thoughtElement.appendChild(thoughtPrefix);
        thoughtElement.appendChild(thoughtContent);

        thoughtContainer.appendChild(thoughtElement);
    });
}

// Cargar el contenido de pensamientos al inicio
document.addEventListener('DOMContentLoaded', function () {
    loadThoughtFeed();
    document.getElementById('share-button').addEventListener('click', shareThought);
});
