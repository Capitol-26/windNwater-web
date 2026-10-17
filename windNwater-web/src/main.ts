import './style.css'

type Screen = 1 | 2 | 3

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Could not find the #app element')
}

function renderPhoneScreen(screen: Screen): string {
  if (screen === 1) {
    return `
      <div class="phone-screen-content fade-in">
        <h3>Find out the optimal chi for your room</h3>
        <div class="room-art room-art--intro" aria-label="Room scan preview">
          <div class="room-outline">
            <span class="room-icon" aria-hidden="true">🛏️</span>
            <p>Isometric perspective<br />scanning active</p>
          </div>
        </div>
        <button class="scan-link" type="button" data-screen="2">
          <span>Click here to scan!</span>
          <span aria-hidden="true">➔</span>
        </button>
      </div>`
  }

  if (screen === 2) {
    return `
      <div class="phone-screen-content fade-in">
        <div class="phone-toolbar">
          <span></span>
          <button class="close-button" type="button" data-screen="1" aria-label="Close scan">×</button>
        </div>
        <h3>Move slowly and keep the walls in frame</h3>
        <div class="room-art room-art--scan" aria-label="Room scanning in progress">
          <div class="scan-frame"></div>
        </div>
        <div class="capture-control">
          <button class="capture-button" type="button" data-screen="3" aria-label="Start scan">
            <span></span>
          </button>
          <p>Tap to start</p>
        </div>
      </div>`
  }

  return `
    <div class="phone-screen-content fade-in">
      <div class="phone-toolbar">
        <span></span>
        <button class="close-button" type="button" data-screen="1" aria-label="Close rating">×</button>
      </div>
      <h3>Your room feng shui rating</h3>
      <div class="room-art room-art--rating" aria-label="Feng shui room analysis">
        <span aria-hidden="true">☯️</span>
      </div>
      <div class="rating-card">
        <p>Click to see more ▴</p>
        <h4>Your Rating: <strong>99/100</strong></h4>
      </div>
    </div>`
}

app.innerHTML = `
  <div class="site-shell">
    <nav class="navigation" aria-label="Main navigation">
      <a class="wordmark" href="#" aria-label="windNwater home">wind<span>N</span>water</a>
      <div class="navigation-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#preview">App preview</a>
      </div>
      <a class="button button--dark navigation-cta" href="#download">Get the app</a>
    </nav>

    <main>
      <header class="hero">
        <div class="hero-copy">
          <p class="eyebrow"><span aria-hidden="true">✦</span> AI-powered space harmony</p>
          <h1>Find out the<br /><em>optimal chi</em><br />for your room.</h1>
          <p class="hero-description">
            Scan your surroundings, trace your walls, and explore your room's Feng Shui alignment
            with personalized ideas for a more harmonious space.
          </p>
          <div class="download" id="download">
            <form class="signup-form" id="signup-form">
              <label class="visually-hidden" for="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Enter your email for early access"
                autocomplete="email"
                required
              />
              <button class="button button--dark" type="submit">Join beta</button>
            </form>
          </div>
        </div>
      </header>

      <section class="details-section" id="features">
        <div class="section-heading">
          <p class="eyebrow">A fresh perspective on your space</p>
          <h2>Make room for <em>good energy.</em></h2>
        </div>
        <div class="feature-grid">
          <article class="feature-card">
            <span class="feature-number">01</span>
            <h3>See your space</h3>
            <p>Use your phone to scan your room and find whats disturbing your chi</p>
          </article>
          <article class="feature-card">
            <span class="feature-number">02</span>
            <h3>Change your Chi</h3>
            <p>Get a recomendation on how to have better Feng Shui</p>
          </article>
          <article class="feature-card">
            <span class="feature-number">03</span>
            <h3>Start small, end huge</h3>
            <p>Get live feedback on what interior design changes affect your Chi</p>
          </article>
        </div>
      </section>

      <section class="how-section" id="how-it-works">
        <div>
          <p class="eyebrow">Simple by design</p>
          <h2>Your room, in a<br /><em>new light.</em></h2>
        </div>
        <ol class="steps-list">
          <li><span>01</span><div><h3>Start a scan</h3><p>Move around your room and capture the walls in view.</p></div></li>
          <li><span>02</span><div><h3>Get your reading</h3><p>See a friendly snapshot of your room's energy and flow.</p></div></li>
          <li><span>03</span><div><h3>Explore adjustments</h3><p>Change your room layout to better fit your needs</p></div></li>
        </ol>
      </section>
    </main>

    <footer class="footer">
      <a class="wordmark" href="#" aria-label="windNwater home">wind<span>N</span>water</a>
      <p></p>
    </footer>
  </div>
`

let activeScreen: Screen = 1
const phoneScreen = document.querySelector<HTMLDivElement>('#phone-screen')
const signupForm = document.querySelector<HTMLFormElement>('#signup-form')

if (!phoneScreen || !signupForm) {
  throw new Error('Could not initialize the landing page')
}

phoneScreen.innerHTML = renderPhoneScreen(activeScreen)

app.addEventListener('click', (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return

  const button = event.target.closest<HTMLButtonElement>('[data-screen]')
  if (!button) return

  const nextScreen = Number(button.dataset.screen)
  if (nextScreen === 1 || nextScreen === 2 || nextScreen === 3) {
    activeScreen = nextScreen
    phoneScreen.innerHTML = renderPhoneScreen(activeScreen)
  }
})

signupForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  const emailInput = signupForm.elements.namedItem('email')

  if (!(emailInput instanceof HTMLInputElement) || !emailInput.value.trim()) return

  const download = document.querySelector<HTMLDivElement>('.download')
  const note = document.querySelector<HTMLParagraphElement>('#signup-note')
  if (!download || !note) {
    throw new Error('Could not show the signup confirmation')
  }

})
