// Mock session endpoint to avoid next-auth errors in MOCK_MODE

export default function handler(req, res) {
  const isMock = process.env.MOCK_MODE === 'true' || process.env.NODE_ENV === 'development'

  if (isMock) {
    // Return a minimal, valid session payload when in mock mode
    return res.status(200).json({
      user: null,
      expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    })
  }

  // If not mock, inform user to use NextAuth default route
  return res.status(500).json({ error: 'Session route overridden. Disable MOCK_MODE to use NextAuth.' })
}


