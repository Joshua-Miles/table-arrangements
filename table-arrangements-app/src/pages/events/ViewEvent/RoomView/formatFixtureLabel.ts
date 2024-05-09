import { format, MeasurementSystem } from "../UnitOfMeasure";

export function formatFixtureLabel(fixture: { label: string, length: number, width: number }, system: MeasurementSystem) {
    return fixture.label
        .replace('{length}', format(fixture.length, system))
        .replace('{width}', format(fixture.width, system))
}
