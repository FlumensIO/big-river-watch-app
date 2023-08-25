import { Page, Main, Header, Section } from '@flumens';

const { P, H } = Section;

const Component = () => (
  <Page id="pollution">
    <Header title="Pollution" />
    <Main>
      <Section>
        <H>
          While you’re out, if you spot a pollution incident, any illegal
          activity or anything else, please report it immediately to the
          authorities:
        </H>
        <P>
          These hotlines are open 24 hours a day.
          <div className="mt-3">
            England, Scotland and Northern Ireland:{' '}
            <a href="tel:0800807060">0800 80 70 60</a>
          </div>
          <div className="mt-3">
            Wales: Natural Resources Wales hotline:{' '}
            <a href="tel:03000653000">0300 065 3000</a>
          </div>
          <div className="mt-3">
            Ireland: EPA Headquarters: <a href="tel:0539160600">053 916 0600</a>{' '}
            / Lo-Call Number: <a href="tel:1890335599">1890 33 55 99</a>
          </div>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Component;
