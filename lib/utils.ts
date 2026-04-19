import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Inset hairline on image frames — helps white assets on light UI and black assets on dark UI read clearly. */
export const imageFrameClassName =
  "shadow-[inset_0_0_0_1px_rgb(0_0_0_/_0.08)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.12)]"
