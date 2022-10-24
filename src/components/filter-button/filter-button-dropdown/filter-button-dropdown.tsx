import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import { singular } from 'pluralize';
import { CSSProperties, FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import ChevronIcon from '../../../icons/chevron.svg';
import { MOBILE_BREAKPOINT, ZIndexes } from '../../../styles/global';
import { FilterButton, FilterButtonClearButton } from '../filter-button';
import { FilterButtonCheckboxMenu } from './filter-button-checkbox-menu/filter-button-checkbox-menu';
import { FilterButtonRangeMenu } from './filter-button-range-menu/filter-button-range-menu';

const ControlsContainer = styled.div`
  position: relative;
`;

const StyledFilterButton = styled(FilterButton)`
  padding-right: ${(p) => (p.hasValues ? `${18 + 24}px` : '')};
  max-width: 300px;

  display: ${(p) => (p.hasValues ? 'block' : 'flex')};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  text-transform: capitalize;
`;

const Dropdown = styled(motion.div)`
  position: relative;

  z-index: ${ZIndexes.modal};
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 1rem;

  border: 1px solid black;
  padding: 24px 64px 24px 18px;
  width: fit-content;
  max-height: 66vh;
  overflow-y: auto;

  background: white;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    max-height: 75vh;
    overflow-y: scroll;

    border: none;
    border-top: 1px solid black;
  }
`;

const DropdownCloseButton = styled(FilterButtonClearButton).attrs({
  black: true,
})`
  z-index: 9999;
  position: fixed;
  bottom: 8px;
  right: 8px;
  height: auto;
`;

const Chevron = styled(ChevronIcon)<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${(p) => (p.$active ? 'rotate(180deg)' : '')};
`;

const StyledFilterButtonClearButton = styled(FilterButtonClearButton)`
  position: absolute;
  top: 0;
  right: 8px;
`;

const DarkenBackground = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZIndexes.modalBackground};
`;

export interface FilterButtonDropdownProps {
  type: 'dropdown';
  text: string;
  menuType: 'checkbox' | 'range' | 'radio';
  options: string[];
  selectedOptions: string[] | string;
  onInputClick: (value: unknown) => void;
  onValueClear: VoidFunction;
  closeOnOptionClick?: boolean;
  createValueText?: (options: string[]) => string;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  menuType,
  options,
  selectedOptions,
  onInputClick: onInputClickProp = () => undefined,
  onValueClear = () => undefined,
  closeOnOptionClick = false,
  createValueText,
}) => {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: 'fixed',
    middleware: [flip(), shift()],
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useClick(context),
  ]);

  useLockBodyScroll(open);

  const menuPosition = useMemo<CSSProperties>(() => {
    if (isMobile) {
      return {
        position: strategy,
        right: 0,
        left: 0,
        bottom: 0,
      };
    } else {
      return {
        position: strategy,
        left: x ?? 0,
        top: y ?? 0,
      };
    }
  }, [isMobile, strategy, x, y]);

  const valueString = useMemo(() => {
    if (Array.isArray(selectedOptions)) {
      if (createValueText) {
        return createValueText(selectedOptions);
      } else {
        return selectedOptions.join(', ');
      }
    } else {
      return selectedOptions;
    }
  }, [createValueText, selectedOptions]);

  const handleInputChange = (val: string | string[]) => {
    if (closeOnOptionClick) {
      setOpen(false);
    }

    onInputClickProp(val);
  };

  return (
    <>
      <ControlsContainer>
        <StyledFilterButton
          ref={reference}
          {...getReferenceProps()}
          active={open}
          hasValues={Boolean(valueString)}
        >
          {selectedOptions.length === 0 && (
            <>
              {singular(text)} <Chevron $active={open} />
            </>
          )}
          {selectedOptions.length !== 0 && <>{valueString}</>}
        </StyledFilterButton>

        {selectedOptions.length !== 0 && (
          <StyledFilterButtonClearButton onValueClear={onValueClear} />
        )}
      </ControlsContainer>

      {open && isMobile && (
        <DropdownCloseButton onValueClear={() => setOpen(false)} />
      )}

      <AnimatePresence>
        {open && (
          <>
            <DarkenBackground
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={isMobile ? { opacity: 0 } : undefined}
            />

            <Dropdown
              initial={isMobile ? { y: '100%' } : undefined}
              animate={isMobile ? { y: '0%' } : undefined}
              exit={isMobile ? { y: '100%' } : undefined}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              ref={floating}
              {...getFloatingProps()}
              style={menuPosition}
            >
              {menuType === 'checkbox' && (
                <FilterButtonCheckboxMenu
                  menuType={menuType}
                  name={text}
                  options={options}
                  selectedOptions={selectedOptions}
                  onInputClick={handleInputChange}
                />
              )}
              {menuType === 'radio' && (
                <FilterButtonCheckboxMenu
                  menuType={menuType}
                  name={text}
                  options={options}
                  selectedOptions={selectedOptions}
                  onInputClick={handleInputChange}
                />
              )}
              {menuType === 'range' && Array.isArray(selectedOptions) && (
                <FilterButtonRangeMenu
                  options={options}
                  selectedOptions={selectedOptions}
                  onInputChange={handleInputChange}
                />
              )}
            </Dropdown>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
