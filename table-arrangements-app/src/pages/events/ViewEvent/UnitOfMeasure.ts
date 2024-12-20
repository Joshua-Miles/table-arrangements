export type UnitOfMeasure = 'feet' | 'inches' | 'meters' | 'centimeters'

export type MeasurementSystem = 'metric' | 'imperial'

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

export function format(value: number, system: MeasurementSystem): string {
    if (system === 'imperial') {
        const feet = Math.floor(value / conversionFactors.feet);

        const remaining = value % conversionFactors.feet;

        if (!remaining) return `${feet}'`

        const inches = (value / conversionFactors.inches)
        return `${inches}''`
    }

    if (system === 'metric') {
        const meters = Math.floor(value / conversionFactors.meters);

        const remaining = value % conversionFactors.meters;

        if (!remaining) return `${meters}m`

        const centimeters = (value / conversionFactors.centimeters)
        return `${centimeters}cm`
    }

    throw Error(`Unrecognized measurement system "${system}"`)
}