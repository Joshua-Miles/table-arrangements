import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputGroupProps, InputProps, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { convert, getAbbreviationFor, UnitOfMeasure, UnitsOfMeasure } from "../UnitOfMeasure";

export type MeasurementInputProps = Omit<InputGroupProps, 'onChange'> & Pick<InputProps, 'placeholder'> & {
    value?: number | null
    onChange?: (value: number) => void
};

export function MeasurementInput({ value, onChange, placeholder, ...groupProps}: MeasurementInputProps) {
    const [ unitOfMeasure, setUnitOfMeasure ] = useState<UnitOfMeasure>('feet');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        if(onChange) onChange(convert(value, unitOfMeasure).toBase());
    }

    if (value === null) value = undefined;

    return (
        <InputGroup {...groupProps}>
            <Input type="number" value={value === undefined ? value : convert(value).to(unitOfMeasure)} onChange={handleChange} placeholder={placeholder} />
            <InputRightAddon p={0}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
                        {getAbbreviationFor(unitOfMeasure)}
                    </MenuButton>
                    <Portal>
                        <MenuList>
                            {UnitsOfMeasure.map( (unitOfMeasure) => (
                                <MenuItem onClick={() => setUnitOfMeasure(unitOfMeasure as UnitOfMeasure)}>
                                    {getAbbreviationFor(unitOfMeasure)}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Portal>
                </Menu>
            </InputRightAddon>
        </InputGroup>
    )
}
