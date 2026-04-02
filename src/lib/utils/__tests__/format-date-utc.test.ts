import { DateToUTCDate } from "../format-date-utc";

describe("DateToUTCDate", () => {
  it("converts a date to UTC", () => {
    const date = new Date(2026, 3, 15, 10, 30, 0); // April 15, 2026
    const utcDate = DateToUTCDate(date);

    expect(utcDate.getUTCFullYear()).toBe(2026);
    expect(utcDate.getUTCMonth()).toBe(3);
    expect(utcDate.getUTCDate()).toBe(15);
  });

  it("preserves time components", () => {
    const date = new Date(2026, 0, 1, 14, 25, 30, 500);
    const utcDate = DateToUTCDate(date);

    expect(utcDate.getUTCHours()).toBe(14);
    expect(utcDate.getUTCMinutes()).toBe(25);
    expect(utcDate.getUTCSeconds()).toBe(30);
    expect(utcDate.getUTCMilliseconds()).toBe(500);
  });
});
