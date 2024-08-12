import { Page, Main, Header, Section } from '@flumens';
import config from 'common/config';
import TheBigRiverWatchLogo from 'common/images/TheBigRiverWatchLogo.png';
import logo from 'common/images/flumens.svg';
import TheRiversTrustLogo from './TheRiversTrustLogo.png';

const { P, H } = Section;

const Component: React.FC = () => (
  <Page id="about">
    <Header title="About" />
    <Main>
      <Section>
        <div className="mb-3 mt-5 flex flex-wrap justify-center gap-3 [&>img]:block [&>img]:w-2/5">
          <img src={TheRiversTrustLogo} alt="TheRiversTrustLogo" />
          <img src={TheBigRiverWatchLogo} alt="TheBigRiverWatchLogo" />
        </div>

        <P>
          <a href={`${config.websitePath}/take-action/the-big-river-watch`}>
            Big River Watch
          </a>{' '}
          is an invitation for communities to love their local river and to be
          part of the movement demanding better for our rivers. It consists of a
          free app containing a simple survey, and anybody in the UK and Ireland
          who can access a river can take part – all you need to do is spend a
          little time watching your local watercourse and answering the
          questions. All of the survey data will provide a large-scale picture
          of river health, and help us fight for better for our rivers.
        </P>
        <P>
          Big River Watch has been developed by The Rivers Trust. The Rivers
          Trust is an umbrella organisation for our 65 member Rivers Trusts
          across Britain, Northern Ireland and Ireland. We are river and
          catchment conservation experts with a wealth of data and expertise at
          our fingertips. We are together, for rivers. Find out more about the
          Big River Watch partners on our{' '}
          <a
            href={`${config.websitePath}/take-action/the-big-river-watch/big-river-watch-partners`}
          >
            website
          </a>
          .
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

      <Section>
        <H>Thanks to the following for additional photos:</H>
        <P skipTranslation>
          <ul>
            <li>Annie Jenkin</li>
            <li>James Pugh</li>
            <li>Richard Symonds</li>
            <li>Toby Hull</li>
            <li>Wigan Adam Rourke</li>
            <li>Matthew Woodard</li>
            <li>Steve Woodard</li>
          </ul>
        </P>
      </Section>

      <Section className="!mt-8">
        <p>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
