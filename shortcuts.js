/* ============================================================
   shortcuts.js — JAMB-style keyboard shortcuts
   Exposes: window.Shortcuts = { init() }
   Keys:
     A / B / C / D  → select option 1-4
     S or N         → next question
     P              → previous question
     F              → flag / unflag current question
     Ctrl+Enter     → final submit
   ============================================================ */
(function () {
  'use strict';

  var initialized = false;

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
  }

  function buildLegend() {
    var el = document.getElementById('sl');
    if (!el) return;
    el.innerHTML =
      '<div class="sl-title">Keyboard Shortcuts</div>' +
      '<div class="sl-row"><span class="sl-key">A-D</span><span>Select option</span></div>' +
      '<div class="sl-row"><span class="sl-key">N / S</span><span>Next question</span></div>' +
      '<div class="sl-row"><span class="sl-key">P</span><span>Previous question</span></div>' +
      '<div class="sl-row"><span class="sl-key">F</span><span>Flag question</span></div>' +
      '<div class="sl-row"><span class="sl-key">Ctrl+Enter</span><span>Final submit</span></div>';
  }

  function click(id) {
    var el = document.getElementById(id);
    if (el) el.click();
  }

  function handleKey(e) {
    // Never hijack keys while typing in a field (name inputs, calculator, etc.)
    if (isTypingTarget(document.activeElement)) return;

    // Don't interfere while the calculator panel is open
    var calc = document.getElementById('c');
    if (calc && calc.style.display === 'block') return;

    var key = e.key;

    if (e.ctrlKey && key === 'Enter') {
      e.preventDefault();
      click('sumb');
      return;
    }

    switch (key.toLowerCase()) {
      case 'a':
        e.preventDefault();
        click('opt1');
        break;
      case 'b':
        e.preventDefault();
        click('opt2');
        break;
      case 'c':
        e.preventDefault();
        click('opt3');
        break;
      case 'd':
        e.preventDefault();
        click('opt4');
        break;
      
      case 'n':
        e.preventDefault();
        click('nx');
        break;
      case 'p':
        e.preventDefault();
        click('prev');
        break;
      case 'f':
        e.preventDefault();
        toggleFlag();
        break;
      default:
        break;
    }
  }

  function toggleFlag() {
    document.dispatchEvent(new CustomEvent('shortcut:flag'));
  }

  function init() {
    if (initialized) return;
    initialized = true;
    
    document.addEventListener('keydown', handleKey);
  }

  window.Shortcuts = { init: init };
})();
