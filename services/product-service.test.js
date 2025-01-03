describe("ProductService", () => {
  describe("CreateProduct", () => {
    
    test("should throw an error for missing required fields", async () => {
      const productService = new ProductService();
      const invalidInput = { name: "", price: null };

      await expect(productService.CreateProduct(invalidInput))
        .rejects
        .toThrow("Invalid input");
    });

    test("should create a product and return the product object", async () => {
      const productService = new ProductService();
      const validInput = {
        name: "Test Product",
        desc: "A great product",
        img: "http://example.com/img.png",
        type: "Electronics",
        stock: 10,
        price: 99.99,
        available: true,
        seller: "Test Seller"
      };

      const result = await productService.CreateProduct(validInput);
      expect(result).toMatchObject({
        name: "Test Product",
        desc: "A great product",
        price: 99.99
      }); 
    });

    test("should handle database errors gracefully", async () => {
      const productService = new ProductService();
      jest.spyOn(productService, "saveToDatabase").mockImplementation(() => {
        throw new Error("Database error");
      });

      const validInput = {
        name: "Test Product",
        desc: "A great product",
        price: 99.99
      };

      await expect(productService.CreateProduct(validInput))
        .rejects
        .toThrow("Database error");
    });

  });
});