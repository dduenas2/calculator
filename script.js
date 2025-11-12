// ============================================
// CALCULADORA - VERSIÓN CORREGIDA
// ============================================

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
        this.history = this.loadHistory();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.waitingForSecondOperand = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        // Si estamos esperando el segundo operando, limpiar display
        if (this.waitingForSecondOperand) {
            this.currentOperand = '';
            this.waitingForSecondOperand = false;
        }

        // No permitir múltiples decimales
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Si es el primer número y es 0, reemplazar (excepto si es decimal)
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        // Si ya hay una operación pendiente, calcular primero
        if (this.operation !== undefined && !this.waitingForSecondOperand) {
            this.compute();
        }
        
        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.waitingForSecondOperand = true;
    }

    compute() {
        // Si no hay operación, no hacer nada
        if (this.operation === undefined) return;
        
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        // Validar que ambos números son válidos
        if (isNaN(prev) || isNaN(current)) return;
        
        // Realizar la operación
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('❌ No se puede dividir por cero');
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Redondear para evitar errores de punto flotante
        computation = Math.round(computation * 100000000) / 100000000;
        
        // Guardar en historial
        const operationString = `${prev} ${this.operation} ${current}`;
        this.addToHistory(operationString, computation);
        
        // Actualizar el display con el resultado
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.waitingForSecondOperand = true;
    }

    getDisplayNumber(number) {
        if (number === '') return '0';
        
        const stringNumber = number.toString();
        const parts = stringNumber.split('.');
        const integerPart = parseFloat(parts[0]);
        const decimalPart = parts[1];
        
        let integerDisplay;
        if (isNaN(integerPart)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerPart.toLocaleString('es', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalPart != null) {
            return `${integerDisplay}.${decimalPart}`;
        } else {
            return integerDisplay;
        }
    }

    formatNumber(number) {
        return Number(number).toLocaleString('es', {
            maximumFractionDigits: 8
        });
    }

    updateDisplay() {
        // Actualizar operando actual
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        // Actualizar operando anterior con operación
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    addToHistory(operation, result) {
        const historyItem = {
            operation: operation,
            result: this.formatNumber(result),
            timestamp: new Date().toLocaleString('es')
        };
        
        this.history.unshift(historyItem);
        
        // Limitar historial a 50 items
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        return saved ? JSON.parse(saved) : [];
    }

    renderHistory() {
        const historyList = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="empty-history">No hay operaciones aún</p>';
            return;
        }
        
        historyList.innerHTML = this.history.map((item, index) => `
            <div class="history-item" data-index="${index}">
                <div class="history-operation">${item.operation}</div>
                <div class="history-result">= ${item.result}</div>
            </div>
        `).join('');
        
        // Event listeners para items del historial
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = item.dataset.index;
                const historyItem = this.history[index];
                calculator.currentOperand = historyItem.result.replace(/,/g, '');
                calculator.previousOperand = '';
                calculator.operation = undefined;
                calculator.waitingForSecondOperand = true;
                calculator.updateDisplay();
            });
        });
    }

    clearHistory() {
        if (confirm('¿Estás seguro de que deseas borrar todo el historial?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Renderizar historial inicial
calculator.renderHistory();
calculator.updateDisplay();

// ============================================
// EVENT LISTENERS - NÚMEROS
// ============================================

document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

// ============================================
// EVENT LISTENERS - OPERACIONES
// ============================================

document.querySelectorAll('[data-action="add"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    });
});

document.querySelectorAll('[data-action="subtract"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation('−');
        calculator.updateDisplay();
    });
});

document.querySelectorAll('[data-action="multiply"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    });
});

document.querySelectorAll('[data-action="divide"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    });
});

// ============================================
// EVENT LISTENERS - FUNCIONES
// ============================================

// Decimal
document.querySelectorAll('[data-action="decimal"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    });
});

// Igual
document.querySelectorAll('[data-action="equals"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });
});

// Clear
document.querySelectorAll('[data-action="clear"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });
});

// Delete
document.querySelectorAll('[data-action="delete"]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });
});

// Limpiar historial
document.getElementById('clear-history').addEventListener('click', () => {
    calculator.clearHistory();
});

// ============================================
// SOPORTE DE TECLADO
// ============================================

document.addEventListener('keydown', (e) => {
    // Prevenir acciones por defecto
    if (['+', '-', '*', '/', '=', 'Enter'].includes(e.key)) {
        e.preventDefault();
    }
    
    // Números
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    
    // Operadores
    if (e.key === '+') {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    }
    if (e.key === '-') {
        calculator.chooseOperation('−');
        calculator.updateDisplay();
    }
    if (e.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    }
    if (e.key === '/') {
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }
    
    // Decimal
    if (e.key === '.' || e.key === ',') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }
    
    // Calcular
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }
    
    // Limpiar
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    
    // Borrar
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
});

// ============================================
// MENSAJE DE BIENVENIDA
// ============================================

console.log('%c🧮 Calculadora Cargada Correctamente', 'color: #667eea; font-size: 18px; font-weight: bold;');
console.log('%c✨ Versión 2.0 - Bugs corregidos', 'color: #a0a0b8; font-size: 14px;');
console.log('%cDesarrollado por David Dueñas', 'color: #f093fb; font-size: 12px;');
console.log('%c⌨️  Puedes usar el teclado:', 'color: #667eea; font-size: 12px;');
console.log('  • Números: 0-9');
console.log('  • Operadores: + - * /');
console.log('  • Calcular: Enter o =');
console.log('  • Limpiar: Escape');
console.log('  • Borrar: Backspace');