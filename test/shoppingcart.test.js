const ShoppingCart = require("../main.js").ShoppingCart;
const PRICING_RULES = require("../main.js").PRICING_RULES;
const PRODUCTS = require("../main.js").PRODUCTS;

describe('ShoppingCart', () => {
    test("Add Product - Null", () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add();
        cart.computeTotal();
        expect(cart.total).toBe("0.00");
        expect(cart.items.length).toBe(0);
    });

    test("Add Product", () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add("ult_small");
        cart.computeTotal();
        expect(cart.total).toBe("24.90");
        expect(cart.items.length).toBe(1);
        expect(cart.items.filter(x => x.code == "ult_small").length).toBe(1);
    });

    test("Compute Cart - 0 Items", () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add();
        cart.computeTotal();
        expect(cart.total).toBe("0.00");
        expect(cart.items.length).toBe(0);
    });
});

describe("Scenarios", () => {
    test('Scenario 1', () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add("ult_small");
        cart.add("ult_small");
        cart.add("ult_small");
        cart.add("ult_large");
        cart.computeTotal();
        expect(cart.total).toBe("94.70");
        expect(cart.items.length).toBe(4);
        expect(cart.items.filter(x => x.code == "ult_small").length).toBe(3);
        expect(cart.items.filter(x => x.code == "ult_large").length).toBe(1);
    });

    test('Scenario 2', () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add("ult_small");
        cart.add("ult_small");
        cart.add("ult_large");
        cart.add("ult_large");
        cart.add("ult_large");
        cart.add("ult_large");
        cart.computeTotal();
        expect(cart.total).toBe("209.40");
        expect(cart.items.length).toBe(6);
        expect(cart.items.filter(x => x.code == "ult_small").length).toBe(2);
        expect(cart.items.filter(x => x.code == "ult_large").length).toBe(4);
    });

    test('Scenario 3', () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add("ult_small");
        cart.add("ult_medium");
        cart.add("ult_medium");
        cart.computeTotal();
        expect(cart.total).toBe("84.70");
        expect(cart.items.length).toBe(5);
        expect(cart.items.filter(x => x.code == "ult_small").length).toBe(1);
        expect(cart.items.filter(x => x.code == "ult_medium").length).toBe(2);
        expect(cart.items.filter(x => x.code == "1gb_free").length).toBe(2);
    });

    test('Scenario 4', () => {
        const cart = new ShoppingCart(PRICING_RULES);
        cart.add("ult_small");
        cart.add("1gb", "I<3AMAYSIM");
        cart.computeTotal();
        expect(cart.total).toBe("31.32");
        expect(cart.items.length).toBe(2);
        expect(cart.items.filter(x => x.code == "ult_small").length).toBe(1);
        expect(cart.items.filter(x => x.code == "1gb").length).toBe(1);
        expect(cart.promoCode).toBe("I<3AMAYSIM");
    });
});

