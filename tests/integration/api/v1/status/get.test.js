describe("Request api /status", () => {
  test("Request api /status should be 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.updated_at).toBeDefined();
    const parsedDate = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedDate);

    expect(responseBody.dependencies.database.version).toBeDefined();
    expect(responseBody.dependencies.database.version).toEqual(
      expect.any(String),
    );

    expect(responseBody.dependencies.database.max_connections).toBeDefined();
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.max_connections).toEqual(100);

    expect(responseBody.dependencies.database.opened_connections).toBeDefined();
    expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  });
});
