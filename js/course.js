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
        list.innerHTML = '';
        const completed = app.user.completedLevels[this.course.id] || [];

        this.course.levels.forEach((level, idx) => {
            const li = document.createElement('li');
            const isCompleted = completed.includes(level.id);
            const isLocked = idx > 0 && !completed.includes(this.course.levels[idx - 1].id);
            const isActive = idx === this.currentLevelIndex;

            li.className = isCompleted ? 'completed' : (isLocked ? 'locked' : '');
            if (isActive) li.classList.add('active');

            let icon = '';
            if (isCompleted) {
                icon = isActive ? '📖' : '✓';
            } else if (isLocked) {
                icon = '🔒';
            } else {
                icon = (idx + 1).toString();
            }

            li.innerHTML = `
                <span class="level-icon">${icon}</span>
                <span class="level-name">${level.name}</span>
                ${isCompleted && !isActive ? '<span class="review-badge" style="font-size:0.7rem;background:#6366f1;color:white;padding:2px 7px;border-radius:99px;margin-left:6px;">Revisar</span>' : ''}
            `;

            if (!isLocked) {
                li.style.cursor = 'pointer';
                li.onclick = function () { courseViewer.loadLevel(idx); };
            }

            list.appendChild(li);
        });
    }

    loadLevel(index) {
        this.currentLevelIndex = index;
        const level = this.course.levels[index];
        const completed = app.user.completedLevels[this.course.id] || [];
        const isReviewing = completed.includes(level.id);

        document.getElementById('content-title').textContent = level.name;
        document.getElementById('content-xp').textContent = level.xp + ' XP';

        // Banner de revisión
        const existingBanner = document.getElementById('review-banner');
        if (existingBanner) existingBanner.remove();

        if (isReviewing) {
            const banner = document.createElement('div');
            banner.id = 'review-banner';
            banner.style.cssText = `
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                padding: 10px 20px;
                border-radius: 10px;
                margin-bottom: 16px;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            banner.innerHTML = '📖 <strong>Modo revisión</strong> — Ya completaste este nivel. ¡Repasa el contenido!';
            const contentArea = document.getElementById('markdown-content');
            contentArea.parentNode.insertBefore(banner, contentArea);
        }

        // Mostrar spinner mientras carga
        const contentEl = document.getElementById('markdown-content');
        contentEl.innerHTML = '<p style="color:#64748b;text-align:center;padding:40px;">⏳ Cargando contenido...</p>';

        // Cargar el archivo .md del nivel
        fetch(level.content)
            .then(function (response) {
                if (!response.ok) throw new Error('No se pudo cargar el archivo: ' + level.content);
                return response.text();
            })
            .then(function (markdown) {
                // Renderizar Markdown con la librería marked
                contentEl.innerHTML = marked.parse(markdown);
            })
            .catch(function (err) {
                contentEl.innerHTML = `
                    <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:10px;padding:20px;color:#991b1b;">
                        <strong>⚠️ No se pudo cargar el contenido</strong>
                        <p style="margin-top:8px;font-size:0.9rem;">Archivo: <code>${level.content}</code></p>
                        <p style="font-size:0.85rem;color:#7f1d1d;">Verifica que el archivo existe en el repositorio.</p>
                    </div>
                `;
            });

        // Botón completar / revisar
        const btn = document.getElementById('complete-btn');
        const existingNext = document.getElementById('next-btn');
        if (existingNext) existingNext.remove();

        if (isReviewing) {
            btn.textContent = '✓ Nivel completado';
            btn.disabled = true;
            btn.style.opacity = '0.6';

            // Botón "Siguiente nivel" si existe
            const nextIndex = index + 1;
            if (nextIndex < this.course.levels.length) {
                const nextBtn = document.createElement('button');
                nextBtn.id = 'next-btn';
                nextBtn.className = 'btn-primary';
                nextBtn.textContent = 'Siguiente nivel →';
                nextBtn.style.marginLeft = '10px';
                nextBtn.onclick = function () { courseViewer.loadLevel(nextIndex); };
                btn.parentNode.appendChild(nextBtn);
            }
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
    const level = app.courses.find(function (c) { return c.id === courseViewer.course.id; }).levels[courseViewer.currentLevelIndex];
    app.completeLevel(courseViewer.course.id, level.id, level.xp);

    if (courseViewer.currentLevelIndex < courseViewer.course.levels.length - 1) {
        setTimeout(function () {
            courseViewer.loadLevel(courseViewer.currentLevelIndex + 1);
        }, 1500);
    } else {
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 1500);
    }
}

var courseViewer;
document.addEventListener('DOMContentLoaded', function () {
    courseViewer = new CourseViewer();
});
