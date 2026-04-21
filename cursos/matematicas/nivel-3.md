# 🔢 Nivel 3: Teoría de Conjuntos

## 🎯 Objetivos de Aprendizaje
- Comprender la noción de conjunto y sus elementos
- Representar conjuntos gráficamente y simbólicamente
- Operar con conjuntos: unión, intersección, diferencia, complemento
- Aplicar propiedades de las operaciones entre conjuntos
- Identificar conjuntos numéricos y especiales

---

## 📚 Teoría Fundamental

### 3.1 Noción de Conjunto

Un **conjunto** es una colección bien definida de objetos llamados **elementos**.

**Notación:**
- Conjuntos: letras mayúsculas (A, B, C, ...)
- Elementos: letras minúsculas (a, b, c, ...)
- Pertenece: a ∈ A ("a pertenece a A")
- No pertenece: b ∉ A ("b no pertenece a A")

---

### 3.2 Determinación de Conjuntos

**Por extensión:** Se listan todos los elementos.
- A = {1, 2, 3, 4, 5}
- B = {a, e, i, o, u}

**Por comprensión:** Se da una propiedad que define los elementos.
- A = {x ∈ ℕ | x &lt; 6} = {1, 2, 3, 4, 5}
- P = {x | x es número primo menor que 10} = {2, 3, 5, 7}

---

### 3.3 Diagramas de Venn

Representación gráfica donde:
- El rectángulo representa el **conjunto universal (U)**
- Los círculos representan conjuntos
- Los puntos dentro son elementos


┌─────────────────┐
│    U            │
│   ┌───┐         │
│   │ A │○a       │
│   │  ○b┌───┐    │
│   └───┘│ B │    │
│      ○c└───┘    │
│    ○d           │
└─────────────────┘



---

### 3.4 Relaciones entre Conjuntos

| Relación | Símbolo | Significado | Ejemplo |
|----------|---------|-------------|---------|
| **Igualdad** | A = B | Mismos elementos | {1,2} = {2,1} |
| **Inclusión** | A ⊆ B | Todo elemento de A está en B | {1} ⊆ {1,2} |
| **Subconjunto propio** | A ⊂ B | A ⊆ B pero A ≠ B | {1} ⊂ {1,2} |
| **Pertenencia** | a ∈ A | a es elemento de A | 2 ∈ {1,2,3} |

---

### 3.5 Conjuntos Especiales

| Conjunto | Símbolo | Definición | Ejemplo |
|----------|---------|------------|---------|
| **Vacío** | ∅ o {} | Sin elementos | ∅ = {} |
| **Unitario** | | Un solo elemento | {5} |
| **Universal** | U | Todos los elementos posibles | U = {1,2,3,4,5} |
| **Finito** | | Número contable de elementos | {a,b,c} |
| **Infinito** | | Elementos ilimitados | ℕ, ℤ, ℝ |

---

### 3.6 Conjuntos Numéricos


---

### 3.7 Operaciones entre Conjuntos

#### Unión (A ∪ B)
Elementos que están en A **o** en B (o en ambos).

**A ∪ B = {x | x ∈ A ∨ x ∈ B}**


┌─────────┐
│  A  │   │
│    ○○○  │
│  ○○○○○  │  ← Todo lo pintado
│    ○○○  │
│   │  B  │
└─────────┘


#### Intersección (A ∩ B)
Elementos que están en A **y** en B.

**A ∩ B = {x | x ∈ A ∧ x ∈ B}**

┌─────────┐
│  A  │   │
│       │ │
│    ○○○  │  ← Solo la zona común
│       │ │
│   │  B  │
└─────────┘


#### Diferencia (A - B)
Elementos que están en A **pero no** en B.

**A - B = {x | x ∈ A ∧ x ∉ B}**

#### Complemento (A' o Aᶜ)
Elementos del universal **que no están** en A.

**A' = {x ∈ U | x ∉ A}**

#### Diferencia Simétrica (A Δ B)
Elementos que están en A **o** en B, **pero no en ambos**.

**A Δ B = (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)**

---

### 3.8 Propiedades de las Operaciones

| Propiedad | Unión | Intersección |
|-----------|-------|--------------|
| **Idempotencia** | A ∪ A = A | A ∩ A = A |
| **Conmutativa** | A ∪ B = B ∪ A | A ∩ B = B ∩ A |
| **Asociativa** | (A∪B)∪C = A∪(B∪C) | (A∩B)∩C = A∩(B∩C) |
| **Distributiva** | A∪(B∩C)=(A∪B)∩(A∪C) | A∩(B∪C)=(A∩B)∪(A∩C) |
| **Identidad** | A ∪ ∅ = A | A ∩ U = A |
| **Dominación** | A ∪ U = U | A ∩ ∅ = ∅ |
| **Complemento** | A ∪ A' = U | A ∩ A' = ∅ |
| **De Morgan** | (A∪B)' = A'∩B' | (A∩B)' = A'∪B' |

---

## ✏️ Ejercicios Resueltos

### Ejercicio 1: Operaciones básicas
Dados: A = {1, 2, 3, 4}, B = {3, 4, 5, 6}, U = {1, 2, 3, 4, 5, 6, 7}

Hallar:
a) A ∪ B
b) A ∩ B
c) A - B
d) A'
e) A Δ B

**Solución:**


---

### Ejercicio 2: Verificación con De Morgan
Verifica: **(A ∪ B)' = A' ∩ B'**

**Solución:**


---

### Ejercicio 3: Cardinalidad
Si n(A) = 15, n(B) = 20, n(A ∩ B) = 8. Hallar n(A ∪ B).

**Solución:**



---

## 📝 Ejercicios Propuestos

### Nivel Básico
1. Determina por extensión:
   - A = {x ∈ ℕ | 2 < x ≤ 7}
   - B = {x | x es vocal de "murciélago"}

2. Dados A = {1,2,3,4,5}, B = {4,5,6,7}, U = {1,2,3,4,5,6,7,8}
   Halla: A ∪ B, A ∩ B, A - B, B - A, A', B'

3. Representa en diagrama de Venn:
   - A = {a,b,c}, B = {b,c,d,e}, U = {a,b,c,d,e,f}

### Nivel Intermedio
4. Si A ⊆ B y B ⊆ C, ¿qué puedes concluir? Demuéstralo.

5. Demuestra que: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)

6. Dados: n(A) = 25, n(B) = 30, n(A ∪ B) = 45. Halla n(A ∩ B).

### Nivel Avanzado (tipo examen universitario)
7. Demuestra que: A Δ B = (A ∪ B) - (A ∩ B) = (A - B) ∪ (B - A)

8. Si A ∩ B = ∅, demuestra que n(A ∪ B) = n(A) + n(B)

9. En una encuesta de 100 personas: 60 leen A, 50 leen B, 20 leen ambos. ¿Cuántos no leen ninguno?

---

## ✅ Autoevaluación

- [ ] Definir conjuntos por extensión y comprensión
- [ ] Representar conjuntos en diagramas de Venn
- [ ] Aplicar correctamente las 5 operaciones
- [ ] Identificar conjuntos numéricos y su jerarquía
- [ ] Aplicar propiedades de idempotencia, conmutativa, asociativa
- [ ] Aplicar leyes de De Morgan para conjuntos
- [ ] Resolver problemas de cardinalidad

> 💡 **Tip de Memoria:** "Unión es 'o', Intersección es 'y'. Diferencia es 'solo el primero'."

---

## 🔗 Fórmulas Clave


**Consejo:** Para problemas complejos, dibuja el diagrama de Venn primero y luego asigna regiones.
