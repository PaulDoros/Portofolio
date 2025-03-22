import React from 'react';
import { Compare } from '~/components/ui/compare';

export function CompareDemo() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-100 p-4 px-4 dark:border-neutral-800 dark:bg-neutral-900">
      <Compare
        firstContent={
          <img
            src="https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=1000"
            alt="First image"
            className="h-full w-full object-cover"
            draggable={false}
          />
        }
        secondContent={
          <img
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000"
            alt="Second image"
            className="h-full w-full object-cover"
            draggable={false}
          />
        }
        firstContentClassName="object-cover object-center"
        secondContentClassName="object-cover object-center"
        className="h-[250px] w-[200px] overflow-hidden rounded-xl md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
    </div>
  );
}
