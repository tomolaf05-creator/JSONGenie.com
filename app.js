// Application state
const AppState = {
    theme: localStorage.getItem('json_formatter_theme') || 'light',
    indent: parseInt(localStorage.getItem('json_formatter_indent') || '2'),
    currentFormat: 'json'
};

// Sample JSON data
const SAMPLE_JSON = {
    "name": "Enhanced JSON Formatter",
    "version": "1.1.0",
    "description": "Simple JSON formatter with conversion capabilities",
    "features": ["format", "validate", "minify", "convert", "copy", "download"],
    "conversions": ["XML", "CSV", "YAML"],
    "user": {
        "location": "Norway",
        "occupation": "Developer",
        "skills": ["JavaScript", "HTML", "CSS", "JSON"],
        "experience": "Beginner to Intermediate"
    },
    "projects": [
        {
            "id": 1,
            "title": "E-commerce Website",
            "status": "completed",
            "technologies": ["HTML", "CSS", "JavaScript"],
            "duration": "3 months"
        },
        {
            "id": 2,
            "title": "Mobile App",
            "status": "in progress",
            "technologies": ["React Native", "Node.js"],
            "duration": "2 months"
        }
    ],
    "active": true
};

// DOM Elements
let elements = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    initializeTheme();
    loadSettings();
    updateStats();
});

// Initialize DOM element references
function initializeElements() {
    elements = {
        // Controls
        formatBtn: document.getElementById('formatBtn'),
        validateBtn: document.getElementById('validateBtn'),
        minifyBtn: document.getElementById('minifyBtn'),
        clearBtn: document.getElementById('clearBtn'),
        loadSampleBtn: document.getElementById('loadSampleBtn'),
        copyBtn: document.getElementById('copyBtn'),
        downloadBtn: document.getElementById('downloadBtn'),
        
        // Conversion buttons
        convertXmlBtn: document.getElementById('convertXmlBtn'),
        convertCsvBtn: document.getElementById('convertCsvBtn'),
        convertYamlBtn: document.getElementById('convertYamlBtn'),
        
        // Settings
        indentSelect: document.getElementById('indentSelect'),
        
        // Editors
        jsonInput: document.getElementById('jsonInput'),
        jsonOutput: document.getElementById('jsonOutput'),
        
        // Status and stats
        inputStats: document.getElementById('inputStats'),
        outputFormat: document.getElementById('outputFormat'),
        statusIndicator: document.getElementById('statusIndicator'),
        statusText: document.getElementById('statusText'),
        
        // Error handling
        errorPanel: document.getElementById('errorPanel'),
        errorMessage: document.getElementById('errorMessage'),
        errorSuggestion: document.getElementById('errorSuggestion'),
        closeErrorBtn: document.getElementById('closeErrorBtn'),
        
        // Theme
        themeToggle: document.getElementById('themeToggle')
    };
}

// Initialize event listeners
function initializeEventListeners() {
    // Main functionality buttons - use proper event handling with preventDefault
    if (elements.formatBtn) {
        elements.formatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            formatJSON();
        });
    }
    
    if (elements.validateBtn) {
        elements.validateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            validateJSON();
        });
    }
    
    if (elements.minifyBtn) {
        elements.minifyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            minifyJSON();
        });
    }
    
    if (elements.clearBtn) {
        elements.clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearAll();
        });
    }
    
    if (elements.loadSampleBtn) {
        elements.loadSampleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            loadSample();
        });
    }
    
    if (elements.copyBtn) {
        elements.copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            copyResult();
        });
    }
    
    if (elements.downloadBtn) {
        elements.downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            downloadResult();
        });
    }
    
    // Conversion buttons
    if (elements.convertXmlBtn) {
        elements.convertXmlBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            convertToXML();
        });
    }
    
    if (elements.convertCsvBtn) {
        elements.convertCsvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            convertToCSV();
        });
    }
    
    if (elements.convertYamlBtn) {
        elements.convertYamlBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            convertToYAML();
        });
    }
    
    // Settings
    if (elements.indentSelect) {
        elements.indentSelect.addEventListener('change', function(e) {
            e.stopPropagation();
            updateIndentSetting();
        });
    }
    
    // Input handling
    if (elements.jsonInput) {
        elements.jsonInput.addEventListener('input', handleInputChange);
    }
    
    // Error panel
    if (elements.closeErrorBtn) {
        elements.closeErrorBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideErrorPanel();
        });
    }
    
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Main JSON processing functions
function formatJSON() {
    const input = elements.jsonInput?.value?.trim() || '';
    if (!input) {
        showError('Please enter some JSON to format');
        return;
    }
    
    setProcessingState(true);
    
    try {
        const parsed = JSON.parse(input);
        const indentStr = ' '.repeat(AppState.indent);
        const formatted = JSON.stringify(parsed, null, indentStr);
        
        elements.jsonOutput.value = formatted;
        AppState.currentFormat = 'json';
        updateOutputFormat('JSON');
        setStatus('success', 'JSON formatted successfully');
        enableOutputButtons();
        hideErrorPanel();
        showSuccessMessage('✨ JSON formatted successfully!');
        
    } catch (error) {
        showError('Invalid JSON: ' + error.message);
        setStatus('error', 'Invalid JSON');
    } finally {
        setProcessingState(false);
    }
}

