import { persist, Serial } from "@triframe/scribe"

export type ObjectTemplate = {
    id: Serial
    workspaceId: number
    label: string
    shape: 'round' | 'rectangle'
    color: string
    width: number
    length: number
}

export const ObjectTemplates = persist<ObjectTemplate>()
    .primaryKey('id')
    .indexBy('workspaceId');

export async function createDefaultObjectTemplates(workspaceId: number) {
    await ObjectTemplates.appendMany([
        { workspaceId, label: '{length} x {width} Table', shape: 'rectangle', color: '#38A169', width: convert(30, 'inches').toBase(), length: convert(8, 'feet').toBase() },
        { workspaceId, label: '{length} x {width} Table', shape: 'rectangle', color: '#38A169', width: convert(30, 'inches').toBase(), length: convert(6, 'feet').toBase() },
        { workspaceId, label: '{length} Round', shape: 'round', color: '#38A169', width: convert(10, 'feet').toBase(), length: convert(10, 'feet').toBase() },
        { workspaceId, label: '{length} Round', shape: 'round', color: '#38A169', width: convert(6, 'feet').toBase(), length: convert(6, 'feet').toBase() },
        { workspaceId, label: '{length} Round', shape: 'round', color: '#38A169', width: convert(5.5, 'feet').toBase(), length: convert(5.5, 'feet').toBase() }
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

