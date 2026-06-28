function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...props
}) {
  const componentProps = Component === 'button' ? { type, ...props } : props;

  return (
    <Component className={`button button-${variant} ${className}`.trim()} {...componentProps}>
      {children}
    </Component>
  );
}

export default Button;
