import { ArrowUpRight } from "lucide-react";
import { metadata } from "@/lib/site";
import { Eyebrow, TextLink } from "@/components/ui";
export const generateMetadata = () =>
  metadata(
    "Contact NISIMIN",
    "Get in touch with NISIMIN about PlayTown, EduNisi, or our approach to building thoughtful digital products.",
    "/contact/",
  );
export default function Contact() {
  return (
    <section className="page-hero container contact-page">
      <Eyebrow>LET’S START A CONVERSATION</Eyebrow>
      <h1>
        Good things happen
        <br />
        when we connect.
      </h1>
      <p className="lead">
        A question about our products, a perspective to share, or an idea worth
        exploring? We’d like to hear from you.
      </p>
      <a
        className="email-link"
        href="mailto:hello@nisimin.com"
        data-track="contact_email"
      >
        hello@nisimin.com
        <ArrowUpRight size={30} />
      </a>
      <div className="contact-options">
        <article>
          <h2>About PlayTown</h2>
          <p>
            Ask about the sports community platform as we prepare for launch.
          </p>
          <TextLink href="mailto:hello@nisimin.com?subject=PlayTown%20enquiry">
            Talk about PlayTown
          </TextLink>
        </article>
        <article>
          <h2>About EduNisi</h2>
          <p>Share your institution’s needs or enquire about a future demo.</p>
          <TextLink href="mailto:hello@nisimin.com?subject=EduNisi%20demo%20enquiry">
            Talk about EduNisi
          </TextLink>
        </article>
      </div>
      <p style={{ fontSize: 12, marginTop: 55 }}>
        Email opens in your preferred mail application.
      </p>
    </section>
  );
}
