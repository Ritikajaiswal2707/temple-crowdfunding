export default async function handler(req, res) {
  const isMock = process.env.MOCK_MODE === 'true' || process.env.NODE_ENV === 'development'
  if (isMock) {
    // Short-circuit all NextAuth routes in mock mode
    return res.status(200).json({ ok: true, mock: true })
  }

  // Dynamically import NextAuth and providers only when not in mock mode
  const [{ default: NextAuth }, { default: GoogleProvider }, { default: CredentialsProvider }] = await Promise.all([
    import('next-auth'),
    import('next-auth/providers/google'),
    import('next-auth/providers/credentials'),
  ])
  const [{ default: dbConnect }, { default: User }, { default: bcrypt }] = await Promise.all([
    import('../../../lib/mongodb'),
    import('../../../models/User'),
    import('bcryptjs')
  ])

  const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
        async authorize(credentials) {
          try {
            await dbConnect()
            const user = await User.findOne({ email: credentials.email })
            if (!user) throw new Error('No user found with this email')
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (!isValid) throw new Error('Invalid password')
            return { id: user._id.toString(), name: user.name, email: user.email }
          } catch (error) {
            console.error('Auth error:', error)
            throw new Error('Authentication failed')
          }
        }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    pages: { signIn: '/auth/signin' },
    callbacks: {
      async jwt({ token, user }) { if (user) token.id = user.id; return token },
      async session({ session, token }) { if (token) session.user.id = token.id; return session },
    }
  }

  return NextAuth(authOptions)(req, res)
}

