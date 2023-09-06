import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import React from 'react';


export default function NextBreadcrumbs() {
  const router = useRouter();
  const pathnames = router.asPath.split('/').filter((path) => path !== '');

  return (
    <Breadcrumbs className="breadcrumbs">
      <Link href="/">Home</Link>
      {pathnames.map((path, index) => (
        <Link href={`/${pathnames.slice(0, index + 1).join('/')}`} key={index} >
          {path}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
