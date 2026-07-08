"use client";
import  EditorialLayout from "./EditorialLayout";

export default function TermsPage() {
  return (
    <EditorialLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lede="These terms and conditions outline the rules and regulations for the use of the PZMIR Sports website and services."
      updated="June 12, 2026"
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Acceptance of Terms</h2>
        <p className="mt-3">
          By accessing and using the PZMIR Sports website, you accept and agree to be bound by these Terms & Conditions. 
          If you do not agree with any part of these terms, you must not use our website or services. 
          These terms apply to all visitors, users, and others who access or use the site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Use of Website</h2>
        <p className="mt-3">
          PZMIR Sports grants you a limited, non-exclusive, and revocable license to access and use 
          the website for personal, non-commercial purposes. You agree not to use the site in any way 
          that could damage, disable, overburden, or impair our servers or networks, or interfere with 
          any other party's use and enjoyment of the website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Intellectual Property Rights</h2>
        <p className="mt-3">
          All content on PZMIR Sports, including articles, images, videos, logos, graphics, and software, 
          is the property of PZMIR Sports or its content suppliers and is protected by international copyright, 
          trademark, and other intellectual property laws. You may not reproduce, distribute, modify, 
          create derivative works of, publicly display, or commercially exploit any content without 
          prior written consent from PZMIR Sports.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">User Conduct</h2>
        <p className="mt-3">
          When using PZMIR Sports, you agree not to:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>Post or transmit any unlawful, threatening, defamatory, obscene, or otherwise objectionable content.</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
          <li>Engage in any activity that disrupts or interferes with the website's functionality.</li>
          <li>Use automated systems or software to extract data from the website without authorisation.</li>
          <li>Attempt to gain unauthorised access to any portion of the website or its systems.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Third-Party Links</h2>
        <p className="mt-3">
          PZMIR Sports may contain links to third-party websites or services that are not owned or controlled by us. 
          We have no control over, and assume no responsibility for, the content, privacy policies, or practices 
          of any third-party websites. You acknowledge and agree that PZMIR Sports shall not be responsible or 
          liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection 
          with the use of or reliance on any such content, goods, or services available on or through any such websites.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Content Accuracy</h2>
        <p className="mt-3">
          While PZMIR Sports strives to provide accurate and up-to-date sports news, match reports, and statistics, 
          we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, 
          reliability, suitability, or availability of the information on the website. Sports data is subject to rapid 
          change, and you should verify critical information with official sources.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Limitation of Liability</h2>
        <p className="mt-3">
          In no event shall PZMIR Sports, its directors, employees, partners, agents, suppliers, or affiliates be liable 
          for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
          loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of 
          or inability to access or use the website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Changes to These Terms</h2>
        <p className="mt-3">
          PZMIR Sports reserves the right to modify or replace these Terms & Conditions at any time. 
          We will provide notice of significant changes by updating the "Last updated" date at the top of this page. 
          Your continued use of the website after any changes constitutes acceptance of the revised terms. 
          We encourage you to review this page periodically.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Contact Information</h2>
        <p className="mt-3">
          If you have any questions about these Terms & Conditions, please contact us at:{" "}
          <a
            href="mailto:pzmirsports@gmail.com"
            className="text-accent underline-offset-4 hover:underline"
          >
            pzmirsports@gmail.com
          </a>
          .
        </p>
      </section>
    </EditorialLayout>
  );
}
