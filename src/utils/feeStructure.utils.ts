export const calculateTotalAmount = (items: any[]) => {
  return items.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );
};