import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react-dom';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import ChevronIcon from '../../../icons/chevron.svg';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';
import { FilterButtonDropdownMenu } from './filterButtonDropdownMenu/filterButtonDropdownMenu';

const Chevron = styled(ChevronIcon)<{ active: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${(p) => (p.active ? 'rotate(180deg)' : '')};
`;

export interface FilterButtonDropdownProps {
  type: 'dropdown';
  text: string;
  menuType: 'checkbox' | 'radio';
  active: boolean;
  options: string[];
  selectedOptions: string[] | string;
  onInputClick: (value: string) => void;
  onValueClear: VoidFunction;
  onButtonClick: VoidFunction;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  menuType,
  active = false,
  options,
  selectedOptions,
  onInputClick = () => undefined,
  onValueClear = () => undefined,
  onButtonClick = () => undefined,
}) => {
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [flip(), shift()],
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  const valueString = useMemo(() => {
    if (Array.isArray(selectedOptions)) {
      return selectedOptions.join(', ');
    } else {
      return selectedOptions;
    }
  }, [selectedOptions]);

  return (
    <>
      <FilterButtonContainer
        ref={reference}
        active={active}
        hasValues={Boolean(valueString)}
        onClick={onButtonClick}
      >
        {selectedOptions.length === 0 && (
          <>
            {text} <Chevron active={active} />
          </>
        )}
        {selectedOptions.length !== 0 && (
          <>
            {valueString}
            <FilterButtonCrossButton onValueClear={onValueClear} />
          </>
        )}
      </FilterButtonContainer>
      {active && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          <FilterButtonDropdownMenu
            type={menuType}
            name={text}
            options={options}
            selectedOptions={selectedOptions}
            onInputClick={onInputClick}
          />
        </div>
      )}
    </>
  );
};
