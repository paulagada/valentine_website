import { useState, useEffect, useCallback, useMemo } from 'react'
import elizabeth1 from './assets/elizabeth_1.jpg'
import elizabeth2 from './assets/elizabeth_2.jpg'
import elizabeth3 from './assets/elizabeth_3.jpg'

const FloatingBackground = () => {
  const items = useMemo(() => ['❤️', '💖', '✨', '🌹', '🦋', '🎈', '🍫', '💘'], [])
  const [elements, setElements] = useState<{ id: number; left: string; size: string; delay: string; duration: string; content: string }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newElement = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 20 + 15}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 8 + 6}s`,
        content: items[Math.floor(Math.random() * items.length)]
      }
      setElements((prev) => [...prev.slice(-25), newElement])
    }, 800)
    return () => clearInterval(interval)
  }, [items])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-rose-50/50">
      {elements.map((el) => (
        <div
          key={el.id}
          className="floating-item opacity-60 flex items-center justify-center"
          style={{
            left: el.left,
            fontSize: el.size,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          {el.content}
        </div>
      ))}
    </div>
  )
}

const PhotoGallery = () => {
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({})

  const photos = [
    { url: elizabeth1, caption: 'Stunning ✨' },
    { url: elizabeth2, caption: 'Beautiful 🌙' },
    { url: elizabeth3, caption: 'Radiant 🌹' },
  ]

  return (
    <div className="w-full mb-8 relative">
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-hide no-scrollbar">
        {photos.map((photo, i) => (
          <div 
            key={i} 
            className="flex-none w-[70vw] md:w-64 snap-center group relative overflow-hidden rounded-2xl shadow-lg border-2 border-white/50 aspect-[4/5] transform transition-all duration-300 bg-rose-100/50"
          >
            {errorImages[i] ? (
              <div className="w-full h-full flex items-center justify-center text-4xl">❤️</div>
            ) : (
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setErrorImages(prev => ({ ...prev, [i]: true }))}
              />
            )}
            <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
              <span className="text-xs text-white font-bold bg-rose-600/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
        {photos.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-300/50"></div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)

  const moveNoButton = useCallback(() => {
    const x = Math.random() * (window.innerWidth - 300) + 150
    const y = Math.random() * (window.innerHeight - 200) + 100
    setNoButtonPos({ x, y })
    setHasMoved(true)
  }, [])

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-center relative z-10 transition-all duration-1000 bg-rose-100/30">
        <FloatingBackground />
        <div className="glassmorphism p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(244,63,94,0.3)] border border-white/40 max-w-2xl w-full animate-in fade-in zoom-in duration-700">
          <div className="animate-bounce mb-6">
            <span className="text-9xl">💍</span>
          </div>
          
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-3xl shadow-xl mb-8 border-4 border-white overflow-hidden bg-rose-50/80 backdrop-blur-sm flex items-center justify-center relative group">
            <div className="flex flex-col items-center animate-bounce-slow">
              <span className="text-7xl md:text-9xl drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500">🥰</span>
              <div className="mt-4 font-dancing text-2xl md:text-3xl text-rose-600 font-bold">You're My World!</div>
            </div>
            
            {/* Animated particles fallback */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 text-2xl animate-ping opacity-40">✨</div>
              <div className="absolute bottom-1/4 right-1/4 text-2xl animate-ping opacity-40 delay-300">💖</div>
              <div className="absolute top-1/2 right-4 text-xl animate-bounce opacity-30">🌹</div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-full animate-ping-slow opacity-15 bg-rose-400 rounded-full scale-125"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-8xl font-dancing text-rose-600 mb-6 drop-shadow-md leading-tight">
            Yay! I love you, Elizabeth! ❤️
          </h1>
          
          <p className="text-xl md:text-2xl font-inter text-rose-500 font-bold mb-8 italic">
            "You make my heart skip a beat every single day."
          </p>

          <div className="flex justify-center gap-6">
            <span className="text-5xl animate-bounce delay-75">🌹</span>
            <span className="text-5xl animate-pulse text-rose-500">💕</span>
            <span className="text-5xl animate-bounce delay-300">🍫</span>
          </div>
          
          <div className="mt-10 text-rose-400 font-semibold font-inter text-lg">
            See you soon, my Valentine! ✨
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-rose-50/20 relative z-10">
      <FloatingBackground />
      
      <div className="glassmorphism p-8 md:p-14 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white/30 text-center max-w-xl w-full transform transition-all duration-500 hover:shadow-[0_25px_70px_rgba(244,63,94,0.15)] flex flex-col items-center">
        
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-inner bg-rose-50/80 backdrop-blur-sm flex items-center justify-center group overflow-visible">
            <div className="flex flex-col items-center animate-pulse-slow">
              <span className="text-6xl md:text-7xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">🧸</span>
              <span className="text-[10px] md:text-[12px] mt-1 font-bold text-rose-400 uppercase tracking-widest font-inter">Forever Yours</span>
            </div>
            {/* Small floating elements */}
            <div className="absolute -top-2 -left-2 text-2xl animate-float">🦋</div>
            <div className="absolute -top-4 right-4 text-xl animate-float delay-700">✨</div>
          </div>
          <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 text-3xl md:text-4xl transform rotate-12">💝</div>
        </div>

        <h2 className="text-rose-400 font-inter font-bold uppercase tracking-[0.2em] text-sm mb-2">For My Dearest</h2>
        
        <h1 className="text-4xl md:text-7xl font-dancing text-rose-600 mb-8 leading-tight drop-shadow-sm min-h-[3em] flex items-center justify-center">
          Will you be my Valentine, Elizabeth?
        </h1>

        <PhotoGallery />

        <div className="flex flex-wrap items-center justify-center gap-8 relative min-h-[120px] w-full">
          <button
            onClick={() => setIsSuccess(true)}
            className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-full shadow-[0_10px_20px_rgba(244,63,94,0.3)] hover:shadow-rose-400/50 transform hover:scale-110 active:scale-95 transition-all duration-300 text-xl md:text-2xl flex items-center gap-2"
          >
            <span>Yes!</span>
            <span className="text-xl">💖</span>
          </button>

          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onMouseOver={moveNoButton}
            style={hasMoved ? {
              position: 'fixed',
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              zIndex: 100
            } : {}}
            className="px-8 py-3 md:px-10 md:py-4 bg-white/80 text-rose-500 font-bold rounded-full border-2 border-rose-400 shadow-lg transition-all duration-300 text-lg md:text-xl hover:bg-rose-50 whitespace-nowrap"
          >
            No 🥺
          </button>
        </div>

        <div className="mt-8 text-rose-300 text-sm font-inter animate-pulse">
          Click the "Yes" to make me the happiest person!
        </div>
      </div>
    </div>
  )
}

export default App
