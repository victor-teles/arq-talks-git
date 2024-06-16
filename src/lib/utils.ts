import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const throttle = <ArgType>(instance: unknown, func: (args: ArgType) => unknown, delay = 2000) => {
  let flag: NodeJS.Timeout | null = null;
  const _this = instance;

  return (args: ArgType) => {
    if (flag === null) {
      func.call(_this, args);
      flag = setTimeout(() => {
        flag = null;
      }, delay);
    }
  };
};
