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
import { CSSProperties, FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../../../hooks/useIsMobile';
import ChevronIcon from '../../../icons/chevron.svg';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';
import { FilterButtonDropdownMenu } from './filterButtonDropdownMenu/filterButtonDropdownMenu';

const StyledFilterButtonDropdownMenu = styled(FilterButtonDropdownMenu)<{
  isMobile?: boolean;
}>`
  width: ${(p) => (p.isMobile ? '100%' : 'fit-content')};
`;

const Chevron = styled(ChevronIcon)<{ active: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${(p) => (p.active ? 'rotate(180deg)' : '')};
`;

const DarkenBackground = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  const isMobile = useIsMobile();
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
      <AnimatePresence>
        {open && (
          <>
            <DarkenBackground
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ transform: 'translateY(100%)' }}
              animate={{ transform: 'translateY(0%)' }}
              exit={{ transform: 'translateY(100%)' }}
              ref={floating}
              {...getFloatingProps()}
              style={menuPosition}
            >
              <StyledFilterButtonDropdownMenu
                isMobile={isMobile}
                type={menuType}
                name={text}
                options={options}
                selectedOptions={selectedOptions}
                onInputClick={onInputClick}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
