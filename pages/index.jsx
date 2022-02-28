import DefaultLayout from '@/layouts/DefaultLayout'
import Banner from '@/components/layout/Banner'

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Banner fullscreen={true} />
      </DefaultLayout>
    </>
  )
}
