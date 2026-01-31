export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#f97316', fontSize: '2.5rem' }}>
        Cuts Grease in Seconds. Gentle on Hands. Easy on Your Pocket.
      </h1>

      <p style={{ fontSize: '1.1rem', marginTop: '20px' }}>
        Gleam Dish Wash removes tough grease fast, is safe for daily use,
        and saves you money with refill options.
      </p>

      <h2 style={{ marginTop: '40px' }}>Why Gleam?</h2>
      <ul>
        <li>✔ Fast grease removal</li>
        <li>✔ NAFDAC-certified & gentle</li>
        <li>✔ Affordable refill system</li>
      </ul>

      <button style={{
        marginTop: '30px',
        padding: '14px 24px',
        background: '#f97316',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Try Gleam Now
      </button>

      <footer style={{ marginTop: '80px', fontSize: '14px', color: '#555' }}>
        Orange Homecare © 2025 | NAFDAC Certified | Proudly Made in Nigeria
      </footer>
    </div>
  )
}
