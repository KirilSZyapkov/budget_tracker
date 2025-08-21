type Item = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  budgetId: string;
  monthId: string;
  amount: string;
  type: string;
};

type Result = {
  data: { name: string; amount: string }[];
  type: string;
};

export function transformArray(arr: Item[]): Result[] {
  const map = new Map<string, Result>();

  arr.forEach(item => {
    if (!map.has(item.type)) {
      if (item.type === "expenses") {
        map.set(item.type, {
          data: [],
          type: item.type
        });
      } else if (item.type === "income") {
        map.set(item.type, {
          data: [],
          type: item.type
        });
      } else if (item.type === "savings") {
        map.set(item.type, {
          data: [],
          type: item.type
        });
      }
      ;
    }

    map.get(item.type)!.data.push({
      name: item.name,
      amount: item.amount,
    });

  });
  return Array.from(map.values());
}