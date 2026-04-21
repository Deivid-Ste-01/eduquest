class CourseViewer {
    constructor() {
        this.course = JSON.parse(localStorage.getItem('eduquest_current_course'));
        this.currentLevelIndex = 0;
        this.init();
    }

    init() {
        if (!this.course) {
            window.location.href = 'index.html';
            return;
        }
        
        document.getElementById('sidebar-title').textContent = this.course.name;
        this.renderSidebar();
        this.loadLevel(0);
    }

    renderSidebar() {
        const list = document.getElementById('levels-list');
        const completed = app.user.completedLevels[this.course.id] || [];
        
        this.course.levels.forEach((level, idx) => {
            const li = document.createElement('li');
            const isCompleted = completed.includes(level.id);
            const isLocked = idx > 0 && !completed.includes(this.course.levels[idx-1].id);
            
            li.className = isCompleted ? 'completed' : (isLocked ? 'locked' : '');
            if (idx === this.currentLevelIndex) li.classList.add('active');
            
            li.innerHTML = `
                <span class="level-icon">${isCompleted ? '✓' : (isLocked ? '🔒' : (idx + 1))}</span>
                <span>${level.name}</span>
            `;
            
            if (!isLocked) {
                li.onclick = () => this.loadLevel(idx);
            }
            
            list.appendChild(li);
        });
    }

    async loadLevel(index) {
        this.currentLevelIndex = index;
        const level = this.course.levels[index];
        
        document.getElementById('content-title').textContent = level.name;
        document.getElementById('content-xp').textContent = `${level.xp} XP`;
        
        // Contenido de ejemplo (puedes cargar Markdown real aquí)
        document.getElementById('markdown-content').innerHTML = `
            <h2>${level.name}</h2>
            <p>Este es el contenido del nivel. En una versión completa, aquí se cargaría el archivo Markdown correspondiente.</p>
            <h3>Objetivos de Aprendizaje</h3>
            <ul>
                <li>Comprender los conceptos fundamentales</li>
                <li>Aplicar conocimientos en ejercicios prácticos</li>
                <li>Analizar problemas típicos de examen</li>
            </ul>
            <h3>Ejercicios Propuestos</h3>
            <ol>
                <li>Ejercicio de práctica 1</li>
                <li>Ejercicio de práctica 2</li>
                <li>Ejercicio de práctica 3</li>
            </ol>
            <blockquote>
                💡 <strong>Tip de Estudio</strong>: Practica al menos 30 minutos diarios para mantener tu racha.
            </blockquote>
        `;
        
        const completed = app.user.completedLevels[this.course.id] || [];
        const btn = document.getElementById('complete-btn');
        if (completed.includes(level.id)) {
            btn.textContent = '✓ Completado';
            btn.disabled = true;
            btn.style.opacity = '0.6';
        } else {
            btn.textContent = '✓ Completar Nivel';
            btn.disabled = false;
            btn.style.opacity = '1';
        }
        
        this.renderSidebar();
        window.scrollTo(0, 0);
    }
}

function completeCurrentLevel() {
    const level = app.courses.find(c => c.id === courseViewer.course.id).levels[courseViewer.currentLevelIndex];
    app.completeLevel(courseViewer.course.id, level.id, level.xp);
    
    if (courseViewer.currentLevelIndex < courseViewer.course.levels.length - 1) {
        setTimeout(() => {
            courseViewer.loadLevel(courseViewer.currentLevelIndex + 1);
        }, 1500);
    } else {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

let courseViewer;
document.addEventListener('DOMContentLoaded', () => {
    courseViewer = new CourseViewer();
});
