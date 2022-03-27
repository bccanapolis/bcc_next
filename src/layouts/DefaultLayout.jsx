import FooterBar from '@/components/layout/FooterBar';
import HeaderBar from '@/components/layout/HeaderBar';
import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react';

export default function DefaultLayout({ children }) {
  return (
    <>
      <HeaderBar />
      {children}
      <Toaster as={Fragment}/>
      <FooterBar />
    </>
  )
}