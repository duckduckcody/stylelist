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
import { ZIndexes } from '../../../styles/global';
import { FilterButton, FilterButtonClearButton } from '../filter-button';
import { FilterButtonRangeInput } from './filter-button-range-input/filter-button-range-input';
import { FilterButtonCheckboxMenu } from './filterButtonCheckboxMenu/filterButtonCheckboxMenu';

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

const CheckboxMenu = styled(FilterButtonCheckboxMenu)<{
  isMobile?: boolean;
}>`
  width: ${(p) => (p.isMobile ? '100%' : 'fit-content')};
  border-bottom: ${(p) => (p.isMobile ? 'none' : '')};
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

const MenuContainer = styled(motion.div)`
  z-index: ${ZIndexes.modal};
`;

export interface FilterButtonDropdownProps {
  type: 'dropdown';
  text: string;
  menuType: 'checkbox' | 'range';
  options: string[];
  selectedOptions: string[];
  onInputClick: (value: string) => void;
  onValueClear: VoidFunction;
  closeOnOptionClick?: boolean;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  menuType,
  options,
  selectedOptions,
  onInputClick: onInputClickProp = () => undefined,
  onValueClear = () => undefined,
  closeOnOptionClick = false,
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
      return selectedOptions.join(', ');
    } else {
      return selectedOptions;
    }
  }, [selectedOptions]);

  const handleInputChange = (val: string) => {
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

      <AnimatePresence>
        {open && (
          <>
            <DarkenBackground
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={isMobile ? { opacity: 0 } : undefined}
            />

            <MenuContainer
              initial={isMobile ? { transform: 'translateY(100%)' } : undefined}
              animate={isMobile ? { transform: 'translateY(0%)' } : undefined}
              exit={isMobile ? { transform: 'translateY(100%)' } : undefined}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              ref={floating}
              {...getFloatingProps()}
              style={menuPosition}
            >
              {menuType === 'checkbox' && (
                <CheckboxMenu
                  isMobile={isMobile}
                  name={text}
                  options={options}
                  selectedOptions={selectedOptions}
                  onInputClick={handleInputChange}
                />
              )}
              {menuType === 'range' && (
                <FilterButtonRangeInput
                  selectedOptions={selectedOptions}
                  onInputChange={handleInputChange}
                />
              )}
            </MenuContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
