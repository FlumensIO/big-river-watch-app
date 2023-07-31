import { Page, Main, Header, Section } from '@flumens';

const { P } = Section;

const Component: React.FC = () => (
  <Page id="about">
    <Header title="About" />
    <Main>
      <Section>
        <P>
          This Autumn, we're launching The Big River Watch - to help build a
          picture of river health across the country. It's good for you, and
          good for our rivers.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Component;