function validateJSON() {
    const input = elements.jsonInput?.value?.trim() || '';
    if (!input) {
        showError('Please enter some JSON to validate');
        return;
    }
    
    setProcessingState(true);
    
    try {
        JSON.parse(input);
        setStatus('success', 'Valid JSON');
        hideErrorPanel();
        showSuccessMessage('✅ Your JSON is valid!');
    } catch (error) {
        showError('Invalid JSON: ' + error.message);
        setStatus('error', 'Invalid JSON');
    } finally {
        setProcessingState(false);
    }
}

function minifyJSON() {
    const input = elements.jsonInput?.value?.trim() || '';
    if (!input) {
        showError('Please enter some JSON to minify');
        return;
    }
    
    setProcessingState(true);
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        
        elements.jsonOutput.value = minified;
        AppState.currentFormat = 'json';
        updateOutputFormat('JSON');
        setStatus('success', 'JSON minified successfully');
        enableOutputButtons();
        hideErrorPanel();
        showSuccessMessage('📦 JSON minified successfully!');
        
    } catch (error) {
        showError('Invalid JSON: ' + error.message);
        setStatus('error', 'Invalid JSON');
    } finally {
        setProcessingState(false);
    }
}

// Conversion functions
function convertToXML() {
    const input = elements.jsonInput?.value?.trim() || '';
    if (!input) {
        showError('Please enter some JSON to convert');
        return;
    }
    
    setProcessingState(true);
    
    try {
        const parsed = JSON.parse(input);
        const xml = jsonToXml(parsed);
        
        elements.jsonOutput.value = xml;
        AppState.currentFormat = 'xml';
        updateOutputFormat('XML');
        setStatus('success', 'JSON converted to XML');
        enableOutputButtons();
        hideErrorPanel();
        showSuccessMessage('📄 Converted to XML successfully!');
        
    } catch (error) {
        showError('Invalid JSON: ' + error.message);
        setStatus('error', 'Conversion failed');
    } finally {
        setProcessingState(false);
    }
}

function convertToCSV() {
    const input = elements.jsonInput?.value?.trim() || '';
    if (!input) {
        showError('Please enter some JSON to convert');
        return;
    }
    
    setProcessingState(true);
    
    try {
        const parsed = JSON.parse(input);
        const csv = jsonToCsv(parsed);
        
        elements.jsonOutput.value = csv;
        AppState.currentFormat = 'csv';
        updateOutputFormat('CSV');
        setStatus('success', 'JSON converted to CSV');
        enableOutputButtons();
        hideErrorPanel();
        showSuccessMessage('📊 Converted to CSV successfully!');
        
    } catch (error) {
        showError('Invalid JSON or conversion failed: ' + error.message);
        setStatus('error', 'Conversion failed');
    } finally {
        setProcessingState(false);
    }
}

function convertToYAML() {
    const input = elements.jsonInput?.value?.trim() || '';
    if (!input) {
        showError('Please enter some JSON to convert');
        return;
    }
    
    setProcessingState(true);
    
    try {
        const parsed = JSON.parse(input);
        const yaml = jsonToYaml(parsed);
        
        elements.jsonOutput.value = yaml;
        AppState.currentFormat = 'yaml';
        updateOutputFormat('YAML');
        setStatus('success', 'JSON converted to YAML');
        enableOutputButtons();
        hideErrorPanel();
        showSuccessMessage('📋 Converted to YAML successfully!');
        
    } catch (error) {
        showError('Invalid JSON: ' + error.message);
        setStatus('error', 'Conversion failed');
    } finally {
        setProcessingState(false);
    }
}

