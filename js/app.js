class EduQuest {
    constructor() {
        this.user = this.loadUser();
        this.courses = this.loadCourses();
        this.achievements = this.defineAchievements();
        this.rewards = this.defineRewards();
        this.init();
    }

    loadUser() {
        const defaultUser = {
            name: 'Estudiante',
            xp: 0,
            level: 1,
            streak: 0,
            lastStudy: null,
            completedLevels: {},
            unlockedAchievements: [],
            unlockedRewards: [],
            totalStudyTime: 0
        };
        return { ...defaultUser, ...(JSON.parse(localStorage.getItem('eduquest_user')) || {}) };
    }

    saveUser() {
        localStorage.setItem('eduquest_user', JSON.stringify(this.user));
    }

    addXP(amount, reason = '') {
        const oldLevel = this.user.level;
        this.user.xp += amount;
        
        let required = 100;
        let level = 1;
        let accumulated = 0;
        
        while (this.user.xp >= accumulated + required) {
            accumulated += required;
            required = Math.floor(required * 1.2);
            level++;
        }
        
        this.user.level = level;
        this.saveUser();
        this.updateUI();
        
        if (level > oldLevel) {
            this.showAchievement('⭐', '¡Subida de Nivel!', `¡Has alcanzado el nivel ${level}!`);
            this.checkRewards('level', level);
        }
        
        if (this.user.xp >= 1000 && !this.user.unlockedAchievements.includes('xp_1000')) {
            this.unlockAchievement('xp_1000');
        }
    }

    updateStreak() {
        const today = new Date().toDateString();
        const last = this.user.lastStudy;
        
        if (last) {
            const lastDate = new Date(last);
            const diff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
            
            if (diff === 1) {
                this.user.streak++;
                if (this.user.streak >= 7) {
                    this.unlockAchievement('streak_7');
                }
            } else if (diff > 1) {
                this.user.streak = 1;
            }
        } else {
            this.user.streak = 1;
        }
        
        this.user.lastStudy = today;
        this.saveUser();
    }

    loadCourses() {
        return [
            {
                id: 'matematicas',
                name: 'Matemáticas',
                icon: '📐',
                desc: 'Álgebra, cálculo y geometría',
                color: 'course-math',
                levels: [
                    { id: 'm1', name: 'Nivel 1: Álgebra Básica', xp: 50, content: 'cursos/matematicas/nivel-1.md' },
                    { id: 'm2', name: 'Nivel 2: Ecuaciones', xp: 75, content: 'cursos/matematicas/nivel-2.md' },
                    { id: 'm3', name: 'Nivel 3: Funciones', xp: 100, content: 'cursos/matematicas/nivel-3.md' },
                    { id: 'm4', name: 'Nivel 4: Cálculo Diferencial', xp: 150, content: 'cursos/matematicas/nivel-4.md' }
                ]
            },
            {
                id: 'fisica',
                name: 'Física',
                icon: '⚛️',
                desc: 'Mecánica, termodinámica y electromagnetismo',
                color: 'course-physics',
                levels: [
                    { id: 'f1', name: 'Nivel 1: Cinemática', xp: 50, content: 'cursos/fisica/nivel-1.md' },
                    { id: 'f2', name: 'Nivel 2: Dinámica', xp: 75, content: 'cursos/fisica/nivel-2.md' },
                    { id: 'f3', name: 'Nivel 3: Energía', xp: 100, content: 'cursos/fisica/nivel-3.md' }
                ]
            },
            {
                id: 'quimica',
                name: 'Química',
                icon: '⚗️',
                desc: 'Química general y orgánica',
                color: 'course-chem',
                levels: [
                    { id: 'q1', name: 'Nivel 1: Estructura Atómica', xp: 50, content: 'cursos/quimica/nivel-1.md' },
                    { id: 'q2', name: 'Nivel 2: Enlaces Químicos', xp: 75, content: 'cursos/quimica/nivel-2.md' }
                ]
            },
            {
                id: 'biologia',
                name: 'Biología',
                icon: '🧬',
                desc: 'Biología celular y genética',
                color: 'course-bio',
                levels: [
                    { id: 'b1', name: 'Nivel 1: Célula', xp: 50, content: 'cursos/biologia/nivel-1.md' },
                    { id: 'b2', name: 'Nivel 2: Genética', xp: 75, content: 'cursos/biologia/nivel-2.md' }
                ]
            }
        ];
    }

    completeLevel(courseId, levelId, xpEarned) {
        if (!this.user.completedLevels[courseId]) {
            this.user.completedLevels[courseId] = [];
        }
        
        if (!this.user.completedLevels[courseId].includes(levelId)) {
            this.user.completedLevels[courseId].push(levelId);
            this.addXP(xpEarned, `Completó ${levelId}`);
            this.updateStreak();
            
            const course = this.courses.find(c => c.id === courseId);
            const completed = this.user.completedLevels[courseId].length;
            
            if (completed === 1) this.unlockAchievement('first_level');
            if (completed === course.levels.length) {
                this.unlockAchievement(`complete_${courseId}`);
                this.showAchievement('🏆', '¡Curso Completado!', `Has dominado ${course.name}`);
            }
            
            this.saveUser();
            this.renderCourses();
        }
    }

    defineAchievements() {
        return {
            'first_level': { icon: '🌱', name: 'Primeros Pasos', desc: 'Completa tu primer nivel' },
            'complete_matematicas': { icon: '🔢', name: 'Matemático', desc: 'Completa todos los niveles de Matemáticas' },
            'complete_fisica': { icon: '🔭', name: 'Físico', desc: 'Completa todos los niveles de Física' },
            'complete_quimica': { icon: '🧪', name: 'Químico', desc: 'Completa todos los niveles de Química' },
            'complete_biologia': { icon: '🌿', name: 'Biólogo', desc: 'Completa todos los niveles de Biología' },
            'xp_1000': { icon: '💎', name: 'Experto', desc: 'Acumula 1000 XP' },
            'streak_7': { icon: '🔥', name: 'En Racha', desc: '7 días consecutivos estudiando' },
            'all_courses': { icon: '👑', name: 'Polímata', desc: 'Completa al menos un nivel de cada curso' }
        };
    }

    unlockAchievement(achievementId) {
        if (!this.user.unlockedAchievements.includes(achievementId)) {
            this.user.unlockedAchievements.push(achievementId);
            const ach = this.achievements[achievementId];
            this.showAchievement(ach.icon, `¡${ach.name}!`, ach.desc);
            this.saveUser();
            this.renderAchievements();
        }
    }

    defineRewards() {
        return [
            { id: 'r1', icon: '🎨', name: 'Tema Oscuro', desc: 'Desbloquea el modo oscuro', condition: { type: 'level', value: 2 } },
            { id: 'r2', icon: '🎵', name: 'Música de Fondo', desc: 'Música ambiental para estudiar', condition: { type: 'level', value: 3 } },
            { id: 'r3', icon: '📊', name: 'Estadísticas Avanzadas', desc: 'Gráficos de tu progreso', condition: { type: 'level', value: 4 } },
            { id: 'r4', icon: '🏅', name: 'Insignia Dorada', desc: 'Perfil dorado exclusivo', condition: { type: 'achievement', value: 'all_courses' } },
            { id: 'r5', icon: '🚀', name: 'Modo Turbo', desc: 'Navegación acelerada', condition: { type: 'xp', value: 500 } }
        ];
    }

    checkRewards(type, value) {
        this.rewards.forEach(reward => {
            if (this.user.unlockedRewards.includes(reward.id)) return;
            
            let unlocked = false;
            if (reward.condition.type === type && value >= reward.condition.value) unlocked = true;
            if (reward.condition.type === 'achievement' && this.user.unlockedAchievements.includes(reward.condition.value)) unlocked = true;
            if (reward.condition.type === 'xp' && this.user.xp >= reward.condition.value) unlocked = true;
            
            if (unlocked) {
                this.user.unlockedRewards.push(reward.id);
                this.showReward(reward);
                this.saveUser();
            }
        });
    }

    showReward(reward) {
        const panel = document.getElementById('rewards-panel');
        const list = document.getElementById('rewards-list');
        
        const div = document.createElement('div');
        div.className = 'reward-item';
        div.innerHTML = `
            <div class="reward-icon">${reward.icon}</div>
            <div class="reward-info">
                <h4>${reward.name}</h4>
                <p>${reward.desc}</p>
            </div>
        `;
        list.appendChild(div);
        
        panel.classList.add('active');
        setTimeout(() => panel.classList.remove('active'), 5000);
    }

    init() {
        this.updateUI();
        this.renderCourses();
        this.renderAchievements();
        this.createRewardsToggle();
        this.checkRewards('level', this.user.level);
        this.checkRewards('xp', this.user.xp);
    }

    updateUI() {
        document.getElementById('user-xp').textContent = this.user.xp;
        document.getElementById('user-level').textContent = this.user.level;
        document.getElementById('user-streak').textContent = this.user.streak;
        document.getElementById('level-badge').textContent = this.user.level;
        
        let required = 100;
        let accumulated = 0;
        for (let i = 1; i < this.user.level; i++) {
            accumulated += required;
            required = Math.floor(required * 1.2);
        }
        const currentLevelXP = this.user.xp - accumulated;
        const progress = (currentLevelXP / required) * 100;
        
        document.getElementById('xp-progress').style.width = `${Math.min(progress, 100)}%`;
        document.getElementById('xp-text').textContent = `${currentLevelXP} / ${required} XP`;
    }

    renderCourses() {
        const grid = document.getElementById('courses-grid');
        grid.innerHTML = '';
        
        this.courses.forEach(course => {
            const completed = this.user.completedLevels[course.id] || [];
            const card = document.createElement('div');
            card.className = `course-card ${completed.length === course.levels.length ? 'completed' : ''}`;
            
            let levelsHTML = '';
            course.levels.forEach((level, idx) => {
                const isCompleted = completed.includes(level.id);
                const isCurrent = !isCompleted && (idx === 0 || completed.includes(course.levels[idx-1].id));
                let status = isCompleted ? 'completed' : (isCurrent ? 'current' : '');
                levelsHTML += `<div class="level-dot ${status}" title="${level.name}"></div>`;
            });
            
            const totalXP = course.levels.reduce((sum, l) => sum + l.xp, 0);
            const earnedXP = completed.reduce((sum, id) => {
                const level = course.levels.find(l => l.id === id);
                return sum + (level ? level.xp : 0);
            }, 0);
            
            card.innerHTML = `
                <div class="course-header ${course.color}">
                    <span>${course.icon}</span>
                    <div class="completed-badge">✓ Completado</div>
                </div>
                <div class="course-body">
                    <h3 class="course-title">${course.name}</h3>
                    <p class="course-desc">${course.desc}</p>
                    <div class="course-meta">
                        <div class="course-levels">${levelsHTML}</div>
                        <span class="course-xp">${earnedXP}/${totalXP} XP</span>
                    </div>
                </div>
            `;
            
            card.onclick = () => this.openCourse(course);
            grid.appendChild(card);
        });
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = '';
        
        Object.entries(this.achievements).forEach(([id, ach]) => {
            const unlocked = this.user.unlockedAchievements.includes(id);
            const card = document.createElement('div');
            card.className = `achievement-card ${unlocked ? 'unlocked' : ''}`;
            card.innerHTML = `
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
            `;
            grid.appendChild(card);
        });
    }

    createRewardsToggle() {
        const btn = document.createElement('button');
        btn.className = 'rewards-toggle';
        btn.innerHTML = '🎁';
        btn.onclick = () => document.getElementById('rewards-panel').classList.toggle('active');
        document.body.appendChild(btn);
    }

    showAchievement(icon, title, desc) {
        const popup = document.getElementById('achievement-popup');
        document.getElementById('popup-icon').textContent = icon;
        document.getElementById('popup-title').textContent = title;
        document.getElementById('popup-desc').textContent = desc;
        popup.classList.add('active');
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    openCourse(course) {
        localStorage.setItem('eduquest_current_course', JSON.stringify(course));
        window.location.href = 'curso.html';
    }
}

function closePopup() {
    document.getElementById('achievement-popup').classList.remove('active');
}

const app = new EduQuest();
