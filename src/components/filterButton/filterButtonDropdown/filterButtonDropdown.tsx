import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { FC, useMemo, useState } from 'react';
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
  options: string[];
  selectedOptions: string[] | string;
  onInputClick: (value: string) => void;
  onValueClear: VoidFunction;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  menuType,
  options,
  selectedOptions,
  onInputClick = () => undefined,
  onValueClear = () => undefined,
}) => {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [flip(), shift()],
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useClick(context),
  ]);

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
        {...getReferenceProps()}
        active={open}
        hasValues={Boolean(valueString)}
      >
        {selectedOptions.length === 0 && (
          <>
            {text} <Chevron active={open} />
          </>
        )}
        {selectedOptions.length !== 0 && (
          <>
            {valueString}
            <FilterButtonCrossButton onValueClear={onValueClear} />
          </>
        )}
      </FilterButtonContainer>
      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
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
