import Swal, { SweetAlertOptions } from "sweetalert2";

const useDeleteConfirmation = () => {
  const showDeleteConfirmAlert = (
    onConfirm: () => void,
    options: SweetAlertOptions = {
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#441893",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }
  ) => {
    // Ensure you're passing the correct SweetAlertOptions object
    Swal.fire(options).then((result) => {
      if (result.isConfirmed) {
        onConfirm(); // Execute the provided confirmation logic
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  };

  return { showDeleteConfirmAlert };
};

export default useDeleteConfirmation;
