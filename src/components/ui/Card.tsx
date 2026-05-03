import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
  interactive?: boolean;
  children?: ReactNode;
}

export function Card({
  as: Tag = 'div',
  interactive = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const interactiveClasses = interactive
    ? 'panel-hover cursor-pointer transform-gpu hover:-translate-y-0.5'
    : '';
  return (
    <Tag className={`panel p-5 ${interactiveClasses} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
