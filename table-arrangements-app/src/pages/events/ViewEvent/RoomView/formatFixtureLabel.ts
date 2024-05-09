import { FixtureTemplate } from "../fields";
import { convert, format, getAbbreviationFor, MeasurementSystem } from "../UnitOfMeasure";

export function formatFixtureLabel(fixture: FixtureTemplate, system: MeasurementSystem) {
    return fixture.label
        .replace('{length}', format(fixture.length, system))
        .replace('{width}', format(fixture.width, system))
}
