import React, { HTMLProps } from "react";
import styles from './PageLink.module.scss';

export type PageLinkProps = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: PageLinkProps) {
  /*
  let customClassName = styles['page-link']; // Ustawienie klasy głównej z modułu SCSS

  if (className) {
    customClassName += ` ${className}`;
  }
  if (active) {
    customClassName += ` ${styles.active}`; // Dodanie klasy 'active' z modułu SCSS
  }
  if (disabled) {
    customClassName += ` ${styles.disabled}`; // Dodanie klasy 'disabled' z modułu SCSS
    return <span className={customClassName}>{children}</span>;
  }
  */
  
  const customClassName = [
        styles['page-link'],                // Klasa główna zdefiniowana w module SCSS
        className,                          // Dostarczona klasa z zewnątrz
        active ? styles.active : null,      // Dodanie klasy 'active' w zależności od stanu 'active'
        disabled ? styles.disabled : null,  // Dodanie klasy 'disabled' w zależności od stanu 'disabled'
      ]
        .filter(Boolean)
        .join(' ');
    
      if (disabled) {
        return <span className={customClassName}>{children}</span>;
      }

  return (
    <a
      className={customClassName}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}