/* ============================================================
   ui.js — Toast + Modal UI (replaces alert/confirm/prompt)
   Exposes: window.UI = { toast(msg, type), modal(title, msg, cb) }
   ============================================================ */
(function () {
  'use strict';

  var TOAST_MS = 3000;
  var toastHost = null;
  var modalHost = null;

  function ensureHosts() {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.id = 'uiToastHost';
      toastHost.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastHost);
    }
    if (!modalHost) {
      modalHost = document.createElement('div');
      modalHost.id = 'uiModalHost';
      document.body.appendChild(modalHost);
    }
  }

  var ICONS = {
    success: '\u2713',
    error: '\u2715',
    warning: '\u26A0',
    info: '\u2139'
  };

  function toast(msg, type) {
    ensureHosts();
    type = (type && ICONS[type]) ? type : 'info';

    var el = document.createElement('div');
    el.className = 'ui-toast ui-toast-' + type;
    el.setAttribute('role', 'status');
    el.innerHTML =
      '<span class="ui-toast-icon">' + ICONS[type] + '</span>' +
      '<span class="ui-toast-msg"></span>';
    el.querySelector('.ui-toast-msg').textContent = msg;

    toastHost.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add('ui-toast-show');
    });

    var removed = false;
    function remove() {
      if (removed) return;
      removed = true;
      el.classList.remove('ui-toast-show');
      el.classList.add('ui-toast-hide');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }

    var t = setTimeout(remove, TOAST_MS);
    el.addEventListener('click', function () {
      clearTimeout(t);
      remove();
    });

    return el;
  }

  function modal(title, msg, cb) {
    ensureHosts();

    var backdrop = document.createElement('div');
    backdrop.className = 'ui-modal-backdrop';

    var box = document.createElement('div');
    box.className = 'ui-modal-box';
    box.setAttribute('role', 'alertdialog');
    box.setAttribute('aria-modal', 'true');

    var h = document.createElement('h3');
    h.className = 'ui-modal-title';
    h.textContent = title || '';

    var p = document.createElement('p');
    p.className = 'ui-modal-msg';
    p.textContent = msg || '';

    var actions = document.createElement('div');
    actions.className = 'ui-modal-actions';

    var okBtn = document.createElement('button');
    okBtn.className = 'ui-modal-btn ui-modal-ok';
    okBtn.type = 'button';
    okBtn.textContent = 'OK';

    actions.appendChild(okBtn);
    box.appendChild(h);
    box.appendChild(p);
    box.appendChild(actions);
    backdrop.appendChild(box);
    modalHost.appendChild(backdrop);

    requestAnimationFrame(function () {
      backdrop.classList.add('ui-modal-show');
    });

    function close(result) {
      backdrop.classList.remove('ui-modal-show');
      setTimeout(function () {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      }, 180);
      if (typeof cb === 'function') cb(result);
    }

    okBtn.addEventListener('click', function () { close(true); });
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) close(false);
    });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', esc);
        close(false);
      }
    });

    okBtn.focus();
    return backdrop;
  }

  window.UI = { toast: toast, modal: modal };
})();
