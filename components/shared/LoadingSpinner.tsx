interface LoadingSpinnerProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

export default function LoadingSpinner({
  color = 'purple-600',
  size = 'md',
  gradientFrom = 'purple-50',
  gradientVia = 'white',
  gradientTo = 'pink-50',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-${gradientFrom} via-${gradientVia} to-${gradientTo} dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center`}
    >
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-${color} mx-auto mb-4`}
        ></div>
        <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
      </div>
    </div>
  );
}
