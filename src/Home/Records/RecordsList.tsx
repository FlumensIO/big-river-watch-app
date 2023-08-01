import { InfoBackgroundMessage, date as DateHelp, VirtualList } from '@flumens';
import { IonItemDivider, IonLabel, IonList } from '@ionic/react';
import Record from 'models/record';
import Survey from './Survey';

// https://stackoverflow.com/questions/47112393/getting-the-iphone-x-safe-area-using-javascript
const rawSafeAreaTop =
  getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0px';
const SAFE_AREA_TOP = parseInt(rawSafeAreaTop.replace('px', ''), 10);
const LIST_PADDING = 90 + SAFE_AREA_TOP;
const LIST_ITEM_HEIGHT = 75 + 10; // 10px for padding
const LIST_ITEM_DIVIDER_HEIGHT = 38;

function roundDate(date: number) {
  let roundedDate = date - (date % (24 * 60 * 60 * 1000)); // subtract amount of time since midnight
  roundedDate += new Date().getTimezoneOffset() * 60 * 1000; // add on the timezone offset
  return new Date(roundedDate);
}

type Props = {
  records: Record[];
};

const RecordsList = ({ records }: Props) => {
  if (!records.length) {
    return (
      <div className="mt-40">
        <InfoBackgroundMessage>
          You don't have any records in this list yet.
        </InfoBackgroundMessage>
      </div>
    );
  }

  const dates: any = [];
  const dateIndices: any = [];

  const groupedSurveys: any = [];
  let counter: any = {};

  const getDates = (survey: Record): void => {
    const date = roundDate(new Date(survey.attrs.date).getTime()).toString();
    if (!dates.includes(date) && date !== 'Invalid Date') {
      dates.push(date);
      dateIndices.push(groupedSurveys.length);
      counter = { date, count: 0 };
      groupedSurveys.push(counter);
    }

    counter.count += 1;
    groupedSurveys.push(survey);
  };
  [...records].forEach(getDates);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({ index, ...itemProps }: any) => {
    if (dateIndices.includes(index)) {
      const { date, count } = groupedSurveys[index];
      return (
        <IonItemDivider key={date} style={(itemProps as any).style} mode="ios">
          <IonLabel>{DateHelp.print(date, true)}</IonLabel>
          {count > 1 && <IonLabel slot="end">{count}</IonLabel>}
        </IonItemDivider>
      );
    }

    const record = groupedSurveys[index];

    return <Survey key={record.cid} record={record} {...itemProps} />;
  };

  const itemCount = records.length + dateIndices.length;

  const getItemSize = (index: number) =>
    dateIndices.includes(index) ? LIST_ITEM_DIVIDER_HEIGHT : LIST_ITEM_HEIGHT;

  return (
    <IonList>
      <VirtualList
        itemCount={itemCount}
        itemSize={getItemSize}
        Item={Item}
        topPadding={LIST_PADDING}
        bottomPadding={LIST_ITEM_HEIGHT / 2}
      />
    </IonList>
  );
};

export default RecordsList;
