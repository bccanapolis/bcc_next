import FooterBar from '@/components/layout/FooterBar'
import HeaderBar from '@/components/layout/HeaderBar'

export default function DefaultLayout({ children }) {
  return (
    <>
      <HeaderBar />
      {children}
      <FooterBar />
    </>
  )
}