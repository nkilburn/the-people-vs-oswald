/* =============================================
   MEDIA KIT — INTERACTION LOGIC
   The People vs. Lee Harvey Oswald
   ============================================= */

(function () {
    'use strict';

    const closure = document.querySelector('.closure');
    const envelope = document.querySelector('.envelope');
    const envelopeScene = document.querySelector('.envelope-scene');
    const dossier = document.querySelector('.dossier');
    const body = document.body;

    if (!closure || !envelope) return;

    let isOpening = false;

    // --- CLICK TO OPEN ---
    closure.addEventListener('click', function () {
        if (isOpening) return;
        isOpening = true;

        // Phase 1: String unwinds + flap opens
        envelope.classList.add('opening');
        closure.style.pointerEvents = 'none';

        // Phase 2: After string + flap animation, reveal dossier
        setTimeout(function () {
            envelopeScene.classList.add('hidden');

            // Phase 3: Show dossier content
            setTimeout(function () {
                dossier.classList.add('visible');
                body.classList.add('kit-revealed');
            }, 300);

        }, 2200);
    });

    // --- KEYBOARD ACCESSIBILITY ---
    closure.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closure.click();
        }
    });

    // --- DOWNLOAD / PRINT ---
    const printBtn = document.getElementById('download-pdf-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.print();
        });
    }

    // --- REPLAY ENVELOPE ---
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Reset everything
            body.classList.remove('kit-revealed');
            dossier.classList.remove('visible');
            envelope.classList.remove('opening');
            closure.style.pointerEvents = '';
            isOpening = false;

            // Show envelope again
            setTimeout(function () {
                envelopeScene.classList.remove('hidden');
                window.scrollTo(0, 0);
            }, 100);
        });
    }
})();
