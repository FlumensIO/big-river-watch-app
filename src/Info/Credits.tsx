import { Header, Page, Main, Section } from '@flumens';
import logo from 'common/images/flumens.svg';

const { P } = Section;

export default () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <Section>
        <p>
          <a href="https://flumens.io">
            <img src={logo} alt="" className="m-auto block w-1/2 max-w-xs" />
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
