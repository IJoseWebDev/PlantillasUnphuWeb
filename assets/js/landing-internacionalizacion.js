document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('staff-modal');
    const openButtons = document.querySelectorAll('[data-cta="staff"]');
    const closeButtons = modal ? modal.querySelectorAll('[data-modal-close]') : [];

    function openModal() {
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    openButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            openModal();
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            closeModal();
        });
    });

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
