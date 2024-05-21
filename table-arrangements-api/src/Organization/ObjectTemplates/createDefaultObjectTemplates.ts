import { ObjectTemplates } from "./ObjectTemplates"

export async function createDefaultObjectTemplates(organizationId: number) {
    await ObjectTemplates.appendMany([
        { organizationId, label: '{length} x {width} Table', shape: 'rectangle', color: '#38A169', width: convert(30, 'inches').toBase(), length: convert(8, 'feet').toBase() },
        { organizationId, label: '{length} x {width} Table', shape: 'rectangle', color: '#38A169', width: convert(30, 'inches').toBase(), length: convert(6, 'feet').toBase() },
        { organizationId, label: '{length} Round', shape: 'round', color: '#38A169', width: convert(10, 'feet').toBase(), length: convert(10, 'feet').toBase() },
        { organizationId, label: '{length} Round', shape: 'round', color: '#38A169', width: convert(6, 'feet').toBase(), length: convert(6, 'feet').toBase() },
        { organizationId, label: '{length} Round', shape: 'round', color: '#38A169', width: convert(5.5, 'feet').toBase(), length: convert(5.5, 'feet').toBase() }
    ])
}

export type UnitOfMeasure = 'feet' | 'inches' | 'meters' | 'centimeters'

export const UnitsOfMeasure: UnitOfMeasure[] = [ 'feet', 'inches', 'meters', 'centimeters' ]

const unitOfMeasureLabels: Record<UnitOfMeasure, string> = {
    feet: 'ft',
    inches: 'in',
    meters: 'm',
    centimeters: 'cm'
}

const conversionFactors: Record<UnitOfMeasure, number> = {
    centimeters: 100,
    meters: 100000,
    feet: 3048,
    inches: 254
}

export function getAbbreviationFor(unitOfMeasure: UnitOfMeasure) {
    return unitOfMeasureLabels[unitOfMeasure];
}

export function convert(value: number, fromUnitOfMeasure: UnitOfMeasure|null = null) {
    const fromConversionFactor = fromUnitOfMeasure ? conversionFactors[fromUnitOfMeasure] : 1;
    const baseValue = value * fromConversionFactor;
    return {
        to(toUnitOfMeasure: UnitOfMeasure) {
            const toConversionFactor = conversionFactors[toUnitOfMeasure];
            return Math.round(baseValue / toConversionFactor * 100)/100;
        },
        toBase() {
            return baseValue
        }
    }
}

