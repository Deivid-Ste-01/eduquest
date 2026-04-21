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

    loadLevel(index) {
        this.currentLevelIndex = index;
        const level = this.course.levels[index];
        
        document.getElementById('content-title').textContent = level.name;
        document.getElementById('content-xp').textContent = level.xp + ' XP';
        
        // CONTENIDO EMBEBIDO DIRECTO
        var html = '';
        
        if (level.id === 'm1') {
            html = '<h2>📐 Álgebra Básica</h2><h3>Objetivos</h3><ul><li>Dominar operaciones con polinomios</li><li>Resolver ecuaciones lineales</li><li>Factorizar expresiones</li></ul><h3>Operaciones con Polinomios</h3><p><strong>Suma:</strong> (3x² + 5x - 2) + (2x² - 3x + 7) = <strong>5x² + 2x + 5</strong></p><p><strong>Producto:</strong> (x + 2)(x - 3) = x² - x - 6</p><h3>Ecuaciones Lineales</h3><p>Forma: <strong>ax + b = 0</strong></p><p>Solución: <strong>x = -b/a</strong></p><h3>Factorización</h3><p>1. Factor común: 6x + 9 = 3(2x + 3)</p><p>2. Diferencia de cuadrados: x² - 16 = (x+4)(x-4)</p><p>3. Trinomio perfecto: x² + 6x + 9 = (x+3)²</p><h3>Ejercicio Resuelto</h3><p><strong>Simplificar:</strong> (x² - 9)/(x - 3)</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">x² - 9 = (x+3)(x-3)\n(x+3)(x-3)/(x-3) = x+3\nRespuesta: x + 3</pre><h3>Ejercicios Propuestos</h3><ol><li>Simplifica: (3x² - 2x + 5) + (x² + 4x - 3)</li><li>Resuelve: 5x - 7 = 3x + 9</li><li>Factoriza: x² - 25</li></ol><blockquote style="border-left:4px solid #6366f1;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: Practica 30 minutos diarios para mantener tu racha.</blockquote>';
        } else if (level.id === 'm2') {
            html = '<h2>🧠 Lógica Proposicional</h2><h3>Objetivos</h3><ul><li>Distinguir proposiciones simples y compuestas</li><li>Dominar conectores lógicos</li><li>Identificar tautologías y contradicciones</li><li>Aplicar leyes lógicas</li></ul><h3>Proposiciones</h3><p><strong>Simple:</strong> No tiene conectores. Ej: "2 + 2 = 4"</p><p><strong>Compuesta:</strong> Tiene conectores. Ej: "2+2=4 <strong>y</strong> 3+3=6"</p><h3>Conectores Lógicos</h3><table border="1" style="width:100%;border-collapse:collapse;"><tr style="background:#6366f1;color:white;"><th>Conector</th><th>Símbolo</th><th>Significado</th></tr><tr><td>Conjunción</td><td>∧</td><td>"y"</td></tr><tr><td>Disyunción</td><td>∨</td><td>"o" (inclusivo)</td></tr><tr><td>Disyunción exclusiva</td><td>⊕</td><td>"o...o" (exclusivo)</td></tr><tr><td>Condicional</td><td>→</td><td>"si...entonces"</td></tr><tr><td>Bicondicional</td><td>↔</td><td>"si y solo si"</td></tr><tr><td>Negación</td><td>¬</td><td>"no"</td></tr></table><h3>Tablas de Verdad Clave</h3><p><strong>Conjunción (p ∧ q):</strong> Solo V cuando AMBAS son V</p><p><strong>Disyunción (p ∨ q):</strong> Solo F cuando AMBAS son F</p><p><strong>Condicional (p → q):</strong> Solo F cuando p=V y q=F</p><p><strong>Bicondicional (p ↔ q):</strong> V cuando SON IGUALES</p><h3>Tautología, Contradicción, Contingencia</h3><p><strong>Tautología:</strong> Siempre V (ej: p ∨ ¬p)</p><p><strong>Contradicción:</strong> Siempre F (ej: p ∧ ¬p)</p><p><strong>Contingencia:</strong> Depende de valores (ej: p → q)</p><h3>Leyes Lógicas Principales</h3><p><strong>De Morgan:</strong> ¬(p ∧ q) ≡ ¬p ∨ ¬q</p><p><strong>Implicación:</strong> p → q ≡ ¬p ∨ q</p><p><strong>Doble negación:</strong> ¬(¬p) ≡ p</p><h3>Condición Necesaria y Suficiente</h3><p>En <strong>p → q</strong>:</p><ul><li>p es <strong>suficiente</strong> para q</li><li>q es <strong>necesaria</strong> para p</li></ul><p>En <strong>p ↔ q</strong>: p es necesaria Y suficiente para q</p><h3>Ejercicio Resuelto</h3><p><strong>Demostrar que (p → q) ∨ (q → p) es tautología</strong></p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">p | q | p→q | q→p | (p→q)∨(q→p)\n----------------------------------\nV | V |  V  |  V  |      V\nV | F |  F  |  V  |      V\nF | V |  V  |  F  |      V\nF | F |  V  |  V  |      V\n\nSiempre es V → TAUTOLOGÍA</pre><h3>Ejercicios Propuestos</h3><ol><li>Construye tabla de verdad de: (p → q) ∧ (q → p)</li><li>Simplifica con De Morgan: ¬(¬p ∧ q)</li><li>Demuestra que p → (p ∨ q) es tautología</li><li>Expresa p → q usando solo ¬ y ∨</li></ol><blockquote style="border-left:4px solid #6366f1;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: "De Morgan invierte: el \'y\' se vuelve \'o\', y niega todo"</blockquote>';
        } else if (level.id === 'm3') {
            html = '<h2>🔢 Teoría de Conjuntos</h2><h3>Objetivos</h3><ul><li>Comprender noción de conjunto y elementos</li><li>Representar conjuntos gráficamente</li><li>Operar con conjuntos</li><li>Aplicar propiedades de operaciones</li></ul><h3>Determinación de Conjuntos</h3><p><strong>Por extensión:</strong> Se listan elementos. Ej: A = {1, 2, 3, 4, 5}</p><p><strong>Por comprensión:</strong> Se da propiedad. Ej: A = {x ∈ ℕ | x < 6}</p><h3>Relaciones entre Conjuntos</h3><table border="1" style="width:100%;border-collapse:collapse;"><tr style="background:#6366f1;color:white;"><th>Relación</th><th>Símbolo</th><th>Significado</th></tr><tr><td>Pertenencia</td><td>∈</td><td>Elemento está en conjunto</td></tr><tr><td>Inclusión</td><td>⊆</td><td>Todo elemento de A está en B</td></tr><tr><td>Subconjunto propio</td><td>⊂</td><td>A ⊆ B pero A ≠ B</td></tr><tr><td>Igualdad</td><td>=</td><td>Mismos elementos</td></tr></table><h3>Conjuntos Especiales</h3><p><strong>Vacío:</strong> ∅ = {} (sin elementos)</p><p><strong>Unitario:</strong> Un solo elemento. Ej: {5}</p><p><strong>Universal:</strong> U (todos los elementos posibles)</p><p><strong>Finito:</strong> Número contable. Ej: {a, b, c}</p><p><strong>Infinito:</strong> Elementos ilimitados. Ej: ℕ, ℤ, ℝ</p><h3>Conjuntos Numéricos</h3><p>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ</p><p><strong>ℕ:</strong> Naturales | <strong>ℤ:</strong> Enteros | <strong>ℚ:</strong> Racionales | <strong>ℝ:</strong> Reales | <strong>ℂ:</strong> Complejos</p><h3>Operaciones</h3><p><strong>Unión (A ∪ B):</strong> Elementos en A <strong>o</strong> en B</p><p><strong>Intersección (A ∩ B):</strong> Elementos en A <strong>y</strong> en B</p><p><strong>Diferencia (A - B):</strong> En A <strong>pero no</strong> en B</p><p><strong>Complemento (A\'):</strong> En U <strong>pero no</strong> en A</p><p><strong>Diferencia simétrica (A Δ B):</strong> En A <strong>o</strong> B, <strong>pero no</strong> ambos</p><h3>Propiedades</h3><table border="1" style="width:100%;border-collapse:collapse;"><tr style="background:#6366f1;color:white;"><th>Propiedad</th><th>Unión</th><th>Intersección</th></tr><tr><td>Idempotencia</td><td>A ∪ A = A</td><td>A ∩ A = A</td></tr><tr><td>Conmutativa</td><td>A ∪ B = B ∪ A</td><td>A ∩ B = B ∩ A</td></tr><tr><td>Distributiva</td><td>A∪(B∩C)=(A∪B)∩(A∪C)</td><td>A∩(B∪C)=(A∩B)∪(A∩C)</td></tr><tr><td>De Morgan</td><td>(A∪B)\' = A\'∩B\'</td><td>(A∩B)\' = A\'∪B\'</td></tr></table><h3>Ejercicio Resuelto</h3><p><strong>Dados A = {1,2,3,4}, B = {3,4,5,6}, U = {1,2,3,4,5,6,7}</strong></p><p>Hallar: A ∪ B, A ∩ B, A - B, A\', A Δ B</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">A ∪ B = {1,2,3,4,5,6}\nA ∩ B = {3,4}\nA - B = {1,2}\nA\' = {5,6,7}\nA Δ B = {1,2,5,6}</pre><h3>Ejercicios Propuestos</h3><ol><li>Determina por extensión: A = {x ∈ ℕ | 2 < x ≤ 7}</li><li>Dados n(A)=15, n(B)=20, n(A∩B)=8. Halla n(A∪B)</li><li>Demuestra: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</li><li>En 100 personas: 60 leen A, 50 leen B, 20 ambos. ¿Cuántos ninguno?</li></ol><blockquote style="border-left:4px solid #6366f1;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: "Unión es \'o\', Intersección es \'y\'. Diferencia es \'solo el primero\'."</blockquote>';
        } else if (level.id === 'm4') {
            html = '<h2>📊 Ecuaciones de Primer Grado</h2><h3>Objetivos</h3><ul><li>Plantear y resolver ecuaciones lineales</li><li>Comprender ecuación cuadrática</li><li>Interpretar geométricamente</li><li>Resolver bicuadráticas y recíprocas</li></ul><h3>Ecuaciones Lineales</h3><p>Forma: <strong>ax + b = 0</strong>, a ≠ 0</p><p>Solución: <strong>x = -b/a</strong></p><h3>Planteo de Ecuaciones</h3><table border="1" style="width:100%;border-collapse:collapse;"><tr style="background:#6366f1;color:white;"><th>Palabra</th><th>Operación</th></tr><tr><td>"suma de", "más que"</td><td>+</td></tr><tr><td>"diferencia de", "menos que"</td><td>-</td></tr><tr><td>"producto de", "veces"</td><td>×</td></tr><tr><td>"cociente de", "dividido"</td><td>÷</td></tr><tr><td>"es", "igual a"</td><td>=</td></tr></table><h3>Ecuación Cuadrática</h3><p>Forma: <strong>ax² + bx + c = 0</strong>, a ≠ 0</p><p><strong>Fórmula general:</strong> x = (-b ± √(b²-4ac)) / 2a</p><h3>Discriminante (Δ = b² - 4ac)</h3><p><strong>Δ > 0:</strong> 2 raíces reales distintas</p><p><strong>Δ = 0:</strong> 1 raíz real doble</p><p><strong>Δ < 0:</strong> 0 raíces reales (complejas)</p><h3>Propiedades de las Raíces</h3><p><strong>Suma:</strong> x₁ + x₂ = -b/a</p><p><strong>Producto:</strong> x₁ · x₂ = c/a</p><p><strong>Ecuación desde raíces:</strong> x² - (suma)x + (producto) = 0</p><h3>Interpretación Geométrica (Parábola)</h3><p><strong>Vértice:</strong> (-b/2a, -Δ/4a)</p><p><strong>Eje de simetría:</strong> x = -b/2a</p><p><strong>Intersección y:</strong> (0, c)</p><p><strong>Concavidad:</strong> Arriba (a>0), Abajo (a<0)</p><h3>Ecuaciones Bicuadráticas</h3><p>Forma: <strong>ax⁴ + bx² + c = 0</strong></p><p><strong>Método:</strong> Sustituir y = x² → ay² + by + c = 0</p><p>Luego x = ±√y (solo si y ≥ 0)</p><h3>Ecuaciones Recíprocas</h3><p><strong>Tipo I:</strong> ax⁴ + bx³ + cx² + bx + a = 0</p><p>Método: Dividir entre x², sustituir y = x + 1/x</p><h3>Ejercicio Resuelto 1</h3><p><strong>Resolver:</strong> (2x+1)/3 - (x-2)/4 = 2</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">Multiplicar por 12 (mcm de 3 y 4):\n4(2x+1) - 3(x-2) = 24\n8x + 4 - 3x + 6 = 24\n5x + 10 = 24\n5x = 14\nx = 14/5 = 2.8</pre><h3>Ejercicio Resuelto 2</h3><p><strong>Resolver:</strong> 2x² - 7x + 3 = 0</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">a=2, b=-7, c=3\nΔ = 49 - 24 = 25\nx = (7 ± 5)/4\nx₁ = 12/4 = 3\nx₂ = 2/4 = 1/2\n\nVerificación:\nSuma: 3 + 1/2 = 7/2 = -(-7)/2 ✓\nProducto: 3·(1/2) = 3/2 = c/a ✓</pre><h3>Ejercicio Resuelto 3</h3><p><strong>Bicuadrática:</strong> x⁴ - 13x² + 36 = 0</p><pre style="background:#1e293b;color:#e2e8f0;padding:15px;border-radius:8px;">Sustitución: y = x²\ny² - 13y + 36 = 0\n(y-4)(y-9) = 0\ny = 4 → x = ±2\ny = 9 → x = ±3\n\nSoluciones: x = -3, -2, 2, 3</pre><h3>Ejercicios Propuestos</h3><ol><li>Resuelve: 5x - 7 = 3x + 9</li><li>Resuelve: (3x+2)/5 = (2x-1)/3</li><li>Halla vértice de: y = x² - 6x + 5</li><li>La suma de dos números es 45, diferencia 13. Hallarlos.</li><li>Resolver: x⁴ - 10x² + 9 = 0</li><li>Forma ecuación cuadrática con raíces 2 y -5</li></ol><blockquote style="border-left:4px solid #6366f1;padding-left:15px;color:#64748b;font-style:italic;">💡 Tip: Para bicuadráticas, recuerda: x² = y requiere y ≥ 0 para soluciones reales.</blockquote>';
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
    const level = app.courses.find(function(c) { return c.id === courseViewer.course.id; }).levels[courseViewer.currentLevelIndex];
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
