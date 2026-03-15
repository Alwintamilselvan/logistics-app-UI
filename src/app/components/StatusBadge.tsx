interface StatusBadgeProps {
  status: 'pending' | 'out-for-delivery' | 'delivered' | 'failed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200 shadow-sm',
    'out-for-delivery': 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 shadow-sm',
    delivered: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 shadow-sm',
    failed: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200 shadow-sm',
  };

  const labels = {
    pending: 'Pending',
    'out-for-delivery': 'Out for Delivery',
    delivered: 'Delivered',
    failed: 'Failed',
  };

  return (
    <span className={`px-3 py-1.5 rounded-xl border text-sm font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}