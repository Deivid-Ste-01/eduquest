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

    loadLevel(index) {
        this.currentLevelIndex = index;
        const level = this.course.levels[index];
        
        document.getElementById('content-title').textContent = level.name;
        document.getElementById('content-xp').textContent = `${level.xp} XP`;
        
        // CONTENIDO EMBEBIDO - No necesita fetch
        const contents = {
            'm1': `
                <h2>📐 Álgebra Básica</h2>
                <h3>🎯 Objetivos</h3>
                <ul>
                    <li>Dominar operaciones con polinomios</li>
                    <li>Resolver ecuaciones lineales</li>
                    <li>Factorizar expresiones algebraicas</li>
                </ul>
                
                <h3>📚 Operaciones con Polinomios</h3>
                <p>Un <strong>polinomio</strong> tiene la forma: P(x) = aₙxⁿ + ... + a₁x + a₀</p>
                
                <h4>Suma de Polinomios</h4>
                <p><strong>Ejemplo:</strong> (3x² + 5x - 2) + (2x² - 3x + 7) = <strong>5x² + 2x + 5</strong></p>
                
                <h4>Producto de Polinomios</h4>
                <p><strong>Ejemplo:</strong> (x + 2)(x - 3) = x² - x - 6</p>
                
                <h3>📐 Ecuaciones Lineales</h3>
                <p>Forma: <strong>ax + b = 0</strong></p>
                <p>Solución: <strong>x = -b/a</strong></p>
                
                <h4>Pasos para resolver:</h4>
                <ol>
                    <li>Eliminar paréntesis</li>
                    <li>Pasar términos con x a la izquierda</li>
                    <li>Pasar números al lado derecho</li>
                    <li>Despejar x</li>
                    <li>Verificar</li>
                </ol>
                
                <h3>🔢 Factorización</h3>
                <table border="1" style="width:100%; border-collapse:collapse;">
                    <tr style="background:#6366f1; color:white;">
                        <th>Método</th><th>Forma</th><th>Ejemplo</th>
                    </tr>
                    <tr><td>Factor común</td><td>ab + ac = a(b+c)</td><td>6x + 9 = 3(2x + 3)</td></tr>
                    <tr><td>Diferencia de cuadrados</td><td>a² - b² = (a+b)(a-b)</td><td>x² - 16 = (x+4)(x-4)</td></tr>
                    <tr><td>Trinomio perfecto</td><td>a² + 2ab + b² = (a+b)²</td><td>x² + 6x + 9 = (x+3)²</td></tr>
                </table>
                
                <h3>✏️ Ejercicio Resuelto</h3>
                <p><strong>Simplificar:</strong> (x² - 9)/(x - 3)</p>
                <pre style="background:#1e293b; color:#e2e8f0; padding:15px; border-radius:8px;">
Paso 1: x² - 9 = (x + 3)(x - 3)
Paso 2: (x + 3)(x - 3)/(x - 3) = x + 3
Respuesta: x + 3 (donde x ≠ 3)</pre>
                
                <h3>📝 Ejercicios Propuestos</h3>
                <p><strong>Básico:</strong></p>
                <ol>
                    <li>Simplifica: (3x² - 2x + 5) + (x² + 4x - 3)</li>
                    <li>Resuelve: 5x - 7 = 3x + 9</li>
                    <li>Factoriza: x² - 25</li>
                </ol>
                
                <p><strong>Intermedio:</strong></p>
                <ol start="4">
                    <li>Resuelve: (2x+1)/3 - (x-2)/4 = 2</li>
                    <li>Factoriza: 2x² + 7x + 3</li>
                </ol>
                
                <blockquote style="border-left:4px solid #6366f1; padding-left:15px; color:#64748b; font-style:italic;">
                    💡 <strong>Tip de Estudio:</strong> Practica al menos 30 minutos diarios para mantener tu racha de aprendizaje.
                </blockquote>
            `,
            'f1': `
                <h2>⚛️ Cinemática</h2>
                <h3>🎯 Objetivos</h3>
                <ul>
                    <li>Comprender MRU y MRUA</li>
                    <li>Calcular velocidad y aceleración</li>
                    <li>Resolver problemas de caída libre</li>
                </ul>
                
                <h3>📊 Conceptos Básicos</h3>
                <table border="1" style="width:100%; border-collapse:collapse;">
                    <tr style="background:#4facfe; color:white;">
                        <th>Magnitud</th><th>Símbolo</th><th>Unidad</th>
                    </tr>
                    <tr><td>Posición</td><td>x</td><td>metros (m)</td></tr>
                    <tr><td>Velocidad</td><td>v</td><td>m/s</td></tr>
                    <tr><td>Aceleración</td><td>a</td><td>m/s²</td></tr>
                </table>
                
                <h3>🚗 MRU (Velocidad Constante)</h3>
                <p><strong>v = d/t</strong> | <strong>d = v·t</strong> | <strong>t = d/v</strong></p>
                
                <h3>🏎️ MRUA (Aceleración Constante)</h3>
                <p><strong>v<sub>f</sub> = v<sub>i</sub> + at</strong></p>
                <p><strong>x = v<sub>i</sub>t + ½at²</strong></p>
                <p><strong>v<sub>f</sub>² = v<sub>i</sub>² + 2ax</strong></p>
                
                <h3>🪨 Caída Libre (a = g = 9.8 m/s²)</h3>
                <p><strong>h = ½gt²</strong> | <strong>v = √(2gh)</strong></p>
                
                <h3>✏️ Ejercicio Resuelto</h3>
                <p><strong>Problema:</strong> Se deja caer una piedra desde 80 m. ¿Tiempo de caída?</p>
                <pre style="background:#1e293b; color:#e2e8f0; padding:15px; border-radius:8px;">
Datos: h = 80 m, g = 9.8 m/s², vᵢ = 0

t = √(2h/g) = √(160/9.8) = √16.33 = 4.04 s

v = √(2gh) = √(1568) = 39.6 m/s</pre>
                
                <h3>📝 Ejercicios Propuestos</h3>
                <ol>
                    <li>Un tren a 120 km/h. ¿Distancia en 45 min?</li>
                    <li>Auto frena de 25 m/s a 5 m/s en 4 s. ¿Aceleración?</li>
                    <li>Pelota lanzada hacia arriba a 20 m/s. ¿Altura máxima?</li>
                </ol>
                
                <blockquote style="border-left:4px solid #4facfe; padding-left:15px; color:#64748b; font-style:italic;">
                    💡 <strong>Tip de Examen:</strong> Siempre dibuja un diagrama. Convierte todo a unidades SI (m, s, m/s).
                </blockquote>
            `,
            'q1': `
                <h2>⚗️ Estructura Atómica</h2>
                <h3>🎯 Objetivos</h3>
                <ul>
                    <li>Identificar partículas subatómicas</li>
                    <li>Calcular protones, neutrones, electrones</li>
                    <li>Escribir configuraciones electrónicas</li>
                </ul>
                
                <h3>⚛️ Partículas Subatómicas</h3>
                <table border="1" style="width:100%; border-collapse:collapse;">
                    <tr style="background:#43e97b; color:white;">
                        <th>Partícula</th><th>Símbolo</th><th>Masa</th><th>Carga</th>
                    </tr>
                    <tr><td>Protón</td><td>p⁺</td><td>1.007 u</td><td>+1</td></tr>
                    <tr><td>Neutrón</td><td>n⁰</td><td>1.009 u</td><td>0</td></tr>
                    <tr><td>Electrón</td><td>e⁻</td><td>0.0005 u</td><td>-1</td></tr>
                </table>
                
                <h3>🔢 Números Atómicos</h3>
                <p><strong>Z (Número atómico)</strong> = Protones = Identidad del elemento</p>
                <p><strong>A (Número de masa)</strong> = Protones + Neutrones</p>
                <p><strong>Neutrones</strong> = A - Z</p>
                
                <h3>📝 Configuración Electrónica</h3>
                <p><strong>Orden de llenado:</strong> 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p...</p>
                <p><strong>Regla de Pauli:</strong> Máximo 2 e⁻ por orbital</p>
                <p><strong>Regla de Hund:</strong> Llenar orbitales paralelos primero</p>
                
                <h3>✏️ Ejercicio Resuelto</h3>
                <p><strong>¿Cuántos protones, neutrones y electrones tiene Fe-56? (Z=26)</strong></p>
                <pre style="background:#1e293b; color:#e2e8f0; padding:15px; border-radius:8px;">
Protones = Z = 26
Electrones = 26 (átomo neutro)
Neutrones = A - Z = 56 - 26 = 30</pre>
                
                <h3>📝 Ejercicios Propuestos</h3>
                <ol>
                    <li>Completa: O-16 (Z=8) tiene ? protones, ? neutrones, ? electrones</li>
                    <li>Escribe configuración de: N(Z=7), Al(Z=13), Ar(Z=18)</li>
                    <li>¿Cuántos electrones desapareados tiene P(Z=15)?</li>
                </ol>
                
                <blockquote style="border-left:4px solid #43e97b; padding-left:15px; color:#64748b; font-style:italic;">
                    💡 <strong>Tip de Memoria:</strong> "1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p" - La canción del llenado.
                </blockquote>
            `,
            'b1': `
                <h2>🧬 La Célula</h2>
                <h3>🎯 Objetivos</h3>
                <ul>
                    <li>Comprender la teoría celular</li>
                    <li>Identificar organelos y funciones</li>
                    <li>Diferenciar célula animal y vegetal</li>
                </ul>
                
                <h3>📜 Postulados de la Teoría Celular</h3>
                <ol>
                    <li>Todos los seres vivos están formados por células</li>
                    <li>La célula es la unidad básica de estructura y función</li>
                    <li>Todas las células provienen de células preexistentes</li>
                </ol>
                
                <h3>🔬 Tipos de Células</h3>
                <table border="1" style="width:100%; border-collapse:collapse;">
                    <tr style="background:#fa709a; color:white;">
                        <th>Característica</th><th>Procariota</th><th>Eucariota</th>
                    </tr>
                    <tr><td>Tamaño</td><td>1-10 μm</td><td>10-100 μm</td></tr>
                    <tr><td>Núcleo</td><td>No definido</td><td>Con membrana</td></tr>
                    <tr><td>Organelos</td><td>Ninguno con membrana</td><td>Muchos</td></tr>
                </table>
                
                <h3>🏭 Organelos Principales</h3>
                <ul>
                    <li><strong>Mitocondria:</strong> Respiración celular, ATP ("Central eléctrica")</li>
                    <li><strong>Ribosoma:</strong> Síntesis de proteínas ("Fábrica")</li>
                    <li><strong>RE Rugoso:</strong> Síntesis proteínas (con ribosomas)</li>
                    <li><strong>RE Liso:</strong> Lípidos, detoxificación</li>
                    <li><strong>Aparato de Golgi:</strong> Modificación, empaquetado</li>
                    <li><strong>Lisosoma:</strong> Digestión intracelular</li>
                </ul>
                
                <h3>🌿 Animal vs Vegetal</h3>
                <table border="1" style="width:100%; border-collapse:collapse;">
                    <tr style="background:#fee140;">
                        <th>Característica</th><th>Animal</th><th>Vegetal</th>
                    </tr>
                    <tr><td>Pared celular</td><td>❌ No</td><td>✅ Sí (celulosa)</td></tr>
                    <tr><td>Cloroplastos</td><td>❌ No</td><td>✅ Sí</td></tr>
                    <tr><td>Vacuola</td><td>Pequeñas</td><td>✅ Grande</td></tr>
                </table>
                
                <h3>✏️ Ejercicio Resuelto</h3>
                <p><strong>¿Qué organelo produce ATP?</strong></p>
                <p>Respuesta: <strong>Mitocondria</strong> - Realiza respiración celular.</p>
                
                <h3>📝 Ejercicios Propuestos</h3>
                <ol>
                    <li>Enumera los 3 postulados de la teoría celular</li>
                    <li>¿Por qué las mitocondrias tienen ADN propio?</li>
                    <li>Explica transporte simple vs facilitado</li>
                </ol>
                
                <blockquote style="border-left:4px solid #fa709a; padding-left:15px; color:#64748b; font-style:italic;">
                    💡 <strong>Tip de Memoria:</strong> "Mi Reina Rugosa Lleva Gatos Lindos" = Mitocondria, Retículo, Ribosoma, Lisosoma, Golgi...
                </blockquote>
            `
        };
        
        const levelId = level.id;
        const content = contents[levelId] || `
            <h2>${level.name}</h2>
            <p>Contenido en desarrollo. Completa este nivel para desbloquear el siguiente.</p>
            <h3>Ejercicios de práctica</h3>
            <ol>
                <li>Ejercicio 1</li>
                <li>Ejercicio 2</li>
                <li>Ejercicio 3</li>
            </ol>
        `;
        
        document.getElementById('markdown-content').innerHTML = content;
        
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
