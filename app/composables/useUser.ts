const isEditOpen = ref(false);
const isDeleteOpen = ref(false);
const isLoading = ref(false);

export const useUser = () => {
  
    const closeOtherModals = () => {
        isEditOpen.value = false;
        isDeleteOpen.value = false;
    };


    const openEditUser = () => {
        closeOtherModals();
        isEditOpen.value = true;
    };

    const closeEditUser = () => {
        isEditOpen.value = false;
    };

    const openDeleteUser = () => {
        closeOtherModals();
        isDeleteOpen.value = true;
    };  

    const closeDeleteUser = () => {
        isDeleteOpen.value = false;
    };

    return {
        isEditOpen,
        isDeleteOpen,
        isLoading,
        openEditUser,
        closeEditUser,
        openDeleteUser,
        closeDeleteUser,
    };
};