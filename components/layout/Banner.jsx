export default function Banner({ fullscreen, children }) {
  return (
    <>
      <div className={`${fullscreen ? 'h-[100vh]' : ''} w-full bg-header pt-40 pb-20 banner`}>
        {children}
      </div>
    </>
  )
}