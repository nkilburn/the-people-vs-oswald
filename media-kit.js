/* =============================================
   MEDIA KIT — INTERACTION LOGIC (File Folder)
   The People vs. Lee Harvey Oswald
   ============================================= */

(function () {
    'use strict';

    const trigger = document.querySelector('.folder__trigger');
    const folder = document.querySelector('.folder');
    const folderScene = document.querySelector('.folder-scene');
    const dossier = document.querySelector('.dossier');
    const body = document.body;

    if (!trigger || !folder) return;

    let isOpening = false;

    // --- CLICK TO OPEN ---
    trigger.addEventListener('click', function () {
        if (isOpening) return;
        isOpening = true;

        // Phase 1: Folder opens, documents rise
        folder.classList.add('opening');

        // Phase 2: After animation completes, reveal dossier
        setTimeout(function () {
            folderScene.classList.add('hidden');

            // Phase 3: Show dossier content
            setTimeout(function () {
                dossier.classList.add('visible');
                body.classList.add('kit-revealed');
            }, 300);

        }, 2800);
    });

    // --- KEYBOARD ACCESSIBILITY ---
    trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
        }
    });

    // --- DOWNLOAD / PRINT ---
    var printBtn = document.getElementById('download-pdf-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.print();
        });
    }

    // --- REPLAY FOLDER ---
    var replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Reset everything
            body.classList.remove('kit-revealed');
            dossier.classList.remove('visible');
            folder.classList.remove('opening');
            isOpening = false;

            // Show folder again
            setTimeout(function () {
                folderScene.classList.remove('hidden');
                window.scrollTo(0, 0);
            }, 100);
        });
    }
})();
