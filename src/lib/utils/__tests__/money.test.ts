import { toCents, fromCents, formatMoney } from "../money";

describe("toCents", () => {
  it("converts dollars to cents", () => {
    expect(toCents(10)).toBe(1000);
    expect(toCents(0.01)).toBe(1);
    expect(toCents(99.99)).toBe(9999);
  });

  it("rounds correctly", () => {
    expect(toCents(10.555)).toBe(1056);
    expect(toCents(0.1 + 0.2)).toBe(30);
  });

  it("handles zero", () => {
    expect(toCents(0)).toBe(0);
  });
});

describe("fromCents", () => {
  it("converts cents to dollars", () => {
    expect(fromCents(1000)).toBe(10);
    expect(fromCents(1)).toBe(0.01);
    expect(fromCents(9999)).toBe(99.99);
  });

  it("handles zero", () => {
    expect(fromCents(0)).toBe(0);
  });
});

describe("formatMoney", () => {
  it("formats USD", () => {
    expect(formatMoney(1000)).toBe("$10.00");
    expect(formatMoney(9999)).toBe("$99.99");
    expect(formatMoney(0)).toBe("$0.00");
  });
});
