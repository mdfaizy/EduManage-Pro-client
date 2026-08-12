import { downloadReceiptAPI } from "@/services/paymentService";

export const printPaymentReceipt = async (
  paymentId: number
) => {
  try {
    const response = await downloadReceiptAPI(paymentId);

    const html = response.data?.html;

    if (!html) {
      throw new Error("Receipt data not received");
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

    if (!printWindow) {
      throw new Error(
        "Please allow pop-ups to print the receipt."
      );
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  } catch (error) {
    console.error("Receipt print failed:", error);
    throw error;
  }
};