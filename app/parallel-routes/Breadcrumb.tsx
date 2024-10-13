import RightArrow from '@/components/icons/RightArrow';
import Link from 'next/link';

function Breadcrumb() {
  return (
    <ol className="flex items-center gap-1 fill-gray-500 text-base text-gray-600">
      <li>
        <Link
          href="/parallel-routes"
          className='hover:text-gray-700'
        >
          Parallel Routes
        </Link>
      </li>
      <li>
        <RightArrow className="fill-gray-600" />
      </li>
      <li>
        <Link
          href="/parallel-routes/settings"
          className='hover:text-gray-700'
        >
          Settings
        </Link>
      </li>
    </ol>
  );
}

export default Breadcrumb;