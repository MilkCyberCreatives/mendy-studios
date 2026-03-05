import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function PageBreadcrumb({ items, className = '' }: PageBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex w-fit rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur ${className}`.trim()}
    >
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.08em] text-white/80">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <FaChevronRight className="text-[10px] text-white/35" /> : null}
              {isCurrent || !item.href ? (
                <span aria-current="page" className="text-white">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-[#F9A26E]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
