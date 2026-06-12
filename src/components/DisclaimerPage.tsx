import { createFileRoute } from "@tanstack/react-router";
import  EditorialPage from "./EditorialPage";

export default function DisclaimerPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Disclaimer"
      lede="This disclaimer governs your use of the PZMIR Sports website and outlines the limitations of liability for the content we publish."
      updated="June 12, 2026"
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">General Information</h2>
        <p className="mt-3">
          The content provided on PZMIR Sports is for informational and entertainment purposes only. 
          While we make reasonable efforts to ensure the information is accurate and up to date, 
          we make no representations or warranties of any kind, express or implied, about the completeness, 
          accuracy, reliability, or availability of the website or the information contained on it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Editorial Opinions</h2>
        <p className="mt-3">
          Articles, match previews, opinion pieces, and commentary published on PZMIR Sports represent the views 
          of the individual authors and do not necessarily reflect the official policy or position of PZMIR Sports. 
          We encourage diverse viewpoints and respect the editorial independence of our contributors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Accuracy of Information</h2>
        <p className="mt-3">
          PZMIR Sports makes reasonable efforts to ensure accuracy but cannot guarantee completeness or accuracy 
          at all times. Sports statistics, scores, results, and player data are sourced from official leagues, 
          governing bodies, and reputable third-party providers. However, data is subject to rapid change, and 
          discrepancies may occur. You should verify critical information with official sources before making 
          any decisions based on our content.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">External Links Disclaimer</h2>
        <p className="mt-3">
          PZMIR Sports may contain links to external websites that are not controlled or maintained by us. 
          These links are provided for convenience and reference only. We do not endorse the content, products, 
          or services available on these external sites, and we are not responsible for their accuracy, legality, 
          or content. External links are not controlled by PZMIR Sports, and you access them at your own risk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Sports Statistics and Results</h2>
        <p className="mt-3">
          All sports statistics, match results, player data, and league standings displayed on PZMIR Sports 
          are provided for informational purposes. While we source data from reliable providers, we do not guarantee 
          real-time accuracy. Delays in data updates, human error, or technical issues may affect the timeliness 
          and correctness of the information presented.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">No Professional Advice</h2>
        <p className="mt-3">
          The content on PZMIR Sports does not constitute professional advice of any kind, including but not limited 
          to financial, legal, medical, or betting advice. Any actions you take based on the information found on 
          this website are strictly at your own risk. PZMIR Sports will not be liable for any losses or damages 
          in connection with the use of our website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Affiliate and Sponsored Content Disclosure</h2>
        <p className="mt-3">
          PZMIR Sports may publish sponsored and promotional content in partnership with advertisers and brands. 
          Sponsored and promotional content will be clearly identified with labels such as "Sponsored," "Promoted," 
          "Advertisement," or "Partner Content." We maintain editorial independence and all sponsored content is 
          reviewed to ensure it meets our quality standards. Affiliate links may be included in some articles, 
          and we may earn a commission if you make a purchase through those links at no additional cost to you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Limitation of Liability</h2>
        <p className="mt-3">
          PZMIR Sports, its owners, employees, and affiliates shall not be held liable for any direct, indirect, 
          incidental, consequential, or punitive damages arising out of your access to, or use of, the website. 
          This includes, without limitation, damages for loss of profits, goodwill, use, data, or other intangible 
          losses, even if we have been advised of the possibility of such damages.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Contact Information</h2>
        <p className="mt-3">
          If you have any questions or concerns regarding this disclaimer, please contact us at:{" "}
          <a
            href="mailto:pzmirsports@gmail.com"
            className="text-accent underline-offset-4 hover:underline"
          >
            pzmirsports@gmail.com
          </a>
          .
        </p>
      </section>
    </EditorialPage>
  );
}
