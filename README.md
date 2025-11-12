# 🧮 Calculadora JavaScript

Calculadora completamente funcional con historial de operaciones y soporte de teclado.

## 🚀 Demo en Vivo

👉 **[Ver Calculadora](https://dduenas2.github.io/calculator/)**

![Calculadora Preview](https://img.shields.io/badge/Status-Live-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Características

- ✅ Operaciones básicas (+, -, ×, ÷)
- ✅ Soporte para decimales
- ✅ Operaciones encadenadas
- ✅ Historial de operaciones con localStorage
- ✅ Soporte completo de teclado
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ UI moderna con tema oscuro y gradientes
- ✅ Validación de división por cero
- ✅ Animaciones suaves

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `0-9` | Números |
| `+` `-` `*` `/` | Operadores |
| `.` o `,` | Decimal |
| `Enter` o `=` | Calcular |
| `Escape` | Limpiar todo |
| `Backspace` | Borrar último dígito |

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Grid, Flexbox, Gradients, Animations
- **JavaScript ES6+** - Classes, LocalStorage API, Event Handling
- **Google Fonts** - Orbitron, Inter

## 📱 Responsive Design

Optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Wide screens (1400px+)

## 🎓 Conceptos Aplicados

- Programación Orientada a Objetos (POO)
- State Management
- Event Delegation
- LocalStorage para persistencia de datos
- Keyboard Event Handling
- CSS Grid Layout avanzado
- Responsive Design (Mobile-First)

## 📂 Estructura del Proyecto
```
calculator/
├── index.html          # Estructura HTML
├── styles.css          # Estilos y diseño
├── script.js          # Lógica de la calculadora
└── README.md          # Este archivo
```

## 🚀 Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/dduenas2/calculator.git

# Navegar al directorio
cd calculator

# Abrir en el navegador
# Simplemente abre index.html en tu navegador favorito
```

## 💡 Características Técnicas

### Manejo de Estado
```javascript
class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.waitingForSecondOperand = false;
    }
}
```

### Persistencia con LocalStorage
- El historial se guarda automáticamente
- Límite de 50 operaciones
- Se mantiene entre sesiones

### Validaciones
- No permite múltiples decimales
- Previene división por cero
- Redondeo para evitar errores de punto flotante

## 🐛 Bug Fixes

**v2.0** - Correcciones importantes:
- ✅ Fix: Display ahora muestra correctamente el resultado
- ✅ Fix: Operaciones encadenadas funcionan correctamente
- ✅ Fix: Previene cálculos duplicados al presionar Enter múltiple
- ✅ Fix: Estado se mantiene correctamente entre operaciones

## 📈 Roadmap

- [ ] Agregar más operaciones (√, x², %)
- [ ] Modo científico
- [ ] Temas personalizables
- [ ] Exportar historial
- [ ] Cálculos con paréntesis

## 📧 Contacto

**David Dueñas**
- GitHub: [@dduenas2](https://github.com/dduenas2)
- Email: dalduenas@poligran.edu.co
- Portfolio: [dduenas2.github.io](https://dduenas2.github.io/first-website/)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

**Proyecto #2** - Serie de Aprendizaje JavaScript