// Conversion utility functions
function jsonToXml(obj, rootName = 'root', indent = 0) {
    const spaces = '  '.repeat(indent);
    
    if (typeof obj !== 'object' || obj === null) {
        return `${spaces}<${rootName}>${escapeXml(String(obj))}</${rootName}>`;
    }
    
    if (Array.isArray(obj)) {
        let xml = `${spaces}<${rootName}>\n`;
        obj.forEach((item, index) => {
            xml += jsonToXml(item, 'item', indent + 1) + '\n';
        });
        xml += `${spaces}</${rootName}>`;
        return xml;
    }
    
    let xml = `${spaces}<${rootName}>\n`;
    for (const [key, value] of Object.entries(obj)) {
        xml += jsonToXml(value, key, indent + 1) + '\n';
    }
    xml += `${spaces}</${rootName}>`;
    return xml;
}

function escapeXml(str) {
    return str.replace(/[<>&'"]/g, function(c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function jsonToCsv(obj) {
    if (!Array.isArray(obj)) {
        // If it's not an array, try to convert object to array of key-value pairs
        if (typeof obj === 'object' && obj !== null) {
            obj = Object.entries(obj).map(([key, value]) => ({ key, value }));
        } else {
            throw new Error('Cannot convert to CSV: data must be an array or object');
        }
    }
    
    if (obj.length === 0) {
        return '';
    }
    
    // Get all unique keys from all objects
    const allKeys = [...new Set(obj.flatMap(item => 
        typeof item === 'object' && item !== null ? Object.keys(item) : ['value']
    ))];
    
    // Create header row
    const headers = allKeys.map(key => `"${String(key).replace(/"/g, '""')}"`).join(',');
    
    // Create data rows
    const rows = obj.map(item => {
        return allKeys.map(key => {
            let value = '';
            if (typeof item === 'object' && item !== null) {
                value = item[key] !== undefined ? item[key] : '';
            } else {
                value = key === 'value' ? item : '';
            }
            
            // Convert to string and escape quotes
            const strValue = String(value).replace(/"/g, '""');
            return `"${strValue}"`;
        }).join(',');
    });
    
    return [headers, ...rows].join('\n');
}

function jsonToYaml(obj, indent = 0) {
    const spaces = '  '.repeat(indent);
    
    if (obj === null) return 'null';
    if (typeof obj === 'boolean') return obj.toString();
    if (typeof obj === 'number') return obj.toString();
    if (typeof obj === 'string') {
        // Quote strings that need quoting
        if (obj.includes('\n') || obj.includes(':') || obj.includes('#') || 
            obj.trim() !== obj || /^[\d\-+.]/.test(obj)) {
            return `"${obj.replace(/"/g, '\\"')}"`;
        }
        return obj;
    }
    
    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        return obj.map(item => `${spaces}- ${jsonToYaml(item, indent + 1).replace(/^\s+/, '')}`).join('\n');
    }
    
    if (typeof obj === 'object') {
        const entries = Object.entries(obj);
        if (entries.length === 0) return '{}';
        
        return entries.map(([key, value]) => {
            const yamlValue = jsonToYaml(value, indent + 1);
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return `${spaces}${key}:\n${yamlValue}`;
            } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
                return `${spaces}${key}:\n${yamlValue}`;
            } else {
                const singleLineValue = yamlValue.replace(/^\s+/, '');
                return `${spaces}${key}: ${singleLineValue}`;
            }
        }).join('\n');
    }
    
    return String(obj);
}

// Utility functions
function clearAll() {
    elements.jsonInput.value = '';
    elements.jsonOutput.value = '';
    AppState.currentFormat = 'json';
    updateOutputFormat('JSON');
    handleInputChange();
    hideErrorPanel();
    setStatus('ready', 'Ready');
    showSuccessMessage('🗑️ Cleared successfully!');
}

function loadSample() {
    elements.jsonInput.value = JSON.stringify(SAMPLE_JSON, null, AppState.indent);
    handleInputChange();
    showSuccessMessage('📝 Sample JSON loaded!');
}

async function copyResult() {
    const content = elements.jsonOutput?.value || '';
    if (!content) {
        showError('No content to copy');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(content);
        showSuccessMessage('📋 Copied to clipboard!');
        
        // Visual feedback
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '✅ Copied!';
        elements.copyBtn.classList.add('success');
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
            elements.copyBtn.classList.remove('success');
        }, 2000);
    } catch (error) {
        showError('Failed to copy to clipboard');
    }
}

