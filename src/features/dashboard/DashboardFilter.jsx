import Filter from '../../ui/Filter';
import useBanks from './useBanks';

function DashboardFilter() {
  const { isLoading, banks } = useBanks();
  let filter = [{
    value: 1
  }];
  if (banks) {
    filter = [];
    banks.forEach(element => {
   
      filter.push({
        value: element.id,
        text: element.name
      })
    });
  }
  return (
    <>
      <Filter
        filterField='bank'
        options={filter}
      />
      <Filter
        filterField='type'
        options={[
          { text: 'Savings Account', value: '1' },
          { text: 'Credit Card', value: '22' },
          { text: 'RD', value: '3' },
          { text: 'FD', value: '4' }
        ]}
      />
      <Filter
        filterField='last'
        options={[
          { value: '7', text: 'Last 7 days' },
          { value: '30', text: 'Last 30 days' },
          { value: '90', text: 'Last 90 days' },
        ]}
      />
    </>
  );
}

export default DashboardFilter;
