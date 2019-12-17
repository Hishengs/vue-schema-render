const tip = '刘墉（1720年-1805年1月24日/25日 [1]  ），字崇如，号石庵，出生于山东诸城。清朝政治家、书法家。大学士刘统勋长子。';

export default {
  components: [
    {
      type: 'text',
      label: '无提示',
      key: 'text1',
      value: '',
    },
    {
      type: 'text',
      label: '有提示',
      labelTooltip: tip,
      key: 'text2',
      value: '',
    },
    {
      type: 'text',
      label: '有提示',
      labelTooltip: tip,
      key: 'text3',
      value: '',
      tip,
    },
  ]
};