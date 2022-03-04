import FooterBar from '@/src/components/layout/FooterBar'
import HeaderBar from '@/src/components/layout/HeaderBar'

export default function DefaultLayout({ children }) {
  return (
    <>
      <HeaderBar />
      {children}
      <FooterBar />
    </>
  )
}