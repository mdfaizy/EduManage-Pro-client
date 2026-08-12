import { downloadReceiptAPI } from "@/services/paymentService";

export const downloadPaymentReceipt = async (
  paymentId: number,
  receiptNo?: string
) => {
  try {
    const response = await downloadReceiptAPI(paymentId);

    const html = response.data?.html;

    if (!html) {
      throw new Error("Receipt data not received");
    }

    const blob = new Blob([html], {
      type: "text/html;charset=utf-8",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `receipt-${receiptNo || paymentId}.html`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Receipt download failed:", error);
    throw error;
  }
};