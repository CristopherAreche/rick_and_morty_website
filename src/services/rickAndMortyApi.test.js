import {
  emptyCollection,
  fetchCharacters,
  fetchCharactersByUrls,
  fetchEpisodeCatalogInfo,
} from "./rickAndMortyApi";

describe("rickAndMortyApi", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an empty collection for a not-found character query", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ error: "There is nothing here" }),
    });

    let result = await fetchCharacters({ name: "missing" });

    expect(result).toEqual(emptyCollection);
  });

  it("batches character URLs into a single API request", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue([
        { id: 1, name: "Rick Sanchez" },
        { id: 2, name: "Morty Smith" },
      ]),
    });

    let result = await fetchCharactersByUrls([
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/2",
    ]);

    expect(fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/1,2",
      expect.objectContaining({ signal: undefined })
    );
    expect(result).toHaveLength(2);
  });

  it("reads the episode catalog info from the list endpoint", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        info: { count: 51, pages: 3 },
        results: [],
      }),
    });

    let result = await fetchEpisodeCatalogInfo();

    expect(result).toEqual({ count: 51, pages: 3 });
  });
});
