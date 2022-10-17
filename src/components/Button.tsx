import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLElement> & {
  colorName?: string;
  children: React.ReactNode;
};

export function Button({
  children,
  colorName = 'indigo',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`
        text-white
        bg-${colorName}-500
        hover:bg-${colorName}-600
        hover:text-${colorName}-100
        px-4
        py-2
        rounded-md
        cursor-pointer
        transition-all
        flex
        flex-row
        items-center
        font-bold
        text-sm
        justify-center
      `}
    >
      {children}
    </button>
  );
}
