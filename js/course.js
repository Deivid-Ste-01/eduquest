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
            const isLocked = idx > 0 && !completed.includes(this.course.levels[idx-1].id);
            
            li.className = isCompleted ? 'completed' : (isLocked ? 'locked' : '');
            if (idx === this.currentLevelIndex) li.classList.add('active');
            
            li.innerHTML = '<span class="level-icon">' + (isCompleted ? '✓' : (isLocked ? '🔒' : (idx + 1))) + '</span><span>' + level.name + '</span>';
            
            if (!isLocked) {
                li.onclick = function() { courseViewer.loadLevel(idx); };
            }
            
            list.appendChild(li);
        });
    }

    getNoteKey(levelId) {
        return 'eduquest_note_' + this.course.id + '_' + levelId;
    }

    saveNote(levelId, text) {
        localStorage.setItem(this.getNoteKey(levelId), text);
    }

    loadNote(levelId) {
        return localStorage.getItem(this.getNoteKey(levelId)) || '';
    }

    renderNotes(levelId) {
        // Elimina notas previas si existen
        const existing = document.getElementById('notes-section');
        if (existing) existing.remove();

        const savedNote = this.loadNote(levelId);

        const section = document.createElement('div');
        section.id = 'notes-section';
        section.style.cssText = `
            margin-top: 32px;
            padding: 20px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
        `;

        section.innerHTML = `
            <h3 style="margin: 0 0 12px 0; font-size: 1rem; color: #334155; display: flex; align-items: center; gap: 8px;">
                📝 Mis Anotaciones
                <span style="font-size: 0.75rem; font-weight: 400; color: #94a3b8;">Se guardan automáticamente</span>
            </h3>
            <textarea
                id="level-notes"
                placeholder="Escribe tus notas, dudas o resúmenes aquí..."
                style="
                    width: 100%;
                    min-height: 120px;
                    padding: 12px;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 0.9rem;
                    color: #334155;
                    background: white;
                    resize: vertical;
                    box-sizing: border-box;
                    outline: none;
                    transition: border-color 0.2s;
                "
            >${savedNote}</textarea>
            <div style="text-align: right; margin-top: 6px;">
                <span id="notes-status" style="font-size: 0.75rem; color: #94a3b8;"></span>
            </div>
        `;

        document.getElementById('markdown-content').after(section);

        const textarea = document.getElementById('level-notes');
        let saveTimeout;

        textarea.addEventListener('focus', () => {
            textarea.style.borderColor = '#6366f1';
        });
        textarea.addEventListener('blur', () => {
            textarea.style.borderColor = '#cbd5e1';
        });
        textarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            document.getElementById('notes-status').textContent = 'Guardando...';
            saveTimeout = setTimeout(() => {
                this.saveNote(levelId, textarea.value);
                document.getElementById('notes-status').textContent = '✓ Guardado';
                setTimeout(() => {
                    const st = document.getElementById('notes-status');
                    if (st) st.textContent = '';
                }, 2000);
            }, 800);
        });
    }

    loadLevel(index) {
        this.currentLevelIndex = index;
        const level = this.course.levels[index];
        
        document.getElementById('content-title').textContent = level.name;
        document.getElementById('content-xp').textContent = level.xp + ' XP';
        
        var html = '';
        
        if (level.id === 'm1') {
            html = '<h2>📐 Álgebra Básica</h2><h3>Objetivos</h3><ul><li>Dominar operaciones con polinomios</li><li>Resolver ecuaciones lineales</li><li>Factorizar expresiones</li></ul><h3>Operaciones con Polinomios</h3><p><strong>Suma:</strong> (3x² + 5x - 2) + (2x² - 3x + 7) = <strong>5x² + 2x + 5</strong></p><p><strong>Producto:</strong> (x + 2)(x - 3) = x² - x - 6</p><h3>Ecuaciones Lineales</h3><p>Forma: <strong>ax + b = 0</strong></p><p>Solución: <strong>x = -b/a</strong></p><h3>Factorización</h3><p>1. Factor común: 6x + 9 = 3(2x + 3)</p><p>2. Diferencia de cuadrados: x² - 16 = (x+4)(x-4)</p><p>3. Trinomio perfecto: x² + 6x + 9 = (x+3)²</p><h3>Ejercicio Resuelto</h3><p><strong>Simplificar:</strong> (x² - 9)/(x - 3)</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">x² - 9 = (x+3)(x-3)\n(x+3)(x-3)/(x-3) = x+3\nRespuesta: x + 3</pre><h3>Ejercicios Propuestos</h3><ol><li>Simplifica: (3x² - 2x + 5) + (x² + 4x - 3)</li><li>Resuelve: 5x - 7 = 3x + 9</li><li>Factoriza: x² - 25</li></ol><blockquote style="border-left:4px solid #6366f1;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: Practica 30 minutos diarios para mantener tu racha.</blockquote>';
        } else if (level.id === 'f1') {
            html = '<h2>⚛️ Cinemática</h2><h3>Objetivos</h3><ul><li>Comprender MRU y MRUA</li><li>Calcular velocidad y aceleración</li><li>Resolver caída libre</li></ul><h3>MRU (Velocidad Constante)</h3><p><strong>v = d/t</strong> | <strong>d = v·t</strong> | <strong>t = d/v</strong></p><h3>MRUA (Aceleración Constante)</h3><p><strong>v<sub>f</sub> = v<sub>i</sub> + at</strong></p><p><strong>x = v<sub>i</sub>t + ½at²</strong></p><p><strong>v<sub>f</sub>² = v<sub>i</sub>² + 2ax</strong></p><h3>Caída Libre</h3><p><strong>a = g = 9.8 m/s²</strong></p><p><strong>h = ½gt²</strong> | <strong>v = √(2gh)</strong></p><h3>Ejercicio Resuelto</h3><p>Piedra desde 80 m. ¿Tiempo de caída?</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">t = √(2h/g) = √(160/9.8) = 4.04 s\nv = √(2gh) = 39.6 m/s</pre><h3>Ejercicios Propuestos</h3><ol><li>Tren a 120 km/h. ¿Distancia en 45 min?</li><li>Auto frena de 25 m/s a 5 m/s en 4 s. ¿Aceleración?</li><li>Pelota lanzada hacia arriba a 20 m/s. ¿Altura máxima?</li></ol><blockquote style="border-left:4px solid #4facfe;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: Dibuja diagrama y usa unidades SI.</blockquote>';
        } else if (level.id === 'q1') {
            html = '<h2>⚗️ Estructura Atómica</h2><h3>Objetivos</h3><ul><li>Identificar partículas subatómicas</li><li>Calcular protones, neutrones, electrones</li><li>Escribir configuraciones electrónicas</li></ul><h3>Partículas Subatómicas</h3><p><strong>Protón (p⁺):</strong> masa 1.007 u, carga +1</p><p><strong>Neutrón (n⁰):</strong> masa 1.009 u, carga 0</p><p><strong>Electrón (e⁻):</strong> masa 0.0005 u, carga -1</p><h3>Números Atómicos</h3><p><strong>Z</strong> = Protones = Identidad del elemento</p><p><strong>A</strong> = Protones + Neutrones</p><p><strong>Neutrones</strong> = A - Z</p><h3>Configuración Electrónica</h3><p>Orden: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p...</p><p>Regla Pauli: máximo 2 e⁻ por orbital</p><p>Regla Hund: llenar orbitales paralelos primero</p><h3>Ejercicio Resuelto</h3><p>Fe-56 (Z=26): ¿Protones, neutrones, electrones?</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">Protones = 26\nElectrones = 26 (neutro)\nNeutrones = 56 - 26 = 30</pre><h3>Ejercicios Propuestos</h3><ol><li>O-16 (Z=8): ¿Protones, neutrones, electrones?</li><li>Configuración de N(Z=7), Al(Z=13)</li><li>¿Electrones desapareados en P(Z=15)?</li></ol><blockquote style="border-left:4px solid #43e97b;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: "1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p"</blockquote>';
        } else if (level.id === 'b1') {
            html = '<h2>🧬 La Célula</h2><h3>Objetivos</h3><ul><li>Comprender teoría celular</li><li>Identificar organelos</li><li>Diferenciar animal y vegetal</li></ul><h3>Postulados de la Teoría Celular</h3><ol><li>Todos los seres vivos están formados por células</li><li>La célula es la unidad básica de estructura y función</li><li>Todas las células provienen de células preexistentes</li></ol><h3>Tipos de Células</h3><p><strong>Procariota:</strong> 1-10 μm, sin núcleo definido, sin organelos con membrana</p><p><strong>Eucariota:</strong> 10-100 μm, núcleo con membrana, muchos organelos</p><h3>Organelos Principales</h3><p><strong>Mitocondria:</strong> ATP, respiración celular</p><p><strong>Ribosoma:</strong> síntesis de proteínas</p><p><strong>RE Rugoso:</strong> síntesis proteínas (con ribosomas)</p><p><strong>RE Liso:</strong> lípidos, detoxificación</p><p><strong>Aparato de Golgi:</strong> modificación, empaquetado</p><p><strong>Lisosoma:</strong> digestión intracelular</p><h3>Animal vs Vegetal</h3><p>Vegetal tiene: pared celular (celulosa), cloroplastos, vacuola grande</p><h3>Ejercicios Propuestos</h3><ol><li>Enumera los 3 postulados</li><li>¿Por qué las mitocondrias tienen ADN propio?</li><li>Explica transporte simple vs facilitado</li></ol><blockquote style="border-left:4px solid #fa709a;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: "Mi Reina Rugosa Lleva Gatos Lindos"</blockquote>';
        } else {
            html = '<h2>' + level.name + '</h2><p>Contenido en desarrollo. Completa este nivel para continuar.</p><h3>Ejercicios de Práctica</h3><ol><li>Ejercicio 1</li><li>Ejercicio 2</li><li>Ejercicio 3</li></ol>';
        }
        
        document.getElementById('markdown-content').innerHTML = html;

        // Renderizar sección de notas
        this.renderNotes(level.id);
        
        const completed = app.user.completedLevels[this.course.id] || [];
        const btn = document.getElementById('complete-btn');

        if (completed.includes(level.id)) {
            // ✅ Nivel ya completado: modo revisión, sin XP
            btn.textContent = '📖 Revisando';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'default';
            btn.title = 'Ya completaste este nivel. No se otorga XP al revisar.';
        } else {
            btn.textContent = '✓ Completar Nivel';
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.title = '';
        }
        
        this.renderSidebar();
        window.scrollTo(0, 0);
    }
}

function completeCurrentLevel() {
    const level = app.courses.find(function(c) { return c.id === courseViewer.course.id; }).levels[courseViewer.currentLevelIndex];
    
    // Seguridad extra: no completar si ya está completado
    const completed = app.user.completedLevels[courseViewer.course.id] || [];
    if (completed.includes(level.id)) return;

    app.completeLevel(courseViewer.course.id, level.id, level.xp);
    
    if (courseViewer.currentLevelIndex < courseViewer.course.levels.length - 1) {
        setTimeout(function() {
            courseViewer.loadLevel(courseViewer.currentLevelIndex + 1);
        }, 1500);
    } else {
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
    }
}

var courseViewer;
document.addEventListener('DOMContentLoaded', function() {
    courseViewer = new CourseViewer();
});
