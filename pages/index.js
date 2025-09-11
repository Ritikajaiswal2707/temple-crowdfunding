import Head from 'next/head'
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import FeaturedCampaigns from '../components/sections/FeaturedCampaigns'
import HowItWorks from '../components/sections/HowItWorks'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Head>
        <title>Temple Crowdfunding - Preserve Our Sacred Heritage</title>
        <meta name="description" content="Help preserve and restore ancient temples across India through our crowdfunding platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <Stats />
        <FeaturedCampaigns />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
    </>
  )
}