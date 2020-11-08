import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { BuildSetCalculatorConfig, BuildSetCalculatorConfigMap } from './BuildSetCalculatorCommon';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

export const BuildSetCalculatorDropdown: React.FC<BuildSetCalculatorConfigMap> =
  ({ map, updateSelected }) => {
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();

    React.useEffect(
      () => updateSelected(selectedItem ? selectedItem.key as string : ''),
      [selectedItem]);

    const dropdownOptions: IDropdownOption[] = [];

    map.forEach((value: BuildSetCalculatorConfig, key: string) => dropdownOptions.push({
      key: key,
      text: value.setName
    }));

    const onChange = React.useCallback(
      (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
        setSelectedItem(option);
      },
      []);

    return (
      <Dropdown
        label="Set:"
        selectedKey={selectedItem ? selectedItem.key : ''}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        placeholder="Select an option"
        options={dropdownOptions}
        styles={dropdownStyles}
      />
    );
  };