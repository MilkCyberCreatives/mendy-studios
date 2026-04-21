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

function shortenLabel(label: string, maxLength = 18) {
  if (label.length <= maxLength) {
    return label;
  }

  return `${label.slice(0, maxLength).trimEnd()}...`;
}

export default function PageBreadcrumb({ items, className = '' }: PageBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  const displayItems =
    items.length <= 2
      ? items
      : [items[0], { label: '...', href: undefined }, items[items.length - 1]];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex h-2.5 w-fit max-w-full items-center overflow-hidden ${className}`.trim()}
    >
      <ol className="flex flex-nowrap items-center gap-px overflow-hidden text-[6px] font-normal leading-none tracking-[0.01em] text-white/65 md:text-[7px]">
        {displayItems.map((item, index) => {
          const isCurrent = index === displayItems.length - 1;
          const label = item.label === '...' ? item.label : shortenLabel(item.label);

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-px whitespace-nowrap">
              {index > 0 ? <FaChevronRight className="text-[5px] text-white/25" /> : null}
              {isCurrent || !item.href ? (
                <span
                  aria-current={isCurrent ? 'page' : undefined}
                  className="max-w-[10ch] overflow-hidden text-ellipsis leading-none text-white/86"
                  title={item.label}
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="max-w-[8ch] overflow-hidden text-ellipsis leading-none transition-colors hover:text-white/86"
                  title={item.label}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
