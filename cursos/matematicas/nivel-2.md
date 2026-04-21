# 🧠 Nivel 2: Lógica Proposicional

## 🎯 Objetivos de Aprendizaje
- Distinguir proposiciones simples y compuestas
- Dominar conectores lógicos y sus tablas de verdad
- Identificar tautologías, contradicciones y contingencias
- Aplicar leyes lógicas para simplificar fórmulas
- Comprender condición necesaria y suficiente

---

## 📚 Teoría Fundamental

### 2.1 Proposiciones

Una **proposición** es un enunciado que puede ser **verdadero (V)** o **falso (F)**, pero no ambos.

**Proposición simple:** No tiene conectores lógicos.
- Ejemplos: 
  - "2 + 2 = 4" (V)
  - "Lima es la capital de Chile" (F)
  - "5 es número primo" (V)

**Proposición compuesta:** Formada por proposiciones simples unidas con conectores.
- Ejemplos:
  - "2 + 2 = 4 **y** 3 + 3 = 6"
  - "Si llueve, **entonces** llevo paraguas"

---

### 2.2 Conectores Lógicos

| Conector | Símbolo | Significado | Ejemplo |
|----------|---------|-------------|---------|
| **Conjunción** | ∧ | "y", "pero" | p ∧ q |
| **Disyunción** | ∨ | "o" (inclusivo) | p ∨ q |
| **Disyunción exclusiva** | ⊕ | "o...o" (exclusivo) | p ⊕ q |
| **Condicional** | → | "si...entonces" | p → q |
| **Bicondicional** | ↔ | "si y solo si" | p ↔ q |
| **Negación** | ¬ | "no" | ¬p |

---

### 2.3 Tablas de Verdad

#### Negación (¬p)

| p | ¬p |
|---|----|
| V | F |
| F | V |

#### Conjunción (p ∧ q)

| p | q | p ∧ q |
|---|---|-------|
| V | V | **V** |
| V | F | F |
| F | V | F |
| F | F | F |

&gt; 💡 **Regla:** Solo es V cuando AMBAS son V.

#### Disyunción (p ∨ q)

| p | q | p ∨ q |
|---|---|-------|
| V | V | **V** |
| V | F | **V** |
| F | V | **V** |
| F | F | F |

&gt; 💡 **Regla:** Solo es F cuando AMBAS son F.

#### Disyunción exclusiva (p ⊕ q)

| p | q | p ⊕ q |
|---|---|-------|
| V | V | F |
| V | F | **V** |
| F | V | **V** |
| F | F | F |

&gt; 💡 **Regla:** Es V cuando SON DIFERENTES.

#### Condicional (p → q)

| p | q | p → q |
|---|---|-------|
| V | V | **V** |
| V | F | F |
| F | V | **V** |
| F | F | **V** |

&gt; 💡 **Regla:** Solo es F cuando p=V y q=F (promesa rota).

#### Bicondicional (p ↔ q)

| p | q | p ↔ q |
|---|---|-------|
| V | V | **V** |
| V | F | F |
| F | V | F |
| F | F | **V** |

&gt; 💡 **Regla:** Es V cuando SON IGUALES.

---

### 2.4 Tautología, Contradicción y Contingencia

| Tipo | Definición | Ejemplo |
|------|-----------|---------|
| **Tautología** | Siempre V, sin importar valores | p ∨ ¬p |
| **Contradicción** | Siempre F, sin importar valores | p ∧ ¬p |
| **Contingencia** | Depende de los valores | p → q |

---

### 2.5 Condición Necesaria y Suficiente

En **p → q** (si p entonces q):

| Concepto | Significado | Ejemplo |
|----------|-------------|---------|
| **p es condición suficiente** para q | Con p garantizas q | "Si es perro → es mamífero" (ser perro es suficiente) |
| **q es condición necesaria** para p | Sin q no puede haber p | "Es mamífero" es necesario para "es perro" |

En **p ↔ q** (p si y solo si q):
- p es **condición necesaria Y suficiente** para q

---

### 2.6 Leyes Lógicas (para simplificar)

| Ley | Fórmula |
|-----|---------|
| **Idempotencia** | p ∧ p ≡ p ; p ∨ p ≡ p |
| **Conmutativa** | p ∧ q ≡ q ∧ p ; p ∨ q ≡ q ∨ p |
| **Asociativa** | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) |
| **Distributiva** | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) |
| **De Morgan** | ¬(p ∧ q) ≡ ¬p ∨ ¬q ; ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| **Doble negación** | ¬(¬p) ≡ p |
| **Implicación** | p → q ≡ ¬p ∨ q |
| **Contrapositiva** | p → q ≡ ¬q → ¬p |

---

## ✏️ Ejercicios Resueltos

### Ejercicio 1: Tabla de verdad completa
Construye la tabla de verdad de: **(p → q) ∧ (q → p)**

**Solución:**


---

### Ejercicio 2: Simplificación con De Morgan
Simplificar: **¬(¬p ∧ q)**

**Solución:**


### Ejercicio 3: Identificar tipo de proposición
¿Qué es: **(p → q) ∨ (q → p)** ?

**Solución:**


---

## 📝 Ejercicios Propuestos

### Nivel Básico
1. Clasifica como simple o compuesta:
   - "El sol es una estrella"
   - "3 es primo y 4 es par"
   - "Si estudias, apruebas"

2. Construye la tabla de verdad de: p ∧ (q ∨ r)

3. Evalúa cuando p=V, q=F, r=V:
   - (p → q) ∧ r
   - ¬p ∨ (q ↔ r)

### Nivel Intermedio
4. Demuestra que estas son tautologías:
   - p → (p ∨ q)
   - (p ∧ q) → p

5. Simplifica usando leyes lógicas:
   - ¬(p ∨ ¬q)
   - (p → q) ∧ (p → ¬q)

6. Expresa usando solo ¬ y ∧:
   - p → q
   - p ∨ q

### Nivel Avanzado (tipo examen universitario)
7. Prueba que: (p → q) → [(r ∨ p) → (r ∨ q)] es tautología
8. Simplifica al máximo: [(p → q) ∧ (q → r)] → (p → r)
9. Demuestra la ley de absorción: p ∧ (p ∨ q) ≡ p

---

## ✅ Autoevaluación

- [ ] Identificar proposiciones simples y compuestas
- [ ] Construir tablas de verdad de 2 y 3 variables
- [ ] Aplicar correctamente los 6 conectores lógicos
- [ ] Distinguir tautología, contradicción y contingencia
- [ ] Identificar condición necesaria vs suficiente
- [ ] Aplicar leyes de De Morgan
- [ ] Simplificar fórmulas lógicas complejas

> 💡 **Tip de Memoria:** "De Morgan invierte: el 'y' se vuelve 'o', y niega todo"

---

## 🔗 Fórmulas Clave

**Consejo:** Para tautologías, busca que nunca haya F en la columna final. Para contradicciones, nunca V.
