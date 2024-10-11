import { PlaywrightCrawler } from "crawlee";

interface Data {
  title: string;
  description: string;
}

let scrapedText: Data[] = [];

export default async function scrape(url: string) {
  const crawler = new PlaywrightCrawler({
    launchContext: {
      launchOptions: {
        headless: true,
      },
    },

    maxRequestsPerCrawl: 20,

    async requestHandler({ pushData, request, page, enqueueLinks, log }) {
      log.info(`Processing ${request.url}...`);

      const data = await page.$$eval(
        ".div_features_covered_main",
        async ($posts) => {
          const scrapedData: {
            title: string;
            description: string;
          }[] = [];

          $posts.forEach(($post) => {
            const titleElement = $post.querySelector(
              ".span_feature_popup_heading",
            ) as HTMLAnchorElement;
            const featureElement = $post.querySelector(
              ".span_feature_popup_sub_heading",
            ) as HTMLElement;
            const meaningfulData = {
              title: titleElement.textContent || "",
              description: featureElement.textContent || "",
            };
            scrapedData.push(meaningfulData);
          });

          return scrapedData;
        },
      );

      // await pushData(data);
      scrapedText = data;
    },

    failedRequestHandler({ request, log }) {
      log.info(`Request ${request.url} failed too many times.`);
    },
  });

  await crawler.addRequests([url]);

  await crawler.run();
  console.log("Crawler finished.");
  return scrapedText;
}

// const url = `https://health.policybazaar.com/quotes?encenq=dE9wWVhIenlJVERSNHJFYUxNdmdnU0NKMGR0aDB0RFkvUk5TQTJMNkppRT0&enquiryid=NjUzMzMyNzU4&featurePlanId=80043&featureSumInsured=10000000&featureSupplierId=54&fpop=true&k=&new=1&pq=health0&profileid=129811548&utm_content=hp_signed_health_insurance_dom`;
// main(url);
