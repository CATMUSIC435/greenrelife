type UserAvatarProps = {
  name: string;
  avatar?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const UserAvatar = ({ name, avatar, size = 'md' }: UserAvatarProps) => {
  const sizes = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  // Teal, Indigo, Purple, Pink, Amber
  const colors = [
    'bg-cyan-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-amber-600',
  ];

  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;
  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return avatar
    ? (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className={`${sizes[size]} flex-shrink-0 rounded-full border-2 border-white object-cover shadow-sm dark:border-neutral-800`}
        />
      )
    : (
        <div
          className={`${sizes[size]} ${colors[colorIndex]} flex flex-shrink-0 items-center justify-center rounded-full border-2 border-white/50 font-semibold text-white shadow-sm dark:border-neutral-800/50`}
        >
          {initials}
        </div>
      );
};