function downloadResult() {
    const content = elements.jsonOutput?.value || '';
    if (!content) {
        showError('No content to download');
        return;
    }
    
    const extensions = {
        json: 'json',
        xml: 'xml',
        csv: 'csv',
        yaml: 'yaml'
    };
    
    const mimeTypes = {
        json: 'application/json',
        xml: 'application/xml',
        csv: 'text/csv',
        yaml: 'text/yaml'
    };
    
    const ext = extensions[AppState.currentFormat] || 'txt';
    const mimeType = mimeTypes[AppState.currentFormat] || 'text/plain';
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output.${ext}`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessMessage(`💾 Downloaded as ${ext.toUpperCase()} file!`);
}

// Input handling
function handleInputChange() {
    updateStats();
    
    const hasInput = elements.jsonInput?.value?.trim()?.length > 0;
    elements.formatBtn.disabled = !hasInput;
    elements.validateBtn.disabled = !hasInput;
    elements.minifyBtn.disabled = !hasInput;
    elements.convertXmlBtn.disabled = !hasInput;
    elements.convertCsvBtn.disabled = !hasInput;
    elements.convertYamlBtn.disabled = !hasInput;
    
    // Reset output state
    disableOutputButtons();
    setStatus('ready', 'Ready');
}

// Settings
function updateIndentSetting() {
    AppState.indent = parseInt(elements.indentSelect.value);
    localStorage.setItem('json_formatter_indent', AppState.indent.toString());
    showSuccessMessage('⚙️ Indentation setting updated!');
}

function loadSettings() {
    elements.indentSelect.value = AppState.indent.toString();
}

// Status and UI updates
function setStatus(type, message) {
    const dot = elements.statusIndicator.querySelector('.status-dot');
    dot.className = 'status-dot ' + type;
    elements.statusText.textContent = message;
}

function setProcessingState(processing) {
    const dot = elements.statusIndicator.querySelector('.status-dot');
    if (processing) {
        dot.className = 'status-dot processing';
        elements.statusText.textContent = 'Processing...';
    }
}

function updateStats() {
    const input = elements.jsonInput?.value || '';
    const chars = input.length;
    elements.inputStats.textContent = `${chars} characters`;
}

function updateOutputFormat(format) {
    elements.outputFormat.textContent = format;
}

function enableOutputButtons() {
    elements.copyBtn.disabled = false;
    elements.downloadBtn.disabled = false;
}

function disableOutputButtons() {
    elements.copyBtn.disabled = true;
    elements.downloadBtn.disabled = true;
}

// Error handling
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorSuggestion.innerHTML = getSuggestionForError(message);
    elements.errorPanel.classList.remove('hidden');
    
    setTimeout(hideErrorPanel, 8000);
}

function getSuggestionForError(message) {
    if (message.includes('Unexpected token')) {
        return '💡 <strong>Tip:</strong> Check for missing commas, extra commas, or unquoted property names.';
    }
    if (message.includes('Unterminated string')) {
        return '💡 <strong>Tip:</strong> Make sure all strings are properly closed with matching quotes.';
    }
    if (message.includes('conversion failed') || message.includes('convert to CSV')) {
        return '💡 <strong>Tip:</strong> For CSV conversion, your JSON should be an array of objects with similar properties.';
    }
    return '💡 <strong>Tip:</strong> Make sure your JSON syntax is correct.';
}

function hideErrorPanel() {
    elements.errorPanel.classList.add('hidden');
}

// Theme management
function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    localStorage.setItem('json_formatter_theme', AppState.theme);
    showSuccessMessage(`🎨 Switched to ${AppState.theme} theme!`);
}

function initializeTheme() {
    if (!localStorage.getItem('json_formatter_theme')) {
        AppState.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-color-scheme', AppState.theme);
    elements.themeToggle.textContent = AppState.theme === 'light' ? '🌙' : '☀️';
}

// Success messages
function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 12px 16px;
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInUp 0.3s ease-out;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 2500);
}

// Keyboard shortcuts
function handleKeyboardShortcuts(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        formatJSON();
    }
    
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        clearAll();
    }
    
    if (event.key === 'Escape') {
        hideErrorPanel();
    }
}