import React from 'react';

/**
 * Button component with Tailwind styling and variants.
 * Usage: <Button variant="primary" size="md" ...props>Text</Button>
 * Supports: variant (primary, outline, ghost), size (sm, md, lg), asChild (for Link/button), className
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  asChild = false,
  className = '',
  ...props
}) {
  let base =
    'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition';
  let variants = {
    primary: 'bg-[#1A73E8] text-white hover:bg-[#1765c1]',
    outline: 'border border-[#1A73E8] text-[#1A73E8] bg-white hover:bg-[#1A73E8]/10',
    ghost: 'bg-transparent text-[#1A73E8] hover:bg-[#1A73E8]/10',
  };
  let sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const classes = [base, variants[variant] || '', sizes[size] || '', className].join(' ');

  if (asChild && props.href) {
    // Render as anchor
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }
  if (asChild && props.to) {
    // Render as React Router Link
    const { to, ...rest } = props;
    // eslint-disable-next-line
    const Link = require('react-router-dom').Link;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
