import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Numbers } from "@/components/home/Numbers";
import { Programs } from "@/components/home/Programs";
import { Volunteers } from "@/components/home/Volunteers";
import { Partners } from "@/components/home/Partners";
import { Faq } from "@/components/home/Faq";
import { Events } from "@/components/home/Events";
import { Blog } from "@/components/home/Blog";
import {
  getHome,
  getPrograms,
  getPartners,
  getFaqs,
  getEvents,
  getPosts,
} from "@/lib/content";

export default function HomePage() {
  const home = getHome();
  const programs = getPrograms();
  const partners = getPartners();
  const faqs = getFaqs();
  const events = getEvents();
  const posts = getPosts();

  return (
    <>
      <Hero slides={home.hero} />
      <About about={home.about} />
      <Numbers stats={home.stats} />
      <Programs programs={programs} />
      <Volunteers />
      <Partners partners={partners} />
      <Faq faqs={faqs} />
      <Events events={events} />
      <Blog posts={posts} />
    </>
  );
}
