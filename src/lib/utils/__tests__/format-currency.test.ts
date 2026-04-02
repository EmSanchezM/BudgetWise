import { GetFormatterForCurrency } from "../format-currency";

describe("GetFormatterForCurrency", () => {
  it("returns a formatter for USD", () => {
    const formatter = GetFormatterForCurrency("USD");
    const result = formatter.format(1234.56);
    expect(result).toContain("1,234.56");
  });

  it("returns a formatter for EUR", () => {
    const formatter = GetFormatterForCurrency("EUR");
    const result = formatter.format(1234.56);
    expect(result).toContain("1.234,56");
  });
});
