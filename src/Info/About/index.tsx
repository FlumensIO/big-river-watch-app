import { Page, Main, Header, Section } from '@flumens';
import logo from 'common/images/flumens.svg';
import CaSTCoLogo from './CaSTCoLogo.png';
import TheBigRiverWatchLogo from './TheBigRiverWatchLogo.png';
import TheRiversTrustLogo from './TheRiversTrustLogo.png';

const { P } = Section;

const Component: React.FC = () => (
  <Page id="about">
    <Header title="About" />
    <Main>
      <div className="mt-5 flex flex-wrap justify-center gap-3 [&>img]:block [&>img]:w-2/5">
        <img src={TheRiversTrustLogo} alt="TheRiversTrustLogo" />
        <img src={TheBigRiverWatchLogo} alt="TheBigRiverWatchLogo" />
        <img src={CaSTCoLogo} alt="CaSTCoLogo" />
      </div>

      <Section>
        <P>
          The Big River Watch has been developed by{' '}
          <a href="https://theriverstrust.org">The Rivers Trust</a> and other
          partner organisations within{' '}
          <a href="https://theriverstrust.org/our-work/our-projects/castco-catchment-systems-thinking-cooperative">
            CaSTCo
          </a>{' '}
          (a project creating a national framework for improving river health
          data, with citizen scientists at the heart). Big River Watch is an
          important tool to support CaSTCo in introducing new and diverse
          audiences to river science and to encourage accessible engagement and
          diverse recruitment of volunteers. The Rivers Trust is the umbrella
          organisation for our 65 member Rivers Trusts across Britain, Northern
          Ireland and Ireland. We are river and catchment conservation experts
          with a wealth of data and expertise at our fingertips. We are
          together, for rivers.
        </P>
      </Section>
      <Section>
        <P>
          To find out more about The Rivers Trust, follow us on social media
          @theriverstrust.
        </P>
      </Section>
      <Section>
        <P>Registered charity number: 1107144</P>
      </Section>

      <Section className="!mt-8">
        <p>
          <a href="https://flumens.io">
            <img
              src={logo}
              alt=""
              className="m-auto mt-4 block w-2/5 max-w-xs"
            />
          </a>
        </p>
        <P>
          This app was hand crafted with love by{' '}
          <a href="https://flumens.io" className="whitespace-nowrap">
            Flumens.
          </a>{' '}
          A technical consultancy that excels at building bespoke environmental
          science and community focussed solutions. For suggestions and feedback
          please do not hesitate to{' '}
          <a href="mailto:enquiries%40flumens.io?subject=App%20Feedback">
            contact us
          </a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);

export default Component;
