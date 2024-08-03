export function initializeDeleteModal() {
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteButton = document.getElementById('confirm-delete-employee');
    const cancelDeleteButton = document.getElementById('cancel-delete');

    // Function to open the modal
    function openDeleteModal() {
        deleteModal.classList.remove('hidden');
    }

    // Function to close the modal
    function closeDeleteModal() {
        deleteModal.classList.add('hidden');
    }

    // Event listeners
    confirmDeleteButton.addEventListener('click', () => {
        // Add your delete logic here
        console.log("Item deleted!"); // Replace with actual delete logic
        closeDeleteModal();
    });

    cancelDeleteButton.addEventListener('click', closeDeleteModal);

    // Expose the open function to the outside
    return {
        open: openDeleteModal,
    };
}