"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Lucide icon name, e.g. "Coffee", "Sparkles". */
  name: string;
  className?: string;
}

/**
 * Resolve a Lucide icon by its name string. Data files (scenarios, curriculum)
 * store icon names as strings; this maps them to the actual component.
 * Falls back to a circle if the name isn't found.
 */
export function Icon({ name, className, ...props }: IconProps) {
  const Cmp = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Circle;
  return <Cmp className={cn("size-5", className)} {...props} />;
}
